import { boundingShape, EObjectType as ERectType, BoundingShape } from "./ui.js";
import { EConstraintsX, EConstraintsY } from "./types/types.js";
import { Shape } from "./shape.js";
//export function instanceOfRectType(object: any): object is RectType {
//    return object.hasOwnProperty('absEdges');
//}
var EBoxDirection;
(function (EBoxDirection) {
    EBoxDirection["LeftToRight"] = "LeftToRight";
    EBoxDirection["RightToLeft"] = "RightToLeft";
    EBoxDirection["TopToBottom"] = "TopToBottom";
    EBoxDirection["BottomToTop"] = "BottomToTop";
})(EBoxDirection || (EBoxDirection = {}));
export class Rect extends Shape {
    //private parentSize:IEdges={left:0,right:0,top:0,bottom:0};
    constructor(config) {
        super();
        //additional display options 
        this.isVisible = true;
        this.color = "pink";
        //constraints for calculating absEdges in resize event
        this.constraintX = EConstraintsX.left;
        this.constraintY = EConstraintsY.top;
        this.fixedSizeW = 100;
        this.fixedSizeH = 100;
        this.fixedOffsetX = 0;
        this.fixedOffsetY = 0;
        this.snapOffset = { left: 0, right: 0, top: 0, bottom: 0 };
        this.snapMargin = 0;
        this.boxProportion = { x: 100, y: 100 }; //number between 0 and 100 for fixed proportions
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
        this.clearAmount = { left: 0, right: 0, top: 0, bottom: 0 };
        this.rectType = ERectType.Normal;
        this.imageSrc = "";
        this.image = null;
        this.parent = boundingShape;
        this.boxDirection = EBoxDirection.LeftToRight;
        this.resizeBoxToContent = false;
        this.availableSpace = 0;
        this.allChildrenScale = 0;
        this.hasStroke = false;
        this.strokeSize = 5;
        this.strokeColor = "black";
        this.setAttrs(config);
    }
    addConfig(config) {
        super.addConfig(config);
    }
    setAttr(key, val) {
        if (key === "imageSrc") {
            this.createImage(val);
        }
        super.setAttr(key, val);
    }
    createImage(src) {
        console.log;
        let image = new Image();
        this.imageSrc = src;
        image.src = "/icons/".concat(src);
        this.image = image;
        this.image.onload = function () {
            boundingShape.draw();
        };
    }
    draw(parent) {
        if (parent instanceof Rect || parent instanceof BoundingShape) {
            this.newResizeRect();
            //this.drawRect();
            super.draw(parent);
        }
        else {
            console.warn("a rect is a child of a shape and doesnt know what to do");
            super.draw(parent);
        }
    }
    newResizeRect() {
        let absEdges = this.absEdges;
        const parentAbsEdges = this.parent.absEdges;
        if (this.parent.rectType == ERectType.Normal) {
            switch (this.constraintX) {
                case EConstraintsX.left:
                    absEdges.left = parentAbsEdges.left + this.fixedOffsetX;
                    absEdges.right = absEdges.left + this.fixedSizeW;
                    break;
                case EConstraintsX.right:
                    absEdges.right = parentAbsEdges.right - this.fixedOffsetX;
                    absEdges.left = absEdges.right - this.fixedSizeW;
                    break;
                case EConstraintsX.center:
                    const middle = this.average(parentAbsEdges.left, parentAbsEdges.right);
                    absEdges.left = middle - this.fixedSizeW / 2 + this.fixedOffsetX;
                    absEdges.right = absEdges.left + this.fixedSizeW;
                    break;
                case EConstraintsX.scale:
                    absEdges.left = parentAbsEdges.left;
                    absEdges.right = parentAbsEdges.right;
                    break;
            }
            switch (this.constraintY) {
                case EConstraintsY.top:
                    absEdges.top = parentAbsEdges.top + this.fixedOffsetY;
                    absEdges.bottom = absEdges.top + this.fixedSizeH;
                    break;
                case EConstraintsY.bottom:
                    absEdges.bottom = parentAbsEdges.bottom - this.fixedOffsetY;
                    absEdges.top = absEdges.bottom - this.fixedSizeH;
                    break;
                case EConstraintsY.center:
                    const middle = this.average(parentAbsEdges.top, parentAbsEdges.bottom);
                    absEdges.top = middle - this.fixedSizeH / 2 + this.fixedOffsetY;
                    absEdges.bottom = absEdges.top + this.fixedSizeH;
                    break;
                case EConstraintsY.scale:
                    absEdges.top = parentAbsEdges.top;
                    absEdges.bottom = parentAbsEdges.bottom;
                    break;
            }
        }
        else if (this.parent.rectType == ERectType.HzBox) {
            absEdges.top = parentAbsEdges.top;
            absEdges.bottom = parentAbsEdges.bottom;
            switch (this.constraintX) {
                case EConstraintsX.left:
                case EConstraintsX.right:
                case EConstraintsX.center:
                    if (this.isFirst()) {
                        absEdges.left = parentAbsEdges.left;
                        absEdges.right = absEdges.left + this.fixedSizeW;
                    }
                    else {
                        absEdges.left = this.getPrevious().absEdges.right;
                        absEdges.right = absEdges.left + this.fixedSizeW;
                    }
                    break;
                case EConstraintsX.scale:
                    if (this.isFirst()) {
                        absEdges.left = parentAbsEdges.left;
                        absEdges.right = absEdges.left + this.parent.availableSpace * this.boxProportion.x / this.parent.allChildrenScale;
                    }
                    else {
                        absEdges.left = this.getPrevious().absEdges.right;
                        absEdges.right = absEdges.left + this.parent.availableSpace * this.boxProportion.x / this.parent.allChildrenScale;
                    }
                    break;
            }
        }
        else if (this.parent.rectType == ERectType.VtBox) {
            absEdges.left = parentAbsEdges.left;
            absEdges.right = parentAbsEdges.right;
            switch (this.constraintY) {
                case EConstraintsY.top:
                case EConstraintsY.bottom:
                case EConstraintsY.center:
                    if (this.isFirst()) {
                        absEdges.top = parentAbsEdges.top;
                        absEdges.bottom = absEdges.top + this.fixedSizeH;
                    }
                    else {
                        absEdges.top = this.getPrevious().absEdges.bottom;
                        absEdges.bottom = absEdges.top + this.fixedSizeH;
                    }
                    break;
                case EConstraintsY.scale:
                    if (this.isFirst()) {
                        absEdges.top = parentAbsEdges.top;
                        absEdges.bottom = absEdges.top + this.parent.availableSpace * this.boxProportion.y / this.parent.allChildrenScale;
                    }
                    else {
                        absEdges.top = this.getPrevious().absEdges.bottom;
                        absEdges.bottom = absEdges.top + this.parent.availableSpace * this.boxProportion.y / this.parent.allChildrenScale;
                    }
                    break;
            }
        }
        this.absEdges = absEdges;
        if (this.rectType == ERectType.HzBox) {
            let allFixedSize = 0;
            this.children.forEach(el => {
                if (!(el instanceof Rect)) {
                    console.error("box has shape as child, not supported");
                }
                if (el.constraintX == EConstraintsX.left || el.constraintX == EConstraintsX.right || el.constraintX == EConstraintsX.center) {
                    allFixedSize += el.fixedSizeW;
                }
            });
            this.availableSpace = this.getAbsSize().w - allFixedSize;
            let childrenScale = 0;
            this.children.forEach(el => {
                if (!(el instanceof Rect)) {
                    console.error("box has shape as child, not supported");
                }
                if (el.constraintX == EConstraintsX.scale) {
                    childrenScale += el.boxProportion.x;
                }
            });
            //console.log(childrenScale)
            this.allChildrenScale = childrenScale;
            if (this.resizeBoxToContent == true) {
                switch (this.constraintX) {
                    case EConstraintsX.left:
                        absEdges.left = parentAbsEdges.left + this.fixedOffsetX;
                        absEdges.right = absEdges.left + allFixedSize;
                        break;
                    case EConstraintsX.right:
                        absEdges.right = parentAbsEdges.right - this.fixedOffsetX;
                        absEdges.left = absEdges.right - allFixedSize;
                        break;
                    case EConstraintsX.center:
                        const middle = this.average(parentAbsEdges.left, parentAbsEdges.right);
                        absEdges.left = middle - allFixedSize / 2 + this.fixedOffsetX;
                        absEdges.right = absEdges.left + allFixedSize;
                        break;
                }
            }
        }
        else if (this.rectType == ERectType.VtBox) {
            let allFixedSize = 0;
            this.children.forEach(el => {
                if (!(el instanceof Rect)) {
                    console.error("box has shape as child, not supported");
                }
                if (el.constraintY == EConstraintsY.top || el.constraintY == EConstraintsY.bottom || el.constraintY == EConstraintsY.center) {
                    allFixedSize += el.fixedSizeH;
                }
            });
            this.availableSpace = this.getAbsSize().h - allFixedSize;
            let childrenScale = 0;
            this.children.forEach(el => {
                if (!(el instanceof Rect)) {
                    console.error("box has shape as child, not supported");
                }
                if (el.constraintY == EConstraintsY.scale) {
                    childrenScale += el.boxProportion.y;
                }
            });
            //console.log(childrenScale)
            this.allChildrenScale = childrenScale;
            if (this.resizeBoxToContent == true) {
                switch (this.constraintY) {
                    case EConstraintsY.top:
                        absEdges.top = parentAbsEdges.top + this.fixedOffsetY;
                        absEdges.bottom = absEdges.top + allFixedSize;
                        break;
                    case EConstraintsY.bottom:
                        absEdges.bottom = parentAbsEdges.bottom - this.fixedOffsetY;
                        absEdges.top = absEdges.bottom - allFixedSize;
                        break;
                    case EConstraintsY.center:
                        const middle = this.average(parentAbsEdges.top, parentAbsEdges.bottom);
                        absEdges.top = middle - allFixedSize / 2 + this.fixedOffsetY;
                        absEdges.bottom = absEdges.top + allFixedSize;
                        break;
                }
            }
        }
        this.absEdges = absEdges;
        this.absEdges.left += this.snapMargin;
        this.absEdges.right -= this.snapMargin;
        this.absEdges.top += this.snapMargin;
        this.absEdges.bottom -= this.snapMargin;
    }
    isFirst() {
        const indexInParent = this.parent.children.indexOf(this);
        if (indexInParent == 0) {
            return true;
        }
        return false;
    }
    isLast() {
        const indexInParent = this.parent.children.indexOf(this);
        if (this.parent.children[indexInParent + 1] == undefined) {
            return true;
        }
        return false;
    }
    getPrevious() {
        const indexInParent = this.parent.children.indexOf(this);
        const newRect = this.parent.children[indexInParent - 1];
        if (!(newRect instanceof Rect)) {
            console.error("box has shape as child, not supported");
        }
        return newRect;
    }
    average(var1, var2) {
        return (var1 + var2) / 2;
    }
    snapToEdge(key) {
        return this.parent.absEdges[key] + this.snapOffset[key];
    }
    moveByFixed(start) {
    }
    resizeRect(parent) {
        if (parent.rectType == ERectType.Normal) {
            const parentSize = parent.absEdges;
            if (this.constraintX == EConstraintsX.left) {
                this.absEdges.left = parentSize.left + this.snapOffset.left + this.fixedOffsetX;
                this.absEdges.right = this.absEdges.left + this.fixedSizeW;
            }
            else if (this.constraintX == EConstraintsX.right) {
                this.absEdges.right = parentSize.right - this.snapOffset.right + this.fixedOffsetX + this.fixedOffsetX;
                this.absEdges.left = this.absEdges.right - this.fixedSizeW;
            }
            else if (this.constraintX == EConstraintsX.center) {
                this.absEdges.left = parentSize.left + (parentSize.right - parentSize.left) / 2 - this.fixedSizeW / 2 + this.fixedOffsetX;
                this.absEdges.right = parentSize.left + (parentSize.right - parentSize.left) / 2 + this.fixedSizeW / 2 + this.fixedOffsetX;
            }
            else if (this.constraintX == EConstraintsX.scale) {
                this.absEdges.left = parentSize.left + this.snapOffset.left;
                this.absEdges.right = parentSize.right - this.snapOffset.right;
            }
            if (this.constraintY == EConstraintsY.top) {
                this.absEdges.top = parentSize.top + this.snapOffset.top + this.fixedOffsetY;
                this.absEdges.bottom = this.absEdges.top + this.fixedSizeH;
            }
            else if (this.constraintY == EConstraintsY.bottom) {
                this.absEdges.bottom = parentSize.bottom - this.snapOffset.bottom + this.fixedOffsetY;
                this.absEdges.top = this.absEdges.bottom - this.fixedSizeH;
            }
            else if (this.constraintY == EConstraintsY.center) {
                this.absEdges.top = parentSize.top + (parentSize.bottom - parentSize.top) / 2 - this.fixedSizeH / 2 + this.fixedOffsetY;
                this.absEdges.bottom = parentSize.top + (parentSize.bottom - parentSize.top) / 2 + this.fixedSizeH / 2 + this.fixedOffsetY;
            }
            else if (this.constraintY == EConstraintsY.scale) {
                this.absEdges.top = parentSize.top + this.snapOffset.top;
                this.absEdges.bottom = parentSize.bottom - this.snapOffset.bottom;
            }
            if (this.absEdges.left < parent.absEdges.left) {
                this.clearAmount.left = parent.absEdges.left - this.absEdges.left;
            }
            else {
                this.clearAmount.left = 0;
            }
            if (this.absEdges.right > parent.absEdges.right) {
                this.clearAmount.right = this.absEdges.right - parent.absEdges.right;
            }
            else {
                this.clearAmount.right = 0;
            }
            if (this.absEdges.top < parent.absEdges.top) {
                this.clearAmount.top = parent.absEdges.top - this.absEdges.top;
            }
            else {
                this.clearAmount.top = 0;
            }
            if (this.absEdges.bottom > parent.absEdges.bottom) {
                this.clearAmount.bottom = this.absEdges.bottom - parent.absEdges.bottom;
            }
            else {
                this.clearAmount.bottom = 0;
            }
        }
        else if (parent.rectType == ERectType.HzBox) {
            const indexInParent = parent.children.indexOf(this);
            //console.log(indexInParent)
            this.absEdges.top = parent.absEdges.top;
            this.absEdges.bottom = parent.absEdges.bottom;
            if (parent.children[indexInParent - 1]) //is not first element
             {
                this.absEdges.left = parent.children[indexInParent - 1].absEdges.right;
            }
            else //is first element
             {
                this.absEdges.left = parent.absEdges.left;
            }
            if (this.constraintX == EConstraintsX.scale && parent.children[indexInParent + 1] == null) {
                this.absEdges.right = parent.absEdges.right;
            }
            else if (this.constraintX == EConstraintsX.scale) {
                this.absEdges.right = this.absEdges.left + (parent.getAbsSize().w) * this.boxProportion.x / 100;
            }
            else {
                this.absEdges.right = this.absEdges.left + this.fixedSizeW;
            }
        }
        else if (parent.rectType == ERectType.VtBox) {
            const indexInParent = parent.children.indexOf(this);
            //console.log(indexInParent)
            this.absEdges.left = parent.absEdges.left;
            this.absEdges.right = parent.absEdges.right;
            if (parent.children[indexInParent - 1]) //is not first element
             {
                this.absEdges.top = parent.children[indexInParent - 1].absEdges.bottom;
            }
            else //is first element
             {
                this.absEdges.top = parent.absEdges.top;
            }
            if (this.constraintY == EConstraintsY.scale && parent.children[indexInParent + 1] == null) {
                this.absEdges.bottom = parent.absEdges.bottom;
            }
            else if (this.constraintY == EConstraintsY.scale) {
                this.absEdges.bottom = this.absEdges.top + (parent.getAbsSize().h) * this.boxProportion.y / 100;
            }
            else {
                this.absEdges.bottom = this.absEdges.top + this.fixedSizeH;
            }
        }
        this.absEdges.left += this.snapMargin;
        this.absEdges.right -= this.snapMargin;
        this.absEdges.top += this.snapMargin;
        this.absEdges.bottom -= this.snapMargin;
    }
    drawRect() {
        if (this.isVisible == true) {
            const transform = this.edgesToDrawdimensions(this.absEdges);
            if (this.image != null) {
                if (this.image) {
                    this.canvas.ctx.drawImage(this.image, Math.floor(transform.pos.x), Math.floor(transform.pos.y), Math.floor(transform.size.w), Math.floor(transform.size.h));
                }
                else {
                    console.error("image not valid");
                }
            }
            else {
                this.canvas.ctx.beginPath();
                this.canvas.ctx.rect(Math.floor(transform.pos.x), Math.floor(transform.pos.y), Math.floor(transform.size.w), Math.floor(transform.size.h));
                this.canvas.ctx.fillStyle = this.color;
                this.canvas.ctx.fill();
            }
        }
        if (this.hasStroke) {
            const transform = this.edgesToDrawdimensions(this.absEdges);
            this.canvas.ctx.strokeStyle = this.strokeColor;
            this.canvas.ctx.lineWidth = this.strokeSize;
            this.canvas.ctx.strokeRect(Math.floor(transform.pos.x), Math.floor(transform.pos.y), Math.floor(transform.size.w), Math.floor(transform.size.h));
        }
    }
    edgesToDrawdimensions(edges) {
        //convert absolute edges to position and size
        let res = { pos: { x: 0, y: 0 }, size: { w: 0, h: 0 } };
        res.pos.x = edges.left;
        res.pos.y = edges.top;
        res.size.w = edges.right - edges.left;
        res.size.h = edges.bottom - edges.top;
        return res;
    }
    getAbsSize() {
        return { w: this.absEdges.right - this.absEdges.left, h: this.absEdges.bottom - this.absEdges.top };
    }
}
export class recti extends Rect {
}
