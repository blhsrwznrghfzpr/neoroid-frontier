import { Player } from "./player";
import { Workeroid } from "../workeroid";
import { StageMap } from "../map";

export type GameState = GameStateLobby | GameStateInGame | GameStateResult;

type GameStateCommon = {
  players: Player[];
};

export type GameStateLobby = GameStateCommon & {
  mode: "lobby";
};

export type GameStateInGame = GameStateCommon & {
  mode: "inGame";
  workers: Workeroid[];
  map: StageMap;
};

export type GameStateResult = GameStateCommon & {
  mode: "result";
};
