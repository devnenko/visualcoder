import { EConstraintsX, EConstraintsY } from "../ui/rect.js";
export const configs = {
    fillSpace: { constraintX: EConstraintsX.scale, constraintY: EConstraintsY.scale },
    setSize(size) {
        return { fixedSizeW: size, fixedSizeH: size };
    }
};
