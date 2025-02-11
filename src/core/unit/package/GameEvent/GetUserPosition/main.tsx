import { generateMain } from "../../../../../lib/miragex/unit/main";
import { useCallback } from "react";

import { FunctionEnv } from "../../../../../lib/miragex/common/interactionEvent";
import { unitConfig } from "./detail";

//export const O = generateMain(unitConfig);
const Unit = generateMain(unitConfig);

interface OProps extends Omit<Parameters<typeof Unit>[0], 'onChange'> {
    onChange?: (env: FunctionEnv, text: string) => void;
  }
  
export const O: React.FC<OProps> = (props) => {
    // InteractionEventの引数を加工する処理はdetailで定義したいが対応できていないので一旦ここに書く
    const fixedOnChange = useCallback(
    (env: FunctionEnv, text: string) =>
        props.onChange?.(env, decodeURIComponent(text)),
    [props.onChange],
    );

    return Unit({
    ...props,
    onChange: fixedOnChange,
    });
};