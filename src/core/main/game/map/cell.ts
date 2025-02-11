import { Hex } from "honeycomb-grid";
import { StoneBlock, WoodBlock } from "../type/craft";

export type CellState = BlankCell | StarshipCell | TreeCell | StoneCell;

export type BlankCell = {
  type: "blank";
};

export type StarshipCell = {
  type: "starship";
};

export type TreeCell = {
  type: "tree";
  blocks: WoodBlock[];
};

export type StoneCell = {
  type: "stone";
  blocks: StoneBlock[];
};

export class Cell extends Hex {
  cellState: CellState = { type: "blank" };
  isBlocked: boolean = false;

  get tuple() {
    return [this.q, this.r] as [number, number];
  }

  get point() {
    return [this.x, 0, this.y] as [number, number, number];
  }
}
