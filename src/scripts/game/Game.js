import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Field } from "./field";

export class Game extends Scene {
    create() {
        this.createBackground();
    }
    createBackground() {
        this.bg = App.sprite("bg");
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
        const field = new Field(1, 1);
        this.container.addChild(field.sprite);
    }
}
