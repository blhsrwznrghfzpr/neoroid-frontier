import { Grid, spiral } from "honeycomb-grid";
import { Cell } from "./cell";

export class StageMap {
  grid: Grid<Cell>;

  constructor({ radius }: { radius: number }) {
    this.grid = new Grid(Cell, spiral({ radius: radius }));
  }

  getHexArray() {
    return this.grid.toArray();
  }
}
