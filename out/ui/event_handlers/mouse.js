import { BoundingRect } from "../bounding_rect.js";
export class MouseHandler {
    static init() {
        //window.addEventListener('click', this.mouseClick.bind(this));
        window.addEventListener('mousedown', MouseHandler.mouseDown.bind(this));
        window.addEventListener('mousemove', MouseHandler.mouseMove.bind(this));
        window.addEventListener('mouseup', MouseHandler.mouseUp.bind(this));
    }
    static mouseDown(e) {
        this.currentPos = { x: e.x, y: e.y };
        this.isMouseDown = true;
        var obj = BoundingRect.checkOverlapp(this.currentPos);
        //console.log(obj);
        if (obj[0]) {
            this.activeRect?.onMouseHoverEnd(e.button);
            obj[0].onMouseDown(e.button);
            this.activeRect = obj[0]; //make this better later
        }
    }
    static mouseMove(e) {
        this.currentPos = { x: e.x, y: e.y };
        var obj = BoundingRect.checkOverlapp(this.currentPos);
        if (this.activeRect != null && this.isMouseDown == true) {
            this.activeRect.onMouseMoveDown(e.button);
        }
        else if (this.isMouseDown == false) {
            if (this.activeRect != obj[0]) {
                this.activeRect?.onMouseHoverEnd(e.button);
                this.activeRect = obj[0];
                this.activeRect?.onMouseHoverBegin(e.button);
            }
            else {
            }
            //hover logic
        }
        //console.log(obj);
    }
    static mouseUp(e) {
        this.currentPos = { x: e.x, y: e.y };
        this.isMouseDown = false;
        if (this.activeRect != null) {
            this.activeRect.onMouseUp(e.button);
            this.activeRect = null;
        }
        //console.log(obj);
    }
    static getMousePos() {
        return this.currentPos;
    }
    static getRelativeMousePos(rect) {
        return { x: this.currentPos.x - rect.absEdges.left, y: this.currentPos.y - rect.absEdges.top };
    }
    static posOnRects(rect) {
        return { x: this.currentPos.x - rect.absEdges.left, y: this.currentPos.y - rect.absEdges.top };
    }
}
MouseHandler.canvases = [];
MouseHandler.currentPos = { x: 0, y: 0 };
MouseHandler.activeRect = null;
MouseHandler.isMouseDown = false;
