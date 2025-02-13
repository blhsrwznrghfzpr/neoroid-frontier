import { HexCoordinates, line } from "honeycomb-grid";
import { GameState } from "./type";
import { Workeroid } from "./workeroid";
import { StageMap } from "./map";
import { Cell } from "./map/cell";
import { WoodBlock } from "./type/craft";

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
      currentCell: new Cell([0, 0]),
    };
    this.state.players.push(player);
    console.log("Player added", playerId);
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
    const treeCell = this.state.map.grid.getHex([5, 3]);
    if (!treeCell) {
      return;
    }

    treeCell.cellState = {
      type: "tree",
      blocks: [WoodBlock, WoodBlock],
    };
    this.moveWorker(0, treeCell);
  }

  resetGame() {
    this.state = {
      mode: "lobby",
      players: [],
    };
  }

  followerAllWorkers(targetUserId: string) {
    if (this.state.mode !== "inGame") {
      return;
    }
    const player = this.state.players.find((p) => p.id === targetUserId);
    this.state.workers.forEach((worker) => {
      worker.follow(targetUserId);
      if (player) {
        player.workers.push(worker);
      }
    });
    //console.log("All Workeroid follow:", targetUserId);
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

  followWorker(workerId: number, targetUserId: string) {
    if (this.state.mode !== "inGame") {
      return;
    }

    const worker = this.state.workers[workerId];
    if (!worker) {
      return;
    }
  
    worker.follow(targetUserId);
    console.log("Workeroid follow:", targetUserId);
  }
}
