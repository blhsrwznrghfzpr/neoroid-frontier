import { HexCoordinates, line } from "honeycomb-grid";
import { GameState } from "./type";
import { Workeroid } from "./workeroid";
import { StageMap } from "./map";
import { Cell } from "./map/cell";

export class Game {
  state: GameState;

  constructor() {
    console.debug("Game created");
    this.state = {
      mode: "lobby",
      players: [],
    };
  }

  addPlayer(playerId: string) {
    if (this.state.players.some((player) => player.id === playerId)) {
      return;
    }
    const player = {
      id: playerId,
      name: "Player",
      workers: [],
    };
    this.state.players.push(player);
  }

  removePlayer(playerId: string) {
    this.state.players = this.state.players.filter(
      (player) => player.id !== playerId,
    );
  }

  startGame() {
    if (this.state.mode !== "lobby" || this.state.players.length < 1) {
      return;
    }

    const baseCell = new Cell([0, 0]);

    this.state = {
      mode: "inGame",
      players: this.state.players,
      workers: Array.from({ length: 10 }).map(() => new Workeroid(baseCell)),
      map: new StageMap({ radius: 10 }),
    };

    this.moveWorker(0, [5, 3]);
  }

  resetGame() {
    this.state = {
      mode: "lobby",
      players: [],
    };
  }

  moveWorker(workerId: number, dst: HexCoordinates) {
    if (this.state.mode !== "inGame") {
      return;
    }

    const worker = this.state.workers[workerId];
    const dstCell = this.state.map.grid.getHex(dst);

    if (!worker || !dstCell) {
      return;
    }

    const currentCell = worker.status.currentCell;
    const traverser = this.state.map.grid.traverse(
      line({ start: currentCell, stop: dstCell }),
    );

    worker.move(traverser.toArray());
  }
}
