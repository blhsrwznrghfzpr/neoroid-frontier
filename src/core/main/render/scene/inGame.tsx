import { Hex, hexToPoint } from "honeycomb-grid";
import { Slot, Box } from "../../../unit/package/Primitive/main";
import { GameStateInGame } from "../../game/type";

const hexToPosition = (hex: Hex): [number, number, number] => {
  const { x, y } = hexToPoint(hex);
  return [x, 0, y];
};

export const InGameScene = ({ gameState }: { gameState: GameStateInGame }) => {
  return (
    <Slot>
      {gameState.map.getHexArray().map((hex: Hex, index: number) => (
        <Slot
          key={index}
          position={hexToPosition(hex)}
          name={`hex-${index}-[${hex.q},${hex.r}]`}
        >
          <Box />
        </Slot>
      ))}
    </Slot>
  );
};
