import { Cell } from "../map/cell";

export type WorkerStatus = WorkerIdle | WorkerMoving | WorkerFollowing | WorkerCollecting;

type WorkerIdle = {
  type: "idle";
  currentCell: Cell;
};

type WorkerMoving = {
  type: "moving";
  currentCell: Cell;
  traverser: Cell[];
};

type WorkerFollowing = {
  type: "following";
  currentCell: Cell;
  targetUserId: string;
}

type WorkerCollecting = {
  type: "collecting";
  currentCell: Cell;
}