import { App } from "../system/App";

export class Field {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.sprite = App.sprite("field");
    this.sprite.x = this.position.x;
    this.sprite.y = this.position.y;
    this.sprite.anchor.set(0.5);
    this.selected = App.sprite("field-selected");
    this.sprite.addChild(this.selected);
    this.selected.visible = false;
    this.selected.anchor.set(0.5);
  }

  setTile(tile){
    this.tile = tile;
    this.tile.field = this;
    this.tile.setPosition(this.position);
  }

  get position() {
    return {
      x: this.row * this.sprite.width,
      y: this.col * this.sprite.height,
    };
  }

  unselect(){
    this.selected.visible = false;
  }

  select(){
    this.selected.visible = true;
  }
}
