import { Slot } from "../../../unit/package/Primitive/main";
import { MeshRenderer } from "../../../unit/package/StyledObject/main";
import { Cell, StoneCell, TreeCell } from "../../game/map/cell";
import { Material, Mesh } from "../style";

export const CellRender = ({ cell }: { cell: Cell }) => (
  <Slot position={cell.point}>
    {cell.cellState.type === "tree" ? (
      <TreeCellRender cell={cell.cellState} />
    ) : cell.cellState.type === "stone" ? (
      <StoneCellRender cell={cell.cellState} />
    ) : (
      <MeshRenderer styledMaterial={Material.brown} styledMesh={Mesh.hex} />
    )}
  </Slot>
);

const TreeCellRender = ({ cell }: { cell: TreeCell }) => (
  <Slot name="TreeCell">
    <MeshRenderer styledMaterial={Material.green} styledMesh={Mesh.hex} />
    {cell.blocks.map((_block, index) => (
      <MeshRenderer key={index} styledMesh={Mesh.block} />
    ))}
  </Slot>
);

const StoneCellRender = ({ cell }: { cell: StoneCell }) => (
  <Slot name="TreeCell">
    <MeshRenderer styledMaterial={Material.gray} styledMesh={Mesh.hex} />
    {cell.blocks.map((_block, index) => (
      <MeshRenderer key={index} styledMesh={Mesh.block} />
    ))}
  </Slot>
);
