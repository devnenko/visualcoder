import { Shape } from "./shape.js";
import { TransformConversions } from "../util/transform.js";
import { boundingRect } from "./bounding_rect.js";
export var EConstraintsX;
(function (EConstraintsX) {
    EConstraintsX["left"] = "left";
    EConstraintsX["right"] = "right";
    EConstraintsX["center"] = "center";
    EConstraintsX["scale"] = "scale";
})(EConstraintsX || (EConstraintsX = {}));
export var EConstraintsY;
(function (EConstraintsY) {
    EConstraintsY["top"] = "top";
    EConstraintsY["bottom"] = "bottom";
    EConstraintsY["center"] = "center";
    EConstraintsY["scale"] = "scale";
})(EConstraintsY || (EConstraintsY = {}));
export class Rect extends Shape {
    constructor() {
        super();
        this.parent = boundingRect;
        this.constraintX = EConstraintsX.left;
        this.constraintY = EConstraintsY.top;
        this.fixedOffsetX = 0;
        this.fixedOffsetY = 0;
        this.fixedSizeW = 100;
        this.fixedSizeH = 100;
        this._snapMargin = 0;
        this._color = "orange";
        this.boxProportion = 100;
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
    }
    sFillSpace() {
        this.constraintX = EConstraintsX.scale;
        this.constraintY = EConstraintsY.scale;
        return this;
    }
    sConstX(constX) {
        this.constraintX = constX;
        return this;
    }
    sConstY(constY) {
        this.constraintY = constY;
        return this;
    }
    gConsts() {
        return { x: this.constraintX, y: this.constraintY };
    }
    sFixedOffsetX(offsetX) {
        this.fixedOffsetX = offsetX;
        return this;
    }
    sFixedOffsetY(offsetY) {
        this.fixedOffsetY = offsetY;
        return this;
    }
    sFixedSize(size) {
        this.fixedSizeW = size;
        this.fixedSizeH = size;
        return this;
    }
    get fixedSize() {
        return { w: this.fixedSizeW, h: this.fixedSizeH };
    }
    sFixedSizeW(sizeW) {
        this.fixedSizeW = sizeW;
        return this;
    }
    setFixedSizeH(sizeH) {
        this.fixedSizeH = sizeH;
        return this;
    }
    sSnapMargin(margin) {
        this._snapMargin = margin;
        return this;
    }
    get snapMargin() {
        return this._snapMargin;
    }
    sColor(color) {
        this._color = color;
        return this;
    }
    get color() {
        return this._color;
    }
    sBoxProp(prop) {
        this.boxProportion = prop;
        return this;
    }
    get boxProp() {
        return this.boxProportion;
    }
    resizeSelf() {
        if (typeof this.parent.resizeWithBox === "function") {
            this.parent.resizeWithBox(this);
        }
        else {
            let absEdges = this.absEdges;
            const parentAbsEdges = this.parent.absEdges;
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
                    const middle = TransformConversions.average(parentAbsEdges.left, parentAbsEdges.right);
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
                    const middle = TransformConversions.average(parentAbsEdges.top, parentAbsEdges.bottom);
                    absEdges.top = middle - this.fixedSizeH / 2 + this.fixedOffsetY;
                    absEdges.bottom = absEdges.top + this.fixedSizeH;
                    break;
                case EConstraintsY.scale:
                    absEdges.top = parentAbsEdges.top;
                    absEdges.bottom = parentAbsEdges.bottom;
                    break;
            }
        }
    }
    applySnapMargin() {
        this.absEdges.left += this._snapMargin;
        this.absEdges.right -= this._snapMargin;
        this.absEdges.top += this._snapMargin;
        this.absEdges.bottom -= this._snapMargin;
    }
    draw() {
        this.applySnapMargin();
        if (this.isVisible) {
            const posAndSize = TransformConversions.edgesToPosAndSize(this.absEdges);
            const ctx = this.getCanvas().ctx;
            ctx.beginPath();
            ctx.rect(Math.floor(posAndSize.pos.x), Math.floor(posAndSize.pos.y), Math.ceil(posAndSize.size.w), Math.ceil(posAndSize.size.h));
            ctx.fillStyle = this._color;
            ctx.fill();
        }
    }
}
