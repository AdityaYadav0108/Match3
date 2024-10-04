import { App } from "../system/App";
import { Tools } from "../system/Tools";
import { Tile } from "./Tile";

export class TileFactory {
  static generate() {
    const color =
      App.config.tiles[Tools.randomNumber(0, App.config.tiles.length - 1)];
    return new Tile(color);
  }
}
