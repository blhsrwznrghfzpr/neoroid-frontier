import {
  defineHex,
  Grid,
  Hex,
  hexToPoint,
  line,
  rectangle,
} from "honeycomb-grid";
import { Box, Slot } from "../unit/package/Primitive/main";

const grid = new Grid(defineHex(), rectangle({ width: 10, height: 10 }));

const lineBetween = line({ start: [2, 0], stop: [1, 4] });
const res = grid.traverse(lineBetween);
const hexArray2 = res.toArray();

const hexToPosition = (hex: Hex): [number, number, number] => {
  const { x, y } = hexToPoint(hex);
  if (hexArray2.includes(hex)) {
    return [x, 1, y];
  }
  return [x, 0, y];
};

export const Main = () => {
  const hexArray = grid.toArray();
  return (
    <Slot>
      {hexArray.map((hex: Hex, index: number) => (
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
