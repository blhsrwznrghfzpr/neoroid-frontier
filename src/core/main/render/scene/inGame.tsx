import { Slot, Box } from "../../../unit/package/Primitive/main";
import { GameStateInGame } from "../../game/type";
import { WorkerRender } from "../worker";
import { Cell } from "../../game/map/cell";

export const InGameScene = ({ gameState }: { gameState: GameStateInGame }) => {
  return (
    <Slot>
      {/* map */}
      <Slot>
        {gameState.map.getHexArray().map((cell: Cell, index: number) => (
          <Slot
            key={index}
            name={`hex-${index}-[${cell.q},${cell.r}]`}
            position={cell.point}
          >
            <Box />
          </Slot>
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
