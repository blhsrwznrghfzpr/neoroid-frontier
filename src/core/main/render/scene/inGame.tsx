import { useEffect,useState, useCallback } from "react";
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

export const InGameScene = ({ gameState }: { gameState: GameStateInGame }) => {
  const [posText, setPosText] = useState("");
  useEffect(() => {
    handlePos2Hex();
  }, [posText]);

  const posTextOnChange = useCallback(
    (_env: FunctionEnv, text: string) => {
      setPosText(text);
    },
    [setPosText]
  );

  const parsePosText = (posText: string): { x: number; z: number } | null => {
    const values = posText
      .replace(/[;[\]]/g, "") 
      .split(" ")
      .map(Number);

    console.log("values:",values);
    if (values.length !== 3 || values.some(isNaN)) {
      console.error("Invalid posText format");
      return null;
    }

    const [x, , z] = values;
    if (x === undefined || z === undefined) {
      console.error("Invalid posText format: x or z is undefined");
      return null;
    }

    return { x, z };
  };

  const handlePos2Hex = () => {
    const parsed = parsePosText(posText);
    if (parsed) {
      if (gameState.mode === "inGame") {
        const hex = gameState.map.grid.pointToHex(
          { x: parsed.x, y: parsed.z },
          { allowOutside: false }
        );
        if (hex) {
          gameState.players.forEach((player) => {
          player.currentCell = hex;
          console.log(player);
        });
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
          onChange={posTextOnChange}
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
