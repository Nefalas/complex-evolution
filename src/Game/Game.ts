import Cell from "./Cell";
import AppHelpers from "../helpers/AppHelpers";

export default class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  isRunning: boolean = false;
  frame: number = 0;
  fps: number = 60;
  cells: Cell[] = [];
  onRun: Function[] = [];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    AppHelpers.autoBind(this);

    this.setupCanvas();
  }

  public run(): void {
    if (!this.isRunning) {
      return;
    }

    const start: number = Date.now();

    this.frame++;
    this.draw();

    this.onRun.forEach(onRun => onRun());

    this.runNext(start);
  }

  public addOnRun(onRun: Function): void {
    this.onRun.push(onRun);
  }

  public addCell(cell: Cell): void {
    this.cells.push(cell);
  }

  public addRandomCells(amount: number): void {
    for (let i = 0; i < amount; i++) {
      this.cells.push(new Cell(this).setUniqueRandomPosition());
    }
  }

  private runNext(start: number): void {
    const elapsed: number = Date.now() - start;
    const remaining: number = (1000 / this.fps) - elapsed;

    if (remaining <= 0) {
      this.run();
    } else {
      setTimeout(this.run, remaining);
    }
  }

  private setupCanvas(): void {
    this.canvas.width = this.canvas.scrollWidth;
    this.canvas.height = this.canvas.scrollHeight;
  }

  private draw(): void {
    this.clearCanvas();
    this.drawCells();
  }

  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawCells(): void {
    this.cells.forEach(cell => cell.draw());
  }
}