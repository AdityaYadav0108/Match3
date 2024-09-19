import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Board } from "./Board";
import { Field } from "./Field";

export class Game extends Scene {
    create() {
        this.createBackground();
    }
    createBackground() {
        this.bg = App.sprite("bg");
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
        // const field = new Field(1, 1);
        // this.container.addChild(field.sprite);
        this.board = new Board();
        this.container.addChild(this.board.container);
    }
}
