import { BoxType, EConstraintsX, EConstraintsY } from "../ui/rect.js";
class Uniform {
    constructor() {
        this.defEdgeDist = 4;
        this.defSnapMargin = 5;
        this.vtBoxSize = 45;
        this.offsetSnap = (baseObj) => {
            baseObj.sSnapMargin(this.defSnapMargin);
            if (baseObj.gParent().boxType == BoxType.hz) {
                baseObj.sFixedOffsetX(this.defEdgeDist);
            }
            else {
                baseObj.sFixedOffsetY(this.defEdgeDist);
            }
            return baseObj;
        };
        this.invisFill = (baseObj) => {
            baseObj
                .sFillSpace()
                .sIsVisible(false);
            return baseObj;
        };
        this.makeConform = (baseObj) => {
            const parent = baseObj.gParent();
            if (parent.boxType == BoxType.hz) {
                baseObj.sConstY(EConstraintsY.scale)
                    .sFixedSize(parent.gFixedSize().h);
            }
            else {
                baseObj.sConstX(EConstraintsX.scale)
                    .sFixedSize(parent.gFixedSize().w);
            }
            return baseObj;
        };
    }
}
export const uni = new Uniform;
