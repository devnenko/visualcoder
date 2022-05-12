import { Box} from "../ui/box.js";
import { BoxType, EConstraintsX, EConstraintsY, Rect } from "../ui/rect.js";
import { TransformConversions } from "./transform.js";

class Uniform {
    defEdgeDist = 4;
    defSnapMargin = 5;
    vtBoxSize=45;
    offsetSnap=<T extends Rect>(baseObj: T) => {
        baseObj.sSnapMargin(this.defSnapMargin)
        
        if((baseObj.gParent() as Rect).boxType==BoxType.hz){
            baseObj.sFixedOffsetX(this.defEdgeDist);
        }else{
            baseObj.sFixedOffsetY(this.defEdgeDist);
        }

        return baseObj;
    }
    invisFill = <T extends Rect>(baseObj: T) => {
        baseObj
            .sFillSpace()
            .sIsVisible(false);

        return baseObj;
    }

    makeConform = <T extends Rect>(baseObj: T) => {

        const parent=baseObj.gParent() as Rect;
        
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

export const uni = new Uniform;