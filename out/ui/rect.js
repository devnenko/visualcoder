import { Shape } from "./shape.js";
import { TransformConversions } from "../util/transform.js";
import { boundingRect } from "./bounding_rect.js";
import { uni } from "../util/uniform.js";
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
export var BoxType;
(function (BoxType) {
    BoxType["hz"] = "hz";
    BoxType["vt"] = "vt";
})(BoxType || (BoxType = {}));
export class Rect extends Shape {
    constructor(parent) {
        super();
        this.parent = boundingRect;
        this.constraintX = EConstraintsX.left;
        this.constraintY = EConstraintsY.top;
        this.fixedOffsetX = 0;
        this.fixedOffsetY = 0;
        this.fixedSizeW = 100;
        this.fixedSizeH = 100;
        this.snapMargin = 0;
        this.boxProportion = 100;
        this.color = "orange";
        this.placeHolder = false;
        this.hasStroke = false;
        this.strokeColor = "pink";
        this.strokeSize = 10;
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
        this.boxType = BoxType.hz;
        if (parent) {
            this.sParent(parent);
        }
    }
    applyOffsetSnap() {
        this.sSnapMargin(uni.defSnapMargin);
        if (this.parent.boxType == BoxType.hz) {
            this.sFixedOffsetX(uni.defEdgeDist);
        }
        else {
            this.sFixedOffsetY(uni.defEdgeDist);
        }
        return this;
    }
    sHasStroke(val) {
        this.hasStroke = val;
        return this;
    }
    sStrokeColor(val) {
        this.strokeColor = val;
        return this;
    }
    sStrokeSize(val) {
        this.strokeSize = val;
        return this;
    }
    gParent() {
        return super.gParent();
    }
    sFillSpace() {
        this.constraintX = EConstraintsX.scale;
        this.constraintY = EConstraintsY.scale;
        return this;
    }
    sCenter() {
        this.constraintX = EConstraintsX.center;
        this.constraintY = EConstraintsY.center;
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
    sConsts(constX, constY) {
        this.constraintX = constX;
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
    sFixedOffset(offset) {
        this.fixedOffsetY = offset;
        this.fixedOffsetX = offset;
        return this;
    }
    gFixedOffset() {
        return { x: this.fixedOffsetX, y: this.fixedOffsetY };
    }
    sFixedSize(size) {
        this.fixedSizeW = size;
        this.fixedSizeH = size;
        return this;
    }
    sFixedSizeW(sizeW) {
        this.fixedSizeW = sizeW;
        return this;
    }
    setFixedSizeH(sizeH) {
        this.fixedSizeH = sizeH;
        return this;
    }
    gFixedSize() {
        return { w: this.fixedSizeW, h: this.fixedSizeH };
    }
    sSnapMargin(margin) {
        this.snapMargin = margin;
        return this;
    }
    gSnapMargin() {
        return this.snapMargin;
    }
    sColor(color) {
        this.color = color;
        return this;
    }
    gColor() {
        return this.color;
    }
    sBoxProp(prop) {
        this.boxProportion = prop;
        return this;
    }
    gBoxProp() {
        return this.boxProportion;
    }
    sAbsEdges(absEdges) {
        this.absEdges = absEdges;
        return this;
    }
    gAbsEdges() {
        return this.absEdges;
    }
    gAbsTransform() {
        boundingRect.draw();
        TransformConversions.edgesToPosAndSize(this.gAbsEdges());
    }
    resizeSelf() {
        if (typeof this.gParent().resizeWithBox === "function") {
            this.gParent().resizeWithBox(this);
        }
        else {
            let absEdges = this.absEdges;
            const parentAbsEdges = this.parent.gAbsEdges();
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
        this.applySnapMargin();
    }
    applySnapMargin() {
        this.absEdges.left += this.snapMargin;
        this.absEdges.right -= this.snapMargin;
        this.absEdges.top += this.snapMargin;
        this.absEdges.bottom -= this.snapMargin;
    }
    draw() {
        const posAndSize = TransformConversions.edgesToPosAndSize(this.absEdges);
        const ctx = this.gCanvas().ctx;
        if (this.gIsVisible()) {
            ctx.beginPath();
            ctx.rect(Math.floor(posAndSize.pos.x), Math.floor(posAndSize.pos.y), Math.ceil(posAndSize.size.w), Math.ceil(posAndSize.size.h));
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        if (this.hasStroke == true) {
            ctx.beginPath();
            ctx.rect(Math.floor(posAndSize.pos.x) + this.strokeSize / 2, Math.floor(posAndSize.pos.y) + this.strokeSize / 2, Math.ceil(posAndSize.size.w) - this.strokeSize, Math.ceil(posAndSize.size.h) - this.strokeSize);
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeSize;
            ctx.stroke();
        }
    }
}
