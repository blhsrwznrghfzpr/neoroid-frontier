import { Hex } from "honeycomb-grid";
import { GameState } from "./type";
import { Workeroid } from "./workeroid";
import { StageMap } from "./map";

export class Game {
  gameState: GameState;

  constructor() {
    this.gameState = {
      mode: "lobby",
      players: [],
    };
  }

  addPlayer(playerId: string) {
    if (this.gameState.players.some((player) => player.id === playerId)) {
      const player = {
        id: playerId,
        name: "Player",
        workers: [],
      };
      this.gameState.players.push(player);
    }
  }

  removePlayer(playerId: string) {
    this.gameState.players = this.gameState.players.filter(
      (player) => player.id !== playerId,
    );
  }

  startGame() {
    if (this.gameState.mode !== "lobby" && this.gameState.players.length < 1) {
      return;
    }

    const baseHex = new Hex([0, 0]);

    this.gameState = {
      mode: "inGame",
      players: this.gameState.players,
      workers: Array.from({ length: 10 }).map(() => new Workeroid(baseHex)),
      map: new StageMap({ width: 10, height: 10 }),
    };
  }
}
