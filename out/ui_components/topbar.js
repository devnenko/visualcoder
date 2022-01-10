import { Button } from "../ui/button.js";
import { Canvas } from "../ui/canvas.js";
import { Rect } from "../ui/rect.js";
import { ResizeType } from "../ui/shape.js";
export class Topbar extends Rect {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.color = "blue";
        this.fixedSize.h = 100;
        this.constraints.bottom = ResizeType.fixed;
        const button = new Button(this, this.canvas);
        button.onMouseDown = () => {
            button.color = "red";
            Canvas.boundingRect.update();
        };
        button.onMouseMoveDown = () => {
        };
        button.onMouseUp = () => {
            button.color = "pink";
            Canvas.boundingRect.update();
        };
        button.constraints.right = ResizeType.fixed;
        button.fixedSize.w = 100;
    }
}
