import { Rect } from "./ui.js";
export class TextBox extends Rect {
    constructor(opts) {
        super({});
        this.children = [];
        this.text = "Empty Text";
        this.size = 20;
        this.addConfig(opts);
    }
    resizeRect(parent) {
        this.absEdges = parent.absEdges;
    }
    drawRect() {
        if (this.isVisible == true) {
            const transform = this.edgesToDrawdimensions(this.absEdges);
            this.canvas.ctx.textAlign = "start";
            this.canvas.ctx.fillStyle = this.color;
            this.canvas.ctx.font = this.size + "px Arial";
            this.canvas.ctx.fillText(this.text, transform.pos.x + this.fixedOffsetX, transform.pos.y + this.size + this.fixedOffsetY);
        }
    }
}
