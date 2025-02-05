import { Slot, Box } from "../../../unit/package/Primitive/main";
import { WorkerStatus } from "../../game/workeroid";

export const WorkerRender = ({
  workerStatus,
}: {
  workerStatus: WorkerStatus;
}) => {
  return (
    <Slot position={workerStatus.currentCell.point}>
      <Slot position={[0, 1, 0]}>
        <Box name={[0.5, 0.5, 0.5]} />
      </Slot>
    </Slot>
  );
};
