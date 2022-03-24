import { TransformConversions } from "../util/transform.js";
import { EConstraintsX, EConstraintsY, Rect } from "./rect.js";
export var BoxType;
(function (BoxType) {
    BoxType["hz"] = "hz";
    BoxType["vt"] = "vt";
})(BoxType || (BoxType = {}));
export class Box extends Rect {
    constructor(boxType) {
        super();
        this.children = [];
        this.availableSpace = 0;
        this.fixedSizeSpace = 0;
        this.resizeBoxToContent = false;
        this.boxType = boxType;
    }
    setBoxType(boxType) {
        this.boxType = boxType;
    }
    resizeSelf() {
        super.resizeSelf();
        this.impValues(); //first need to resize before we can set
    }
    //public addInBetweenRect(rect: IRectConfig) {
    //    function childPush(args: any, thisObj: Rect[]) {
    //        const changedShape: Rect = args[0];
    //        const index = thisObj.indexOf(changedShape);
    //        if (thisObj[index - 1]) {
    //            const r1 = new Rect
    //            // @ts-ignore: to ignore next line in ts
    //            r1["hi"] = true;
    //            r1.addConfig(rect);
    //            r1.addConfig({
    //                parent: thisObj[0].parent
    //            })
    //            r1.setIndexInParent(index);
    //        }
    //    }
    //    function childSplice(args: any, thisObj: Rect[]) {
    //        console.log("destroy3")
    //        const changedIndex: number = args[0];
    //        console.log(args)
    //        //const index = thisObj.indexOf(changedShape);
    //        if(thisObj[changedIndex - 1]){
    //            if (thisObj[changedIndex - 1].hi==true) {
    //                thisObj[changedIndex - 1].destroySelfAndChildren();
    //            }
    //        }
    //    }
    //    // @ts-ignore: to ignore next line in ts
    //    this.children.push = function () {
    //        // @ts-ignore: to ignore next line in ts
    //        Array.prototype.push.apply(this, arguments);
    //        if (!(arguments[0].hi == true)) {
    //            childPush(arguments, this);
    //        }
    //    };
    //    // @ts-ignore: to ignore next line in ts
    //    this.children.splice = function () {
    //        // @ts-ignore: to ignore next line in ts
    //        Array.prototype.splice.apply(this, arguments);
    //        // @ts-ignore: to ignore next line in ts
    //        if (!(arguments[0].hi == true)) {
    //            childSplice(arguments,this);
    //        }
    //    };
    //}
    impValues() {
        if (this.boxType == BoxType.hz) {
            let fixedSizeSumm = 0;
            this.children.forEach(el => {
                const elConsts = el.gConsts();
                if (elConsts.x == EConstraintsX.left || elConsts.x == EConstraintsX.right || elConsts.x == EConstraintsX.center) {
                    fixedSizeSumm += el.fixedSize.w;
                }
            });
            this.availableSpace = TransformConversions.edgesToPosAndSize(this.absEdges).size.w - fixedSizeSumm;
            let childrenDimensionsSumm = 0;
            this.children.forEach(el => {
                const elConsts = el.gConsts();
                if (elConsts.x == EConstraintsX.scale) {
                    childrenDimensionsSumm += el.boxProp;
                }
            });
            this.fixedSizeSpace = childrenDimensionsSumm;
        }
        else {
            let fixedSizesSumm = 0;
            this.children.forEach(el => {
                const elConsts = el.gConsts();
                if (elConsts.y == EConstraintsY.top || elConsts.y == EConstraintsY.bottom || elConsts.y == EConstraintsY.center) {
                    fixedSizesSumm += el.fixedSize.h;
                }
            });
            this.availableSpace = TransformConversions.edgesToPosAndSize(this.absEdges).size.h - fixedSizesSumm;
            let childrenDimensionsSumm = 0;
            this.children.forEach(el => {
                const elConsts = el.gConsts();
                if (elConsts.y == EConstraintsY.scale) {
                    childrenDimensionsSumm += el.boxProp;
                }
            });
            this.fixedSizeSpace = childrenDimensionsSumm;
        }
    }
    resizeWithBox(rect) {
        if (this.boxType == BoxType.hz) {
            const parentAbsEdges = this.absEdges;
            const absEdges = rect.absEdges;
            absEdges.top = parentAbsEdges.top;
            absEdges.bottom = parentAbsEdges.bottom;
            switch (rect.gConsts().x) {
                case EConstraintsX.left:
                case EConstraintsX.right:
                case EConstraintsX.center:
                    if (this.isFirst(rect)) {
                        absEdges.left = parentAbsEdges.left;
                    }
                    else {
                        absEdges.left = this.getPrevious(rect).absEdges.right;
                    }
                    absEdges.right = absEdges.left + rect.fixedSize.w;
                    break;
                case EConstraintsX.scale:
                    if (this.isFirst(rect)) {
                        absEdges.left = parentAbsEdges.left;
                    }
                    else {
                        absEdges.left = this.getPrevious(rect).absEdges.right;
                    }
                    absEdges.right = absEdges.left + this.availableSpace * rect.boxProp / this.fixedSizeSpace;
                    break;
            }
            rect.absEdges = absEdges;
        }
        else {
            const parentAbsEdges = this.absEdges;
            const absEdges = rect.absEdges;
            absEdges.left = parentAbsEdges.left;
            absEdges.right = parentAbsEdges.right;
            switch (rect.gConsts().y) {
                case EConstraintsY.top:
                case EConstraintsY.bottom:
                case EConstraintsY.center:
                    if (this.isFirst(rect)) {
                        absEdges.top = parentAbsEdges.top;
                    }
                    else {
                        absEdges.top = this.getPrevious(rect).absEdges.bottom;
                    }
                    absEdges.bottom = absEdges.top + rect.fixedSize.h;
                    break;
                case EConstraintsY.scale:
                    if (this.isFirst(rect)) {
                        absEdges.top = parentAbsEdges.top;
                    }
                    else {
                        absEdges.top = this.getPrevious(rect).absEdges.bottom;
                    }
                    absEdges.bottom = absEdges.top + this.availableSpace * rect.boxProp / this.fixedSizeSpace;
                    break;
            }
            rect.absEdges = absEdges;
        }
    }
    isFirst(child) {
        const indexInParent = this.children.indexOf(child);
        if (indexInParent == 0) {
            return true;
        }
        return false;
    }
    getPrevious(child) {
        const indexInParent = this.children.indexOf(child);
        const newRect = this.children[indexInParent - 1];
        return newRect;
    }
}
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
