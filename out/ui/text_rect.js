import { EConstraintsX, EConstraintsY, Rect } from "./rect.js";
import { TransformConversions } from "../util/transform.js";
export class TextRect extends Rect {
    constructor(config) {
        super();
        //use texture atlas in future
        this.text = "Empty Text";
        this.size = 20;
        this.setConfigAttrs({ color: "white" });
        this.setConfigAttrs(config);
    }
    addConfig(config) {
        super.addConfig(config);
    }
    resize() {
        if (this.constraintX == EConstraintsX.scale || this.constraintY == EConstraintsY.scale) {
            console.error("cannot scale text");
        }
        this.snapMargin = 0;
        this.canvas.ctx.font = this.size + "px Sans-Serif";
        const measure = this.canvas.ctx.measureText(this.text);
        this.fixedSizeW = measure.width;
        this.fixedSizeH = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;
        super.resize();
    }
    draw() {
        if (this.isVisible) {
            const posAndSize = TransformConversions.edgesToPosAndSize(this.absEdges);
            this.canvas.ctx.textAlign = "left";
            this.canvas.ctx.textBaseline = "top";
            this.canvas.ctx.fillStyle = this.getAttr("color");
            this.canvas.ctx.font = this.size + "px Sans-Serif";
            this.canvas.ctx.fillText(this.text, posAndSize.pos.x, posAndSize.pos.y);
        }
    }
}
