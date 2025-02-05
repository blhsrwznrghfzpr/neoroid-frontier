import {
  DetailBase,
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../../../lib/miragex/unit/common";

const detail = {
  code: "StyledUnit/StyledDVCylinderMesh",
  propsConfig: {
    name: UnitProp.String("Name"),
    height: UnitProp.Float(1),
    radius: UnitProp.Float(1),
    sides: UnitProp.Int(16),
    caps: UnitProp.Boolean(true),
    flatShading: UnitProp.Boolean(false),
  },
  children: "multi",
} satisfies DetailBase;

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
