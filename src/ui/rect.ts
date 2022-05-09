


import { Shape } from "./shape.js";
import { IEdges, TransformConversions } from "../util/transform.js";
import { BoundingRect, boundingRect } from "./bounding_rect.js";
import { Box} from "./box.js";
import { uniform } from "../util/uniform.js";

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

export enum BoxType {
    hz = "hz",
    vt = "vt"
}

export class Rect extends Shape {

    protected parent: Rect | BoundingRect = boundingRect;

    private constraintX = EConstraintsX.left;
    private constraintY = EConstraintsY.top;
    private fixedOffsetX = 0
    private fixedOffsetY = 0;
    private fixedSizeW = 100;
    private fixedSizeH = 100;
    private snapMargin = 0;
    private boxProportion = 100;
    protected color = "orange";
    public placeHolder = false;
    public hasStroke = false;
    public strokeColor = "pink";
    public strokeSize = 10;
    public boxType;

    private absEdges: IEdges = { left: 0, right: 0, top: 0, bottom: 0 };

    constructor() {
        super()
        this.boxType=BoxType.hz;
    }

    applyOffsetSnap(){
        this.sSnapMargin(uniform.defSnapMargin);

        if((this.parent as Rect).boxType==BoxType.hz){
            this.sFixedOffsetX(uniform.defEdgeDist);
        }else{
            this.sFixedOffsetY(uniform.defEdgeDist);
        }
        return this;
    }

    sHasStroke(val: boolean) {
        this.hasStroke = val
        return this;
    }

    sStrokeColor(val: string) {
        this.strokeColor=val
        return this;
    }

    sStrokeSize(val: number) {
        this.strokeSize=val
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

    sConstX(constX: EConstraintsX) {
        this.constraintX = constX;
        return this;
    }

    sConstY(constY: EConstraintsY) {
        this.constraintY = constY;
        return this;
    }

    sConsts(constX: EConstraintsX, constY: EConstraintsY) {
        this.constraintX = constX;
        this.constraintY = constY;
        return this;
    }



    gConsts() {
        return { x: this.constraintX, y: this.constraintY }
    }

    sFixedOffsetX(offsetX: number) {
        this.fixedOffsetX = offsetX;
        return this;
    }

    sFixedOffsetY(offsetY: number) {
        this.fixedOffsetY = offsetY;
        return this;
    }

    sFixedOffset(offset: number) {
        this.fixedOffsetY = offset;
        this.fixedOffsetX = offset;
        return this;
    }

    gFixedOffset() {
        return {x:this.fixedOffsetX,y:this.fixedOffsetY};
    }

    sFixedSize(size: number) {
        this.fixedSizeW = size;
        this.fixedSizeH = size;
        return this;
    }

    sFixedSizeW(sizeW: number) {
        this.fixedSizeW = sizeW;
        return this;
    }

    setFixedSizeH(sizeH: number) {
        this.fixedSizeH = sizeH;
        return this;
    }

    gFixedSize() {
        return { w: this.fixedSizeW, h: this.fixedSizeH }
    }

    sSnapMargin(margin: number) {
        this.snapMargin = margin;
        return this;
    }

    gSnapMargin() {
        return this.snapMargin;
    }

    sColor(color: string) {
        this.color = color;
        return this;
    }

    gColor() {
        return this.color;
    }

    sBoxProp(prop: number) {
        this.boxProportion = prop;
        return this;
    }

    gBoxProp() {
        return this.boxProportion;
    }

    sAbsEdges(absEdges: IEdges) {
        this.absEdges = absEdges;
        return this;
    }

    gAbsEdges() {
        return this.absEdges;
    }

    gAbsTransform(){
        boundingRect.draw();
        TransformConversions.edgesToPosAndSize(this.gAbsEdges());
    }

    resizeSelf() {
        if (typeof (this.gParent() as Box).resizeWithBox === "function") {
            (this.gParent() as Box).resizeWithBox(this);
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
            ctx.rect(Math.floor(posAndSize.pos.x)+this.strokeSize/2, Math.floor(posAndSize.pos.y)+this.strokeSize/2, Math.ceil(posAndSize.size.w)-this.strokeSize, Math.ceil(posAndSize.size.h)-this.strokeSize);
            ctx.strokeStyle = this.strokeColor;
            ctx.lineWidth = this.strokeSize;
            ctx.stroke();
        }
    }
}
