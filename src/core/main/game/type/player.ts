import { Workeroid } from "../workeroid";
import { Cell } from "../map/cell";

export type Player = {
  id: string;
  name: string;
  workers: Workeroid[];
  currentCell: Cell;
};
