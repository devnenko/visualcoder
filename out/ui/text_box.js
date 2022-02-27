import { boundingShape, EObjectType, BoundingShape } from "./ui.js";
import { EConstraintsX, EConstraintsY } from "./types/types.js";
import { Rect } from "./ui.js";
export class TextBox extends Rect {
    constructor() {
        super();
        //use texture atlas in future
        this.text = "Empty Text";
        this.size = 20;
        this.useWOrH = false;
        this.color = "white";
    }
    setText(text) {
        this.text = text;
        boundingShape.draw();
    }
    createConfig(opts) {
        this.addConfig(opts);
    }
    draw(parent) {
        if (parent instanceof Rect || parent instanceof BoundingShape) {
            this.resizeRect(parent);
            this.drawRect();
            for (const child of this.children) {
                child.draw(this);
            }
        }
        else {
            console.warn("a rect is a child of a shape and doesnt know what to do");
            for (const child of this.children) {
                child.draw(this);
            }
        }
    }
    resizeRect(parent) {
        this.canvas.ctx.font = this.size + "px Sans-Serif";
        const measure = this.canvas.ctx.measureText(this.text);
        this.fixedSizeW = measure.width;
        this.fixedSizeH = measure.fontBoundingBoxAscent + measure.fontBoundingBoxDescent;
        //console.log(textBounds)
        if (parent.rectType == EObjectType.Normal) {
            const parentSize = parent.absEdges;
            if (this.constraintX == EConstraintsX.left) {
                this.absEdges.left = parentSize.left + this.snapOffset.left + this.fixedOffsetX;
                this.absEdges.right = this.absEdges.left + this.fixedSizeW;
            }
            else if (this.constraintX == EConstraintsX.right) {
                this.absEdges.right = parentSize.right - this.snapOffset.right + this.fixedOffsetX + this.fixedOffsetX;
                this.absEdges.left = this.absEdges.right - this.fixedSizeW;
            }
            else if (this.constraintX == EConstraintsX.center) {
                this.absEdges.left = parentSize.left + (parentSize.right - parentSize.left) / 2 - this.fixedSizeW / 2 + this.fixedOffsetX;
                this.absEdges.right = parentSize.left + (parentSize.right - parentSize.left) / 2 + this.fixedSizeW / 2 + this.fixedOffsetX;
            }
            else if (this.constraintX == EConstraintsX.scale) {
                console.error("cannot scale text component");
            }
            if (this.constraintY == EConstraintsY.top) {
                this.absEdges.top = parentSize.top + this.snapOffset.top + this.fixedOffsetY;
                this.absEdges.bottom = this.absEdges.top + this.fixedSizeH;
            }
            else if (this.constraintY == EConstraintsY.bottom) {
                this.absEdges.bottom = parentSize.bottom - this.snapOffset.bottom + this.fixedOffsetY;
                this.absEdges.top = this.absEdges.bottom - this.fixedSizeH;
            }
            else if (this.constraintY == EConstraintsY.center) {
                this.absEdges.top = parentSize.top + (parentSize.bottom - parentSize.top) / 2 - this.fixedSizeH / 2 + this.fixedOffsetY;
                this.absEdges.bottom = parentSize.top + (parentSize.bottom - parentSize.top) / 2 + this.fixedSizeH / 2 + this.fixedOffsetY;
            }
            else if (this.constraintY == EConstraintsY.scale) {
                console.error("cannot scale text component");
            }
        }
    }
    drawRect() {
        if (this.isVisible == true) {
            const transform = this.edgesToDrawdimensions(this.absEdges);
            this.canvas.ctx.textAlign = "start";
            this.canvas.ctx.fillStyle = this.color;
            this.canvas.ctx.font = this.size + "px Sans-Serif";
            this.canvas.ctx.fillText(this.text, transform.pos.x + this.fixedOffsetX, transform.pos.y + this.size + this.fixedOffsetY);
        }
    }
}
