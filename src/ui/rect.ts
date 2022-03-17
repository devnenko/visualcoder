

import { IShapeConfig, Shape } from "./shape.js";
import { IEdges, TransformConversions } from "../util/transform.js";
import { BoundingRect, boundingRect } from "./bounding_rect.js";

export enum EConstraintsX {
    left = "left",
    right = "right",
    center = "center",
    scale = "scale"
}

export enum EConstraintsY {
    top = "top",
    bottom = "bottom",
    center = "center",
    scale = "scale"
}

export interface IRectConfig extends IShapeConfig {
    constraintX?: EConstraintsX,
    constraintY?: EConstraintsY,
    snapMargin?: number,
    fixedOffsetX?: number,
    fixedOffsetY?: number,
    fixedSizeW?: number,
    fixedSizeH?: number,
    isVisible?: boolean,
    color?: string,
    boxProportionX?: number,
    boxProportionY?: number,
    imageSrc?: string,
    hasStroke?: boolean,
    strokeSize?: number,
    strokeColor?: string,
    boxChildrenDirectionX?: EConstraintsX,
    boxChildrenDirectionY?: EConstraintsY,
    resizeBoxToContent?: boolean,
    boxProportion?: number;
    fillSpace?: boolean,
    fixedSize?: number,
    topLeftSpace?: boolean;
}

export class Rect<Config extends IRectConfig = IRectConfig> extends Shape<Config>{

    public parent: Rect | BoundingRect = boundingRect;

    public constraintX = EConstraintsX.left;
    public constraintY = EConstraintsY.top;
    public fixedOffsetX = 0
    public fixedOffsetY = 0;
    public fixedSizeW = 100;
    public fixedSizeH = 100;
    protected snapMargin = 0;
    protected color = "orange";
    boxProportion = 100;
    public isVisible = true;
    private fillSpace = false;
    private fixedSpace = false;
    private topLeftSize = 0;
    topLeftSpace = false;

    public absEdges: IEdges = { left: 0, right: 0, top: 0, bottom: 0 };

    constructor() {
        super()
    }

    protected setAttr(key: any, value: any) {
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

    public addConfig(config: Config) {
        super.addConfig(config)
    }

    public resize(): void {
        this.resizeSelf();
        super.resize();
    }

    public resizeSelf() {
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

    public draw() {
        if (this.isVisible) {
            const posAndSize = TransformConversions.edgesToPosAndSize(this.absEdges);

            this.canvas.ctx.beginPath();
            this.canvas.ctx.rect(Math.floor(posAndSize.pos.x), Math.floor(posAndSize.pos.y), Math.floor(posAndSize.size.w), Math.floor(posAndSize.size.h));
            this.canvas.ctx.fillStyle = this.color;
            this.canvas.ctx.fill();
        }
    }
}
