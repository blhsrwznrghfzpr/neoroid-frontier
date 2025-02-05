import { Hex } from "honeycomb-grid";

export type CellState = BlankCell | StarshipCell | TreeCell | StoneCell;

export type BlankCell = {
  type: "blank";
};

export type StarshipCell = {
  type: "starship";
};

export type TreeCell = {
  type: "tree";
};

export type StoneCell = {
  type: "stone";
};

export class Cell extends Hex {
  cellState: CellState = { type: "blank" };

  get tuple() {
    return [this.q, this.r] as [number, number];
  }

  get point() {
    return [this.x, 0, this.y] as [number, number, number];
  }
}
