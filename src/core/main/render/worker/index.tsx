import { Slot, Box } from "../../../unit/package/Primitive/main";
import { WorkerStatus } from "../../game/type/workerState";
import { FollowingUser } from "../../../unit/package/GameEvent/main";

export const WorkerRender = ({
  workerStatus,
}: {
  workerStatus: WorkerStatus;
}) => {
  return (
    <>
      {workerStatus.type === "following" ? (
      <FollowingUser smoothSpeed={1 + Math.random()} userId={workerStatus.targetUserId}>
        <Box name={[0.5, 0.5, 0.5]} /> 
      </FollowingUser>
      ) : (
      <Slot name={workerStatus.type} position={workerStatus.currentCell.point}>
        <Slot position={[0, 1, 0]}>
          <Box name={[0.5, 0.5, 0.5]} />
        </Slot>
      </Slot>
      )}
    </>
  );
};
