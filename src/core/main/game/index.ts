import { HexCoordinates, line } from "honeycomb-grid";
import { GameState } from "./type";
import { Workeroid } from "./workeroid";
import { StageMap } from "./map";
import { Cell } from "./map/cell";

export class Game {
  gameState: GameState;

  constructor() {
    console.debug("Game created");
    this.gameState = {
      mode: "lobby",
      players: [],
    };
  }

  addPlayer(playerId: string) {
    if (this.gameState.players.some((player) => player.id === playerId)) {
      return;
    }
    const player = {
      id: playerId,
      name: "Player",
      workers: [],
    };
    this.gameState.players.push(player);
  }

  removePlayer(playerId: string) {
    this.gameState.players = this.gameState.players.filter(
      (player) => player.id !== playerId,
    );
  }

  startGame() {
    if (this.gameState.mode !== "lobby" || this.gameState.players.length < 1) {
      return;
    }

    const baseCell = new Cell([0, 0]);

    this.gameState = {
      mode: "inGame",
      players: this.gameState.players,
      workers: Array.from({ length: 10 }).map(() => new Workeroid(baseCell)),
      map: new StageMap({ radius: 10 }),
    };

    this.moveWorker(0, [5, 3]);
  }

  resetGame() {
    this.gameState = {
      mode: "lobby",
      players: [],
    };
  }

  moveWorker(workerId: number, dst: HexCoordinates) {
    if (this.gameState.mode !== "inGame") {
      return;
    }

    const worker = this.gameState.workers[workerId];
    const dstCell = this.gameState.map.grid.getHex(dst);

    if (!worker || !dstCell) {
      return;
    }

    const currentCell = worker.status.currentCell;
    const traverser = this.gameState.map.grid.traverse(
      line({ start: currentCell, stop: dstCell }),
    );

    worker.move(traverser.toArray());
  }
}
