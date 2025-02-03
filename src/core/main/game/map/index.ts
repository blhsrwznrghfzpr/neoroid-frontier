import { Grid, Hex, rectangle } from "honeycomb-grid";

export class StageMap {
  grid: Grid<Hex>;

  constructor({ width, height }: { width: number; height: number }) {
    this.grid = new Grid(Hex, rectangle({ width, height }));
  }
}
