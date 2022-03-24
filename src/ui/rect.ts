


import { Shape } from "./shape.js";
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

export class Rect extends Shape{

    protected parent: Rect | BoundingRect = boundingRect;

    private constraintX = EConstraintsX.left;
    private constraintY = EConstraintsY.top;
    private fixedOffsetX = 0
    private fixedOffsetY = 0;
    private fixedSizeW = 100;
    private fixedSizeH = 100;
    private _snapMargin = 0;
    private _color = "orange";
    private boxProportion = 100;

    public absEdges: IEdges = { left: 0, right: 0, top: 0, bottom: 0 };

    constructor() {
        super()
    }

    sFillSpace(){
        this.constraintX=EConstraintsX.scale;
        this.constraintY=EConstraintsY.scale;
        return this;
    }

    sConstX(constX:EConstraintsX){
        this.constraintX=constX;
        return this;
    }

    sConstY(constY:EConstraintsY){
        this.constraintY=constY;
        return this;
    }



    gConsts(){
        return {x:this.constraintX,y:this.constraintY}
    }

    sFixedOffsetX(offsetX:number){
        this.fixedOffsetX=offsetX;
        return this;
    }

    sFixedOffsetY(offsetY:number){
        this.fixedOffsetY=offsetY;
        return this;
    }

    sFixedSize(size:number){
        this.fixedSizeW=size;
        this.fixedSizeH=size;
        return this;
    }

    get fixedSize(){
        return {w:this.fixedSizeW,h:this.fixedSizeH}
    }

    sFixedSizeW(sizeW:number){
        this.fixedSizeW=sizeW;
        return this;
    }

    setFixedSizeH(sizeH:number){
        this.fixedSizeH=sizeH;
        return this;
    }

    sSnapMargin(margin:number){
        this._snapMargin=margin;
        return this;
    }

    get snapMargin(){
        return this._snapMargin
    }

    sColor(color:string){
        this._color=color;
        return this;
    }

    get color(){
        return this._color;
    }

    sBoxProp(prop:number){
        this.boxProportion=prop;
        return this;
    }

    get boxProp() {
        return this.boxProportion;
    }

    resizeSelf() {
        if (typeof this.parent.resizeWithBox==="function") {
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

    protected applySnapMargin() {
        this.absEdges.left += this._snapMargin;
        this.absEdges.right -= this._snapMargin;
        this.absEdges.top += this._snapMargin;
        this.absEdges.bottom -= this._snapMargin;
    }

    draw() {
        this.applySnapMargin();
        if (this.isVisible) {
            const posAndSize = TransformConversions.edgesToPosAndSize(this.absEdges);
            const ctx=this.getCanvas().ctx;

            ctx.beginPath();
            ctx.rect(Math.floor(posAndSize.pos.x), Math.floor(posAndSize.pos.y), Math.ceil(posAndSize.size.w), Math.ceil(posAndSize.size.h));
            ctx.fillStyle = this._color;
            ctx.fill();
        }
    }
}
