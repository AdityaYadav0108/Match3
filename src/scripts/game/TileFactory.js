import { App } from "../system/App";
import { Tools } from "../system/Tools";
import { Tile } from "./Tile";

export class TileFactory {
  static generate() {
    const color =
      App.config.tilesConfig[
        Tools.randomNumber(0, App.config.tilesConfig.length - 1)
      ];
    return new Tile(color);
  }
}
