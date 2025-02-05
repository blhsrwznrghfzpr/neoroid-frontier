import {
  fromCoordinates,
  Grid,
  line,
  ring,
  HexCoordinates,
  Traverser 
} from "honeycomb-grid";
import { Cell } from "./cell";

function aStarSearch(grid: Grid<Cell>, start: HexCoordinates, goal: HexCoordinates): Cell[] {
  const openSet = new Set<Cell>();
  const cameFrom = new Map<Cell, Cell>();
  const gScore = new Map<Cell, number>();
  const fScore = new Map<Cell, number>();

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

    const neighborGrids = grid.traverse(ring<Cell>({ center: [current.q, current.r], radius: 1 }));
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

function getBlockedHexes(grid: Iterable<Cell>): Cell[] {
  return [...grid].filter(hex => hex.isBlocked);
}

interface customLineOptions {
  start: HexCoordinates;
  stop: HexCoordinates;
  grid: Grid<Cell>;
}


export function customLine<T extends Cell>(options: customLineOptions): Traverser<T> {
  return function customLineTraverser(createHex) {
    const lineBetween = line<Cell>({ start: options.start, stop: options.stop });
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