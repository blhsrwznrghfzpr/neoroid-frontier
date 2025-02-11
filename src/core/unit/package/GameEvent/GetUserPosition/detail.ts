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
    updateInterval: UnitProp.Float(10),
    onChange: UnitProp.Function((_env: FunctionEnv, _text: string) => {}),
  },
  children: "multi",
} as const satisfies DetailBase;

export type MainProps = getMainProps<typeof detail>;
export type MirrorProps = getMirrorProps<typeof detail>;
export type WebProps = getWebProps<typeof detail>;
export const unitConfig = generateUnitConfig(detail);
