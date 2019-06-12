import './index.css';
import Game from "./Game/Game";

const canvas = <HTMLCanvasElement> document.getElementById('game');
const game = new Game(canvas);

game.addRandomCells(50);

game.isRunning = true;
game.run();