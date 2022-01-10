import { components } from "../main.js";
import { MouseState } from "../mouse_state.js";
import { Canvas } from "../ui/canvas.js";
import { Rect } from "../ui/rect.js";
import { ResizeType } from "../ui/shape.js";
class Block extends Rect {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.discriminator = 'I-AM-A';
        this.mouseOffset = { leftDist: 0, topDist: 0 };
        this.color = "gray";
        this.snapOffset.left = 200;
        this.snapOffset.top = 200;
        this.constraints.right = ResizeType.fixed;
        this.constraints.bottom = ResizeType.fixed;
        this.fixedSize.w = 200;
        this.fixedSize.h = 140;
    }
    onMouseDown() {
        this.mouseOffset = { leftDist: MouseState.getMousePos().x - this.absEdges.left, topDist: MouseState.getMousePos().y - this.absEdges.top };
        console.log(this.mouseOffset);
    }
    ;
    onMouseMoveDown() {
        this.snapOffset.left = MouseState.getRelativeMousePos(components.view).x - this.mouseOffset.leftDist;
        this.snapOffset.top = MouseState.getRelativeMousePos(components.view).y - this.mouseOffset.topDist;
        Canvas.boundingRect.update();
    }
    ;
    onMouseUp() {
    }
    ;
}
const block = new Block(components.view, components.view.canvas);
Canvas.boundingRect.update();
console.log(block);
