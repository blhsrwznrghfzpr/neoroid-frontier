import {
  fromCoordinates,
  Grid,
  Hex,
  hexToPoint,
  line,
  ring,
  rectangle,
  HexCoordinates,
  Traverser 
} from "honeycomb-grid";
import { Slot, Cylinder } from "../unit/package/Primitive/main";
import { Canvas } from "../unit/package/PrimitiveUix/main";
import { StyledText } from "../unit/package/StyledUix/main";

class CustomHex extends Hex {
  isBlocked: boolean = false;

  toggleBlocked() {
    this.isBlocked = !this.isBlocked;
  }
}


function aStarSearch(grid: Grid<CustomHex>, start: HexCoordinates, goal: HexCoordinates): CustomHex[] {
  const openSet = new Set<CustomHex>();
  const cameFrom = new Map<CustomHex, CustomHex>();
  const gScore = new Map<CustomHex, number>();
  const fScore = new Map<CustomHex, number>();

  const startHex = grid.getHex(start);
  const goalHex = grid.getHex(goal);

  if (!startHex || !goalHex) {
    return [];
  }

  openSet.add(startHex);
  gScore.set(startHex, 0);
  fScore.set(startHex, grid.distance(start, goal));

  while (openSet.size > 0) {
    let current = [...openSet].reduce((a, b) => (fScore.get(a) ?? Infinity) < (fScore.get(b) ?? Infinity) ? a : b);

    if (current.equals(goalHex)) {
      const path = [current];
      while (cameFrom.has(current)) {
        current = cameFrom.get(current)!;
        path.unshift(current);
      }
      console.log(path);
      return path;
    }

    openSet.delete(current);

    const neighborGrids = grid.traverse(ring<CustomHex>({ center: [current.q, current.r], radius: 1 }));
    for (const neighbor of neighborGrids) {
      if (neighbor.isBlocked) continue;

      const tentativeGScore = (gScore.get(current) ?? Infinity) + 1;

      if (tentativeGScore < (gScore.get(neighbor) ?? Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeGScore);
        fScore.set(neighbor, tentativeGScore + grid.distance([neighbor.q,neighbor.r], [goalHex.q,goalHex.r]));

        if (!openSet.has(neighbor)) {
          openSet.add(neighbor);
        }
      }
    }
  }
  return [startHex];
}

function getBlockedHexes(grid: Iterable<CustomHex>): CustomHex[] {
  return [...grid].filter(hex => hex.isBlocked);
}

interface customLineOptions {
  start: HexCoordinates;
  stop: HexCoordinates;
  grid: Grid<CustomHex>;
}


function customLine<T extends CustomHex>(options: customLineOptions): Traverser<T> {
  return function customLineTraverser(createHex) {
    const lineBetween = line<CustomHex>({ start: options.start, stop: options.stop });
    const result = options.grid.traverse(lineBetween);
    const blockedHexes = getBlockedHexes(result);
    if(blockedHexes.length == 0) {
      return lineBetween(createHex) as T[];
    }
    const pathList = aStarSearch(options.grid,options.start,options.stop)
    const coordinates = pathList.map((hex) => [hex.q, hex.r] as [number, number]); 
    const lineAStar = fromCoordinates<T>(...coordinates)

    return lineAStar(createHex);
  };
}

const grid = new Grid(CustomHex, rectangle({ width: 10, height: 10 }));

const blockedCoords: [number, number][] = [
  [0, 1],
  [1, 1],
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 2],
  [5, 2],
  [6, 2],
  [8, 2]
];

blockedCoords.forEach(([q, r]) => {
  const hex = grid.getHex([q, r]);
  if (hex) {
    hex.toggleBlocked();
  }
});

const lineBetween = customLine({ start: [2, 0], stop: [1, 4],grid: grid });
const res = grid.traverse(lineBetween);

const hexArray2 = res.toArray();
let counter = 0.3;

const hexToPosition = (hex: CustomHex): [number, number, number] => {
  const { x, y } = hexToPoint(hex);
  if (hexArray2.includes(hex)) {
    return [x, counter += 0.2, y];
  }
  return [x, 0, y];
};

export const MainTest = () => {
  const hexArray = grid.toArray();
  return (
    <Slot>
      {hexArray.map((hex: CustomHex, index: number) => (
        <Slot
          key={index}
          name={`hex-${index}-[${hex.q},${hex.r}]`}
          position={hexToPosition(hex)}
        >
          <Cylinder FlatShading Radius={0.97} Sides={6} height={0.1} />
          <Canvas position={[0, -0.3, 0]}>
            <StyledText
              content={`${hex.q},${hex.r}`}
              defaultColor = {hex.isBlocked ? [1, 0, 0, 1] : [0, 0, 0, 1]}
            />
          </Canvas>
        </Slot>
      ))}
    </Slot>
  );
};
