import { createCylinderMesh, createStyle } from "../../lib/styledUnit";

export const { StyledSpace, Color, Sprite, Material, Font, Mesh } = createStyle(
  {
    Color: {},
    Sprite: {},
    Material: {},
    Font: {},
    Mesh: {
      hex: createCylinderMesh({
        height: 0.1,
        radius: 0.99,
        sides: 6,
        flatShading: true,
      }),
    },
  },
);
