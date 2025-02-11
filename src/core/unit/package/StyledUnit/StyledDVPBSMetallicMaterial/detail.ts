import {
  DetailBase,
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../../../lib/miragex/unit/common";

const detail = {
  code: "StyledUnit/StyledDVPBSMetallicMaterial",
  propsConfig: {
    name: UnitProp.String("Name"),
    albedoColor: UnitProp.Color([1, 1, 1, 1]),
    metallic: UnitProp.Float(0),
    smoothness: UnitProp.Float(0.25),
  },
  children: "multi",
} satisfies DetailBase;

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
