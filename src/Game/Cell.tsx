import * as uniqid from 'uniqid';

import Game from "./Game";
import ColorHelper from "../helpers/ColorHelper";
import AppHelpers from "../helpers/AppHelpers";
import NumberHelper from "../helpers/NumberHelper";

const ENERGY_LINE_WIDTH = 5;
const MIN_DISTANCE = 10;
const MAX_PLACEMENT_TRIES = 500;

export default class Cell {
  game: Game;
  x: number;
  y: number;
  size: number = 40;
  energy: number = 1;
  shiftDown: boolean = true;
  uniqueId: string;

  constructor(game: Game) {
    this.game = game;
    this.uniqueId = uniqid('cell_');

    AppHelpers.autoBind(this);

    this.setRelativePosition(.5, .5);
    game.addOnRun(this.shiftEnergy);
  }

  public setAbsolutePosition(x: number, y: number): Cell {
    this.x = x;
    this.y = y;

    return this;
  }

  public setRelativePosition(xRatio: number, yRatio: number): Cell {
    this.x = xRatio * this.game.canvas.width;
    this.y = yRatio * this.game.canvas.height;

    return this;
  }

  public setRandomPosition(): Cell {
    const padding = this.size / 2 + 1;

    this.x = NumberHelper.randomIntIncl(padding, this.game.canvas.width - padding);
    this.y = NumberHelper.randomIntIncl(padding, this.game.canvas.height - padding);

    return this;
  }

  public setUniqueRandomPosition(): Cell {
    let tries = 0;

    do {
      this.setRandomPosition();
      tries++;
    } while (this.isCloseToAnyCell() && tries < MAX_PLACEMENT_TRIES);

    return this;
  }

  public getDistanceToCell(cell: Cell): number {
    const w = this.x - cell.x;
    const h = this.y - cell.y;

    return Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
  }

  public isCloseToAnyCell(): boolean {
    for (let i = 0; i < this.game.cells.length; i++) {
      const cell = this.game.cells[i];

      if (this.uniqueId === cell.uniqueId) {
        continue;
      }

      if (this.getDistanceToCell(cell) < (this.size + cell.size) / 2 + MIN_DISTANCE) {
        return true;
      }
    }

    return false;
  }

  public draw(): void {
    const ctx: CanvasRenderingContext2D = this.game.ctx;

    // Draw background
    ctx.beginPath();
    ctx.arc(
        this.x,
        this.y,
        this.size / 2,
        0,
        2 * Math.PI
    );
    ctx.fillStyle = '#303030';
    ctx.fill();

    // Draw body
    ctx.beginPath();
    ctx.arc(
        this.x,
        this.y,
        this.size / 2 - ENERGY_LINE_WIDTH - 2,
        0,
        2 * Math.PI
    );
    ctx.fillStyle = '#5dc15a';
    ctx.fill();

    // Draw energy
    ctx.beginPath();
    ctx.arc(
        this.x,
        this.y,
        (this.size - ENERGY_LINE_WIDTH) / 2 - 1,
        -(this.energy * 2 + .5) * Math.PI,
        -.5 * Math.PI
    );
    ctx.strokeStyle = ColorHelper.gradient2(
        1 - this.energy,
        '#01ae0c',
        '#ff000a'
    );
    ctx.lineWidth = ENERGY_LINE_WIDTH;
    ctx.stroke();
  }

  public shiftEnergy() {
    if (this.shiftDown) {
      this.energy -= .005;
    } else {
      this.energy += .005;
    }

    if (this.energy <= 0 || this.energy >= 1) {
      this.shiftDown = !this.shiftDown;
    }
  }
}