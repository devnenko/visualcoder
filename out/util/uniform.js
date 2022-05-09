import { BoxType, EConstraintsX, EConstraintsY } from "../ui/rect.js";
class Uniform {
    constructor() {
        this.defEdgeDist = 6;
        this.defSnapMargin = 4;
        this.vtBoxSize = 50;
        this.applyOffsetSnap = (baseObj) => {
            baseObj.sSnapMargin(this.defSnapMargin);
            if (baseObj.gParent().boxType == BoxType.hz) {
                console.log("ye");
                baseObj.sFixedOffsetX(this.defEdgeDist);
            }
            else {
                console.log("yo");
                baseObj.sFixedOffsetY(this.defEdgeDist);
            }
            return baseObj;
        };
        this.makeInvisFill = (baseObj, parent) => {
            baseObj
                .sFillSpace()
                .sIsVisible(false);
            if (parent) {
                baseObj.sParent(parent);
            }
            return baseObj;
        };
        this.makeRectConform = (baseObj, parent) => {
            baseObj.sParent(parent);
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
export const uniform = new Uniform;
