import { Cell } from "../map/cell";

export type WorkerStatus = WorkerIdle | WorkerMoving | WorkerFollowing;

type WorkerIdle = {
  type: "idle";
  currentCell: Cell;
};

type WorkerMoving = {
  type: "moving";
  currentCell: Cell;
  traverser: Cell[];
};

interface WorkerFollowing {
  type: "following";
  currentCell: Cell;
  targetUserId: string;
}
