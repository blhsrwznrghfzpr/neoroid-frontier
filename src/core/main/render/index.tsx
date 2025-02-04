import { useCallback, useRef, useState } from "react";
import { Slot } from "../../unit/package/Primitive/main";
import { Game } from "../game";
import { FunctionEnv } from "../../../lib/miragex/common/interactionEvent";
import { StyledDVSpace } from "../../unit/package/StyledUnit/main";
import { Canvas, VerticalLayout } from "../../unit/package/PrimitiveUix/main";
import { StyledButton, StyledText } from "../../unit/package/StyledUix/main";
import { SceneRender } from "./scene";

export const Main = () => {
  const [, _setTime] = useState(0);
  const effect = useCallback(() => {
    _setTime(performance.now());
    console.debug(gameRef.current.gameState);
  }, []);

  const gameRef = useRef<Game>(new Game());

  const joinPlayer = useCallback((env: FunctionEnv) => {
    gameRef.current.addPlayer(env.userId);
    effect();
  }, []);

  const leavePlayer = useCallback((env: FunctionEnv) => {
    gameRef.current.removePlayer(env.userId);
    effect();
  }, []);

  const startGame = useCallback(() => {
    gameRef.current.startGame();
    effect();
  }, []);

  return (
    <StyledDVSpace>
      <Slot position={[0, 1, 0]}>
        <Canvas>
          <VerticalLayout>
            <StyledButton onClick={joinPlayer}>
              <StyledText content="Join" />
            </StyledButton>
            <StyledButton onClick={leavePlayer}>
              <StyledText content="Leave" />
            </StyledButton>
            <StyledButton onClick={startGame}>
              <StyledText content="Start" />
            </StyledButton>
          </VerticalLayout>
        </Canvas>
      </Slot>
      <SceneRender gameState={gameRef.current.gameState} />
    </StyledDVSpace>
  );
};
