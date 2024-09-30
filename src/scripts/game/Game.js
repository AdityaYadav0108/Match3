import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Board } from "./Board";
import { Field } from "./Field";
import { CombinationManager } from "./CombinationManager";

export class Game extends Scene {
  create() {
    this.createBackground();

    this.board = new Board();
    this.container.addChild(this.board.container);

    this.board.container.on("tile-touch-start", this.onTileClick.bind(this));

    this.combinationManager = new CombinationManager(this.board);
  }
  createBackground() {
    this.bg = App.sprite("bg");
    this.bg.width = window.innerWidth;
    this.bg.height = window.innerHeight;
    this.container.addChild(this.bg);
    // const field = new Field(1, 1);
    // this.container.addChild(field.sprite);
  }

  onTileClick(tile) {
    if (this.disabled) return;

    if (this.selectedTile) {
      if (!this.selectedTile.isNeighbour(tile)) {
        this.clearSelection();
        this.selectTile(tile);
      } else {
        this.swap(this.selectedTile, tile);
      }
    } else {
      this.selectTile(tile);
    }
  }

  selectTile(tile) {
    this.selectedTile = tile;
    this.selectedTile.field.select();
  }

  swap(selectedTile, tile) {
    this.disabled = true;
    this.clearSelection();
    selectedTile.sprite.zIndex = 2;

    selectedTile.moveTo(tile.field.position, 0.2);
    tile.moveTo(selectedTile.field.position, 0.2).then(() => {
      this.board.swap(selectedTile, tile);
      const matches = this.combinationManager.getMatches();
      if (matches.length) {
        this.processMatches(matches);
      }
      this.disabled = false;
    });
  }

  processMatches(matches) {
    this.removeMatches(matches);
    this.processFalldown().then(() => {
      this.addTiles();
    });
  }

  processFalldown() {
    return new Promise((resolve) => {
      let completed = 0;
      let started = 0;

      for (let row = this.board.rows - 1; row >= 0; row--) {
        for (let col = this.board.cols - 1; col >= 0; col--) {
          const field = this.board.getField(row, col);

          if (!field.tile) {
            ++started;

            this.fallDownTo(field).then(() => {
              ++completed;

              if (completed >= started) {
                resolve();
              }
            });
          }
        }
      }
    });
  }

  fallDownTo(emptyField) {
    for (let row = emptyField.row - 1; row >= 0; row++) {
      let fallingField = this.board.getField(row, emptyField.col);
      const fallingTile = fallingField.tile;

      if (fallingTile) {
        fallingTile.field = emptyField;
        emptyField.tile = fallingTile;
        fallingField.tile = null;
        return fallingTile.fallDownTo(emptyField.position);
      }
    }
  }

  removeMatches(matches) {
    matches.forEach((match) => {
      match.forEach((tile) => {
        tile.remove();
      });
    });
  }

  clearSelection() {
    if (this.selectedTile) {
      this.selectedTile.field.unselect();
      this.selectedTile = null;
    }
  }
}
