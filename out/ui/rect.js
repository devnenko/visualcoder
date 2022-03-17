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
        this.snapMargin = 0;
        this.color = "orange";
        this.boxProportion = 100;
        this.isVisible = true;
        this.fillSpace = false;
        this.fixedSpace = false;
        this.topLeftSize = 0;
        this.topLeftSpace = false;
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
    }
    setAttr(key, value) {
        if (key === "fillSpace") {
            this.constraintX = EConstraintsX.scale;
            this.constraintY = EConstraintsY.scale;
        }
        else if (key === "topLeftSpace") {
            this.constraintX = EConstraintsX.left;
            this.constraintY = EConstraintsY.top;
        }
        else if (key === "fixedSize") {
            this.fixedSizeW = value;
            this.fixedSizeH = value;
        }
        super.setAttr(key, value);
    }
    addConfig(config) {
        super.addConfig(config);
    }
    resize() {
        this.resizeSelf();
        super.resize();
    }
    resizeSelf() {
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
        this.applySnapMargin();
    }
    applySnapMargin() {
        this.absEdges.left += this.snapMargin;
        this.absEdges.right -= this.snapMargin;
        this.absEdges.top += this.snapMargin;
        this.absEdges.bottom -= this.snapMargin;
    }
    draw() {
        if (this.isVisible) {
            const posAndSize = TransformConversions.edgesToPosAndSize(this.absEdges);
            this.canvas.ctx.beginPath();
            this.canvas.ctx.rect(Math.floor(posAndSize.pos.x), Math.floor(posAndSize.pos.y), Math.floor(posAndSize.size.w), Math.floor(posAndSize.size.h));
            this.canvas.ctx.fillStyle = this.color;
            this.canvas.ctx.fill();
        }
    }
}
