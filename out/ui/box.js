import { TransformConversions } from "../util/transform.js";
import { BoxType, EConstraintsX, EConstraintsY, Rect } from "./rect.js";
import { boundingRect } from './bounding_rect.js';
export class Box extends Rect {
    constructor(boxType) {
        super();
        this.children = [];
        this.availableSpace = 0;
        this.childProportionsSumm = 0;
        this.resizeBoxToContent = false; //need to implement this
        this.isBetStartEnd = false;
        //public boxType;
        this.inBetweenClass = null;
        this.fnToApply = (rect) => { };
        this.boxType = boxType;
    }
    sBoxType(boxType) {
        this.boxType = boxType;
        return this;
    }
    gBoxType() {
        return this.boxType;
    }
    resizeSelf() {
        super.resizeSelf();
        this.impValues(); //first need to resize before we can set
    }
    addBetRect() {
        if (this.inBetweenClass != null) {
            const rect = new this.inBetweenClass();
            this.fnToApply(rect);
            rect.placeHolder = true;
            rect.sParent(this);
            return rect;
        }
        return null;
    }
    setInBetween(rectClass, fnToApply) {
        this.inBetweenClass = rectClass;
        this.fnToApply = fnToApply;
    }
    refreshInBetween() {
        for (let i = 0; i < this.children.length; i++) {
            const currChild = this.children[i];
            if (currChild.placeHolder == true) {
                if (this.isFirst(currChild) || this.children.indexOf(currChild) == this.children.length - 1) {
                    currChild.destroy();
                }
                else if (this.children[i + 1].placeHolder == true) {
                    currChild.destroy();
                }
            }
            if (!(this.isFirst(currChild) || currChild.placeHolder == true)) {
                const prevChild = this.children[i - 1];
                if (prevChild.placeHolder != true) {
                    const rect = this.addBetRect();
                    if (rect != null) {
                        rect.indexInParent(i); //because index should be one greater than previous, is how it works in function
                    }
                }
            }
        }
        if (this.isBetStartEnd) {
            const r = this.addBetRect();
            if (r) {
                r.indexInParent(0);
            }
            const r2 = this.addBetRect();
            if (r2) {
                r2.indexInParent(this.gChildren().length);
            }
        }
        boundingRect.draw();
    }
    pushChild(child) {
        //this.refreshInBetween();
        super.pushChild(child);
    }
    spliceChild(child) {
        super.spliceChild(child);
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
                    fixedSizeSumm += el.gFixedSize().w;
                }
            });
            this.availableSpace = TransformConversions.edgesToPosAndSize(this.gAbsEdges()).size.w - fixedSizeSumm;
            let childrenDimensionsSumm = 0;
            this.children.forEach(el => {
                const elConsts = el.gConsts();
                if (elConsts.x == EConstraintsX.scale) {
                    childrenDimensionsSumm += el.gBoxProp();
                }
            });
            this.childProportionsSumm = childrenDimensionsSumm;
        }
        else {
            let fixedSizesSumm = 0;
            this.children.forEach(el => {
                const elConsts = el.gConsts();
                if (elConsts.y == EConstraintsY.top || elConsts.y == EConstraintsY.bottom || elConsts.y == EConstraintsY.center) {
                    fixedSizesSumm += el.gFixedSize().h;
                }
            });
            this.availableSpace = TransformConversions.edgesToPosAndSize(this.gAbsEdges()).size.h - fixedSizesSumm;
            let childrenDimensionsSumm = 0;
            this.children.forEach(el => {
                const elConsts = el.gConsts();
                if (elConsts.y == EConstraintsY.scale) {
                    childrenDimensionsSumm += el.gBoxProp();
                }
            });
            this.childProportionsSumm = childrenDimensionsSumm;
        }
    }
    resizeWithBox(rect) {
        if (this.boxType == BoxType.hz) {
            const parentAbsEdges = this.gAbsEdges();
            const absEdges = rect.gAbsEdges();
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
                        absEdges.left = this.getPrevious(rect).gAbsEdges().right;
                    }
                    absEdges.right = absEdges.left + rect.gFixedSize().w;
                    break;
                case EConstraintsX.scale:
                    if (this.isFirst(rect)) {
                        absEdges.left = parentAbsEdges.left;
                    }
                    else {
                        absEdges.left = this.getPrevious(rect).gAbsEdges().right;
                    }
                    absEdges.right = absEdges.left + this.availableSpace * rect.gBoxProp() / this.childProportionsSumm;
                    break;
            }
            rect.sAbsEdges(absEdges);
        }
        else {
            const parentAbsEdges = this.gAbsEdges();
            const absEdges = rect.gAbsEdges();
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
                        absEdges.top = this.getPrevious(rect).gAbsEdges().bottom;
                    }
                    absEdges.bottom = absEdges.top + rect.gFixedSize().h;
                    break;
                case EConstraintsY.scale:
                    if (this.isFirst(rect)) {
                        absEdges.top = parentAbsEdges.top;
                    }
                    else {
                        absEdges.top = this.getPrevious(rect).gAbsEdges().bottom;
                    }
                    absEdges.bottom = absEdges.top + this.availableSpace * rect.gBoxProp() / this.childProportionsSumm;
                    break;
            }
            rect.sAbsEdges(absEdges);
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
