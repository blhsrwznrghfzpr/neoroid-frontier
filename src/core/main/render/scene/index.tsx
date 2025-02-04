import { GameState } from "../../game/type";
import { InGameScene } from "./inGame";
import { LobbyScene } from "./lobby";

export const SceneRender = ({ gameState }: { gameState: GameState }) => {
  switch (gameState.mode) {
    case "lobby":
      return <LobbyScene gameState={gameState} />;
    case "inGame":
      return <InGameScene gameState={gameState} />;
  }
  return <></>;
};
