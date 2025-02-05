import { Cell } from "../map/cell";

export type WorkerStatus = WorkerIdle | WorkerMoving;

type WorkerIdle = {
  type: "idle";
  currentCell: Cell;
};

type WorkerMoving = {
  type: "moving";
  currentCell: Cell;
  traverser: Cell[];
};
