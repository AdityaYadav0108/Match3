import * as PIXI from 'pixi.js';
import { App } from '../system/App';

export class Board{
  constructor(){
    this.container = new PIXI.Container();
    this.fields = [];
    this.rows = App.config.board.rows;
    this.cols = App.config.board.cols;
    this.create();
  }

  create(){
    
  }
}