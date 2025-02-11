import {
  createBoxMesh,
  createCylinderMesh,
  createPBSMetallicMaterial,
  createStyle,
} from "../../lib/styledUnit";

export const { StyledSpace, Color, Sprite, Material, Font, Mesh } = createStyle(
  {
    Color: {},
    Sprite: {},
    Material: {
      green: createPBSMetallicMaterial({
        albedoColor: [0.1, 0.5, 0.1, 1],
      }),
      brown: createPBSMetallicMaterial({
        albedoColor: [0.5, 0.3, 0.1, 1],
      }),
      gray: createPBSMetallicMaterial({
        albedoColor: [0.3, 0.3, 0.3, 1],
      }),
    },
    Font: {},
    Mesh: {
      hex: createCylinderMesh({
        height: 0.1,
        radius: 0.99,
        sides: 6,
        flatShading: true,
      }),
      block: createBoxMesh({
        size: [0.2, 0.2, 0.6],
      }),
    },
  },
);
