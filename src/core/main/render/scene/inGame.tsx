import { useState, useCallback } from "react";
import { Slot } from "../../../unit/package/Primitive/main";
import { GameStateInGame } from "../../game/type";
import { WorkerRender } from "../worker";
import { Cell } from "../../game/map/cell";
import { MeshRenderer } from "../../../unit/package/StyledObject/main";
import { Mesh } from "../style";
import { Canvas } from "../../../unit/package/PrimitiveUix/main"; 
import { StyledText } from "../../../unit/package/StyledUix/main"; 
import { GetUserPosition } from "../../../unit/package/GameEvent/main";
import { FunctionEnv } from "../../../../lib/miragex/common/interactionEvent";
import { posText2Num} from "../../game/utils";

export const InGameScene = ({ gameState }: { gameState: GameStateInGame }) => {
  const [posText, setPosText] = useState<{ [key: string]: string }>({});

  const posTextOnChange = useCallback(
    (_env: FunctionEnv, text: string, userId: string) => {
      setPosText((prev) => ({
        ...prev,
        [userId]: text,
      }));
      updateUserCell(text, userId);
    },
    [posText]
  );

  // ユーザとその下のワーカーのCellを更新(後でgame側に映したい)
  const updateUserCell = (posText: string, playerId: string) => {
    const parsed = posText2Num(posText);
    if (parsed) {
      if (gameState.mode === "inGame") {
        const hex = gameState.map.grid.pointToHex(
          { x: parsed.x, y: parsed.z },
          { allowOutside: false }
        );
        if (hex) {
          const player = gameState.players.find((p) => p.id === playerId);
          if (player) {
            player.currentCell = hex;
            //console.log(player);
            player.workers.forEach((worker) => {
                worker.status.currentCell = hex;
                //console.log(worker);
            });
          }
        } else {
          console.error("Hex is undefined");
        }
      }
    }
  };

  return (
    <Slot>
      {gameState.players.map((player, index) => (
        <GetUserPosition
          key={index}
          onChange={(env, text) => posTextOnChange(env, text, player.id)}
          userId={player.id}
        />
      ))}
      {/* map */}
      <Slot>
        {gameState.map.getHexArray().map((cell: Cell, index: number) => (
          <Slot
            key={index}
            name={`hex-${index}-[${cell.q},${cell.r}]`}
            position={cell.point}
          >
            <MeshRenderer styledMesh={Mesh.hex} >
              <Canvas position={[0, -0.3, 0]}>
                <StyledText
                  content={`${cell.q},${cell.r}`}
                  defaultColor = {cell.isBlocked ? [1, 0, 0, 1] : [0, 0, 0, 1]}
                />
              </Canvas>
            </MeshRenderer>
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
