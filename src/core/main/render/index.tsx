import { useCallback, useEffect, useRef, useState } from "react";
import { Slot } from "../../unit/package/Primitive/main";
import { Game } from "../game";
import { FunctionEnv } from "../../../lib/miragex/common/interactionEvent";
import { StyledDVSpace } from "../../unit/package/StyledUnit/main";
import { Canvas, VerticalLayout } from "../../unit/package/PrimitiveUix/main";
import { StyledButton, StyledText } from "../../unit/package/StyledUix/main";
import { SceneRender } from "./scene";

export const Main = () => {
  // eslint-disable-next-line react/hook-use-state
  const [, setTime] = useState(0);
  const effect = useCallback(() => {
    setTime(performance.now());
  }, []);

  const gameRef = useRef<Game | null>(null);
  // const prevTimeRef = useRef<number>(performance.now());
  useEffect(() => {
    gameRef.current = new Game();
    const interval = setInterval(() => {
      // const deltaTime = performance.now() - prevTimeRef.current;
      // prevTimeRef.current = performance.now();
      // gameRef.current?.updateGame(deltaTime / 1000);
      effect();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const joinPlayer = useCallback((env: FunctionEnv) => {
    gameRef.current?.addPlayer(env.userId);
    effect();
  }, []);

  const leavePlayer = useCallback((env: FunctionEnv) => {
    gameRef.current?.removePlayer(env.userId);
    effect();
  }, []);

  const startGame = useCallback(() => {
    gameRef.current?.startGame();
    effect();
  }, []);

  const resetGame = useCallback(() => {
    gameRef.current?.resetGame();
    effect();
  }, []);

  if (!gameRef.current) {
    return <></>;
  }

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
            <StyledButton onClick={resetGame}>
              <StyledText content="Reset" />
            </StyledButton>
          </VerticalLayout>
        </Canvas>
      </Slot>
      <SceneRender gameState={gameRef.current.gameState} />
    </StyledDVSpace>
  );
};
