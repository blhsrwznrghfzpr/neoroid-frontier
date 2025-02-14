//import { GameState } from "../../game/type";
import { Game } from "../../game";
import { InGameScene } from "./inGame";
import { LobbyScene } from "./lobby";

export const SceneRender = ({ game }: { game: Game }) => {
  switch (game.state.mode) {
    case "lobby":
      return <LobbyScene game={game} />;
    case "inGame":
      return <InGameScene game={game} />;
  }
  return <></>;
};
