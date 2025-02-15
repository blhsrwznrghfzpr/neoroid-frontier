import { useState,useCallback,useEffect } from "react";
import { Slot } from "../../../unit/package/Primitive/main";
import { Canvas,VerticalLayout,HorizontalLayout } from "../../../unit/package/PrimitiveUix/main";
import { StyledText, StyledImage,StyledButton, StyledScrollArea } from "../../../unit/package/StyledUix/main";
import { Player } from "../../game/type";
import { Point } from "honeycomb-grid";
import { Game } from "../../game";

export const SystemUI = ( { game,player,positionXY }: { game :Game,player: Player ,positionXY:Point}) => {
    const [workers, setWorkers] = useState(player.workers);

    useEffect(() => {
      setWorkers(player.workers);
    }, [player.workers]);

    const position:[number,number,number]= [positionXY.x, 1, positionXY.y+0.3];


    const handleMoveWorker = useCallback((workerId: number, dst: Point) => {
        game.moveWorker(workerId, [dst.x, dst.y]);
    }, []);

    const handleWorkInCell = useCallback((workerId: number, dst: Point) => {
        game.workInCell(workerId, [dst.x, dst.y]);
    }, []);

    return (
      <Slot position={position}> 
        <Canvas size={[1800, 1000]}>
            <StyledImage>
                <StyledScrollArea verticalFit="PreferredSize">
                    <VerticalLayout
                    forceExpandChildHeight
                    paddingBottom={10}
                    paddingLeft={5}
                    paddingRight={5}
                    paddingTop={10}
                    >
                    <StyledText content={player.id}/>
                    {workers.map((worker, workerIndex) => (
                    <HorizontalLayout forceExpandChildWidth key={workerIndex}>
                        <StyledText                          
                            content={`Worker [${workerIndex.toString()}] -> type:${worker.status.type}`}
                            key={workerIndex}
                        />
                        <StyledButton defaultColor={[0.5,0.5,0.5,1]} onClick={() => handleWorkInCell(workerIndex, { x: worker.status.currentCell.q+1, y: worker.status.currentCell.r+1 })}>
                            <StyledText content="work" defaultColor={[1,1,1,1]} verticalAutoSize />
                        </StyledButton>
                        <StyledButton defaultColor={[0.5,0.5,0.5,1]} onClick={() => handleMoveWorker(workerIndex, { x: 0, y: 0 })}>
                            <StyledText content="go home" defaultColor={[1,1,1,1]} verticalAutoSize />
                        </StyledButton>
                    </HorizontalLayout>
                    ))}
                    </VerticalLayout>
                </StyledScrollArea>
            </StyledImage>
        </Canvas>
      </Slot>
    );
}