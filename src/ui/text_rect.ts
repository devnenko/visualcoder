

import { EConstraintsX, EConstraintsY, Rect } from "./rect.js";
import { TransformConversions } from "../util/transform.js";





export class TextRect extends Rect{
    //use texture atlas in future

    private text: string = "Empty Text"
    private size: number = 20;


    constructor() {
        super()
        this.sColor("white")
    }

    setTextSize(size:number){
        this.size=size;
        return this;
    }

    setText(text:string){
        this.text=text;
        return this;
    }


    resizeSelf() {
        if (this.gConsts().x == EConstraintsX.scale || this.gConsts().y == EConstraintsY.scale) {
            console.error("cannot scale text")
        }
        this.sSnapMargin(0);
        this.canvas.ctx.font = this.size + "px Sans-Serif";
        const measure = this.canvas.ctx.measureText(this.text);
        this.sFixedSizeW(measure.width);
        this.setFixedSizeH(measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent);
        super.resizeSelf();
    }

    draw() {
        if (this.isVisible) {
            const posAndSize = TransformConversions.edgesToPosAndSize(this.absEdges);

            this.canvas.ctx.textAlign = "left";
            this.canvas.ctx.textBaseline = "top"
            this.canvas.ctx.fillStyle = this.color;
            this.canvas.ctx.font = this.size + "px Sans-Serif";
            this.canvas.ctx.fillText(this.text, posAndSize.pos.x, posAndSize.pos.y);
        }
    }

}