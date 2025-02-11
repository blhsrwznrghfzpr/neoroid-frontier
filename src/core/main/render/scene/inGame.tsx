import { Slot } from "../../../unit/package/Primitive/main";
import { GameStateInGame } from "../../game/type";
import { WorkerRender } from "../worker";
import { Cell } from "../../game/map/cell";
import { CellRender } from "./cell";

export const InGameScene = ({ gameState }: { gameState: GameStateInGame }) => {
  return (
    <Slot>
      {/* map */}
      <Slot>
        {gameState.map.getHexArray().map((cell: Cell, index: number) => (
          <CellRender cell={cell} key={index} />
        ))}
      </Slot>
      {/* workers */}
      <Slot>
        {gameState.workers.map((worker, index) => (
          <WorkerRender key={index} workerStatus={worker.status} />
        ))}
      </Slot>
    </Slot>
  );
};
