
import { TransformConversions } from "../util/transform.js";
import { EConstraintsX, EConstraintsY, IRectConfig, Rect} from "./rect.js";
import { boundingRect } from './bounding_rect.js';


export interface IBoxConfig extends IRectConfig {
    resizeBoxToContent?: boolean
}

export class Box<Config = IBoxConfig> extends Rect<Config> {
    public children: Rect[] = [];
    public isHz:boolean;
    public availableSpace = 0;
    public fixedSizeSpace = 0;
    resizeBoxToContent = false;

    constructor(isHz:boolean) {
        super();
        this.isHz=isHz;
    }

    setBoxType(isHz:boolean){
        this.isHz=isHz;
        boundingRect.draw();
    }

    public addConfig(config: Config): void {
        super.addConfig(config);
    }

    public resize(){
        this.impValues();
        super.resize();
    }

    public addInBetweenRect(rect: IRectConfig) {
        function childPush(args: any, thisObj: Rect[]) {
            const changedShape: Rect = args[0];
            const index = thisObj.indexOf(changedShape);
            if (thisObj[index - 1]) {
                const r1 = new Rect
                // @ts-ignore: to ignore next line in ts
                r1["hi"] = true;
                r1.addConfig(rect);
                r1.addConfig({
                    parent: thisObj[0].parent
                })
                r1.setIndexInParent(index);
            }
        }
        function childSplice(args: any, thisObj: Rect[]) {
            console.log("destroy3")
            const changedIndex: number = args[0];
            console.log(args)
            //const index = thisObj.indexOf(changedShape);
            if(thisObj[changedIndex - 1]){
                if (thisObj[changedIndex - 1].hi==true) {
                    thisObj[changedIndex - 1].destroySelfAndChildren();
                }
            }
        }
        // @ts-ignore: to ignore next line in ts
        this.children.push = function () {
            // @ts-ignore: to ignore next line in ts
            Array.prototype.push.apply(this, arguments);
            if (!(arguments[0].hi == true)) {
                childPush(arguments, this);
            }
        };
        // @ts-ignore: to ignore next line in ts
        this.children.splice = function () {
            // @ts-ignore: to ignore next line in ts
            Array.prototype.splice.apply(this, arguments);
            // @ts-ignore: to ignore next line in ts
            if (!(arguments[0].hi == true)) {
                childSplice(arguments,this);
            }
        };
    }

    public impValues(){
        if(this.isHz){
            let fixedSizeSumm = 0;
            this.children.forEach(el => {
                if (el.constraintX == EConstraintsX.left || el.constraintX == EConstraintsX.right || el.constraintX == EConstraintsX.center) {
                    fixedSizeSumm += el.fixedSizeW;
                }
            })
            this.availableSpace = TransformConversions.edgesToPosAndSize(this.absEdges).size.w - fixedSizeSumm;
    
            let childrenDimensionsSumm = 0;
            this.children.forEach(el => {
                if (el.constraintX == EConstraintsX.scale) {
                    childrenDimensionsSumm += el.boxProportion;
                }
            })
            this.fixedSizeSpace = childrenDimensionsSumm;
    
            //const absEdges = this.absEdges;
            //const parentAbsEdges = this.parent.absEdges;
    //
            //if (this.resizeBoxToContent == true) {
            //    switch (this.constraintX) {
            //        case EConstraintsX.left:
            //            absEdges.left = parentAbsEdges.left + this.fixedOffsetX;
            //            absEdges.right = absEdges.left + fixedSizeSumm;
            //            break;
            //        case EConstraintsX.right:
            //            absEdges.right = parentAbsEdges.right - this.fixedOffsetX;
            //            absEdges.left = absEdges.right - fixedSizeSumm;
            //            break;
            //        case EConstraintsX.center:
            //            const middle = TransformConversions.average(parentAbsEdges.left, parentAbsEdges.right);
            //            absEdges.left = middle - fixedSizeSumm / 2 + this.fixedOffsetX;
            //            absEdges.right = absEdges.left + fixedSizeSumm;
            //            break;
            //        default:
            //            console.error("box has scale constraint, but is supposed to resize to content, makes no sense")
            //    }
            //}
    //
            //this.absEdges = absEdges;
        }
        else{
            let fixedSizesSumm=0;
            this.children.forEach(el=>{
                if(el.constraintY==EConstraintsY.top||el.constraintY==EConstraintsY.bottom||el.constraintY==EConstraintsY.center){
                    fixedSizesSumm+=el.fixedSizeH;
                }
            })
            this.availableSpace=TransformConversions.edgesToPosAndSize(this.absEdges).size.h-fixedSizesSumm;
    
            let childrenDimensionsSumm=0;
            this.children.forEach(el=>{
                if(el.constraintY==EConstraintsY.scale){
                    childrenDimensionsSumm+=el.boxProportion;
                }
            })
            this.fixedSizeSpace=childrenDimensionsSumm;
    
            //const absEdges=this.absEdges;
            //const parentAbsEdges=this.parent.absEdges;
    //
            //if(this.resizeBoxToContent==true){
            //    switch(this.constraintY){
            //        case EConstraintsY.top:
            //            absEdges.top=parentAbsEdges.top+this.fixedOffsetY;
            //            absEdges.bottom=absEdges.top+fixedSizesSumm;
            //            break;
            //        case EConstraintsY.bottom:
            //            absEdges.bottom=parentAbsEdges.bottom-this.fixedOffsetY;
            //            absEdges.top=absEdges.bottom-fixedSizesSumm;
            //            break;
            //        case EConstraintsY.center:
            //            const middle=TransformConversions.average(parentAbsEdges.top,parentAbsEdges.bottom);
            //            absEdges.top=middle-fixedSizesSumm/2+this.fixedOffsetY;
            //            absEdges.bottom=absEdges.top+fixedSizesSumm;
            //            break;
            //        default:
            //            console.error("box has scale constraint, but is supposed to resize to content, makes no sense")
            //    }
            //}
    //
            //this.absEdges=absEdges;
        }
    }

    public resizeWithBox(rect:Rect){
        if(this.isHz){
            const parentAbsEdges = this.absEdges;
            const absEdges = rect.absEdges;
    
            absEdges.top = parentAbsEdges.top
            absEdges.bottom = parentAbsEdges.bottom
            switch (rect.constraintX) {
                case EConstraintsX.left: case EConstraintsX.right: case EConstraintsX.center:
                    if (this.isFirst(rect)) {
                        absEdges.left = parentAbsEdges.left;
                    }
                    else {
                        absEdges.left = this.getPrevious(rect).absEdges.right;
                    }
                    absEdges.right = absEdges.left + rect.fixedSizeW;
                    break;
                case EConstraintsX.scale:
                    if (this.isFirst(rect)) {
                        absEdges.left = parentAbsEdges.left;
                    }
                    else {
                        absEdges.left = this.getPrevious(rect).absEdges.right;
                    }
                    absEdges.right = absEdges.left + this.availableSpace * rect.boxProportion / this.fixedSizeSpace;
                    break;
            }
    
            rect.absEdges = absEdges;
        }
        else{
            const parentAbsEdges=this.absEdges;
            const absEdges=rect.absEdges;
    
            absEdges.left=parentAbsEdges.left
            absEdges.right=parentAbsEdges.right
            switch(rect.constraintY){
                case EConstraintsY.top: case EConstraintsY.bottom: case EConstraintsY.center:
                    if(this.isFirst(rect)){
                        absEdges.top=parentAbsEdges.top;
                    }
                    else{
                        absEdges.top=this.getPrevious(rect).absEdges.bottom;
                    }
                    absEdges.bottom=absEdges.top+rect.fixedSizeH;
                    break;
                case EConstraintsY.scale:
                    if(this.isFirst(rect)){
                        absEdges.top=parentAbsEdges.top;
                    }
                    else{
                        absEdges.top=this.getPrevious(rect).absEdges.bottom;
                    }
                    absEdges.bottom=absEdges.top+this.availableSpace*rect.boxProportion/this.fixedSizeSpace;
                    break;
            }
            rect.absEdges=absEdges;
        }
    }

    private isFirst(child: Rect) {
        const indexInParent = this.children.indexOf(child);
        if (indexInParent == 0) {
            return true;
        }
        return false;
    }
    private getPrevious(child: Rect) {
        const indexInParent = this.children.indexOf(child);
        const newRect = this.children[indexInParent - 1];
        return newRect as Rect;
    }
}