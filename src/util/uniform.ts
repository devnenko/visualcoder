import { Box} from "../ui/box.js";
import { BoxType, EConstraintsX, EConstraintsY, Rect } from "../ui/rect.js";
import { TransformConversions } from "./transform.js";

class Uniform {
    defEdgeDist = 6;
    defSnapMargin = 4;
    vtBoxSize=50;
    applyOffsetSnap=<T extends Rect>(baseObj: T) => {
        baseObj.sSnapMargin(this.defSnapMargin)
        
        if((baseObj.gParent() as Rect).boxType==BoxType.hz){
            console.log("ye")
            baseObj.sFixedOffsetX(this.defEdgeDist);
        }else{
            console.log("yo")
            baseObj.sFixedOffsetY(this.defEdgeDist);
        }

        return baseObj;
    }
    makeInvisFill = <T extends Rect>(baseObj: T, parent?: Rect) => {
        baseObj
            .sFillSpace()
            .sIsVisible(false);

        if (parent) {
            baseObj.sParent(parent)
        }
        return baseObj;
    }

    makeRectConform = <T extends Rect>(baseObj: T,parent: Rect) => {

        baseObj.sParent(parent)
        
        if(parent.boxType==BoxType.hz){
            baseObj.sConstY(EConstraintsY.scale)
                .sFixedSize(parent.gFixedSize().h)
        }else{
            baseObj.sConstX(EConstraintsX.scale)
                .sFixedSize(parent.gFixedSize().w)
        }

        return baseObj;
    }
}

export const uniform = new Uniform;