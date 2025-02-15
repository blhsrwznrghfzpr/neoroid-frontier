import { Cell } from "../map/cell";
import { WorkerStatus } from "../type/workerState";

export class Workeroid {
  status: WorkerStatus;

  constructor(currentCell: Cell) {
    this.status = { type: "idle", currentCell: currentCell };
  }

  async move(traverser: Cell[]): Promise<void> {
    this.status = {
      type: "moving",
      currentCell: this.status.currentCell,
      traverser,
    };

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        console.log("Workeroid move timer", this.status.currentCell.tuple);
        if (this.status.type !== "moving" || this.status.traverser.length === 0) {
          this.status = {
            type: "idle",
            currentCell: this.status.currentCell,
          };
          clearInterval(timer);
          resolve();
          return;
        }

        const nextCell = this.status.traverser.shift();
        if (!nextCell) {
          return;
        }

        this.status.currentCell = nextCell;
      }, 1000);
    });
  }

  follow(targetUserId: string) {
    this.status = {
      type: "following",
      currentCell: this.status.currentCell,
      targetUserId,
    };
  }

  async collect(taskMax: number): Promise<void> {
    this.status = {
      type: "collecting",
      currentCell: this.status.currentCell,
    };
    console.log("Workeroid collect in", this.status.currentCell.tuple);
    let count = 0;

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        if (this.status.type !== "collecting" || count >= taskMax) {
          this.status = {
            type: "idle",
            currentCell: this.status.currentCell,
          };
          clearInterval(timer);
          resolve();
          return;
        }
        console.log("progress:", count, "/", taskMax);
        count++;
      }, 1000);
    });
  }
}

