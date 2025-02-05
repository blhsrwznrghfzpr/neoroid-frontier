import { Unit } from "../../../../../lib/miragex/common/unitChangeEvent";
import { generateMain } from "../../../../../lib/miragex/unit/main";
import {
  StyledMaterialVariable,
  StyledMeshVariable,
} from "../../../../lib/styledUnit";

import { unitConfig } from "./detail";

const Unit = generateMain(unitConfig);

export const O = (
  props: Omit<Parameters<typeof Unit>[0], "styledMesh" | "styledMaterial"> & {
    styledMesh?: StyledMeshVariable;
    styledMaterial?: StyledMaterialVariable;
  },
) => {
  return Unit({
    ...props,
    styledMesh: props.styledMesh?.variableName,
    styledMaterial: props.styledMaterial?.variableName,
  });
};
