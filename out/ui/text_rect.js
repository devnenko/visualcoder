import { EConstraintsX, EConstraintsY, Rect } from "./rect.js";
import { TransformConversions } from "../util/transform.js";
import { colorCreator } from "../util/color.js";
export class TextRect extends Rect {
    constructor() {
        super();
        //use texture atlas in future
        this.text = "Empty Text";
        this.size = 24;
        this.sColor(colorCreator.textColor)
            .sConsts(EConstraintsX.center, EConstraintsY.center);
    }
    sTextSize(size) {
        this.size = size;
        return this;
    }
    sText(text) {
        this.text = text;
        return this;
    }
    gText() {
        return this.text;
    }
    resizeSelf() {
        if (this.gConsts().x == EConstraintsX.scale || this.gConsts().y == EConstraintsY.scale) {
            console.error("cannot scale text");
        }
        this.sSnapMargin(0);
        this.gCanvas().ctx.font = this.size + "px Sans-Serif";
        const measure = this.gCanvas().ctx.measureText(this.text);
        this.sFixedSizeW(measure.width);
        this.setFixedSizeH(measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent);
        super.resizeSelf();
    }
    draw() {
        if (this.gIsVisible()) {
            const posAndSize = TransformConversions.edgesToPosAndSize(this.gAbsEdges());
            const ctx = this.gCanvas().ctx;
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillStyle = this.color;
            ctx.font = this.size + "px Sans-Serif";
            ctx.fillText(this.text, posAndSize.pos.x, posAndSize.pos.y);
        }
    }
}
