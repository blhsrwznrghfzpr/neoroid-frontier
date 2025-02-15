import {
  DetailBase,
  UnitProp,
  generateUnitConfig,
  getMainProps,
  getMirrorProps,
  getWebProps,
} from "../../../../../lib/miragex/unit/common";
import { FunctionEnv } from "../../../../../lib/miragex/common/interactionEvent";

const detail = {
  code: "GameEvent/GetUserPosition",
  propsConfig: {
    userId: UnitProp.String(""),
    updateInterval: UnitProp.Float(5),
    onUpdate: UnitProp.Function(
      (_env: FunctionEnv, _position: [number, number, number]) => {},
    ),
  },
  children: "multi",
} as const satisfies DetailBase;

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
