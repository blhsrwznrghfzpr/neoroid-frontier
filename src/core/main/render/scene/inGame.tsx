import { useCallback } from "react";
import { Slot } from "../../../unit/package/Primitive/main";
import { Game } from "../../game";
import { GameStateInGame } from "../../game/type";
import { WorkerRender } from "../worker";
import { Cell } from "../../game/map/cell";
import { CellRender } from "./cell";
import { GetUserPosition } from "../../../unit/package/GameEvent/main";
import { FunctionEnv } from "../../../../lib/miragex/common/interactionEvent";
import { SystemUI } from "./systemUI";
import { hexToPoint } from "honeycomb-grid";

export const InGameScene = ({ game }: { game: Game }) => {
  const gameState = game.state as GameStateInGame;
  const posTextOnChange = useCallback(
    (env: FunctionEnv, position: [number, number, number]) =>
      updateUserCell(position, env.userId),
    [],
  );

  // ユーザとその下のワーカーのCellを更新(後でgame側に映したい)
  const updateUserCell = (
    position: [number, number, number],
    playerId: string,
  ) => {
    const [pointX, _, pointY] = position;
    if (gameState.mode === "inGame") {
      const hex = gameState.map.grid.pointToHex(
        { x: pointX, y: pointY },
        { allowOutside: false },
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
  };

  return (
    <Slot>
      {gameState.players.map((player, index) => (
        <GetUserPosition
          key={index}
          onUpdate={(env, text) => posTextOnChange(env, text)}
          updateInterval={1}
          userId={player.id}
        />
      ))}
      {/* map */}
      <Slot>
        {gameState.map.getHexArray().map((cell: Cell, index: number) => (
          <CellRender cell={cell} key={index}/>
        ))}
        {gameState.players.map((player, index) => (
          <SystemUI game={game} key={index} player={player} positionXY={hexToPoint(player.currentCell)}/>
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
