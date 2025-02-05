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

export class Workeroid {
  status: WorkerStatus;

  constructor(currentCell: Cell) {
    this.status = { type: "idle", currentCell: currentCell };
  }

  move(traverser: Cell[]) {
    this.status = {
      type: "moving",
      currentCell: this.status.currentCell,
      traverser,
    };

    const timer = setInterval(() => {
      console.log("Workeroid move timer", this.status.currentCell.tuple);
      if (this.status.type !== "moving" || this.status.traverser.length === 0) {
        this.status = {
          type: "idle",
          currentCell: this.status.currentCell,
        };
        clearInterval(timer);
        return;
      }

      const nextCell = this.status.traverser.shift();
      if (!nextCell) {
        return;
      }

      this.status.currentCell = nextCell;
    }, 1000);
  }
}
