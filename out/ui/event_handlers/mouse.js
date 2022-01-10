import { BoundingRect } from "../bounding_rect.js";
import { EMouseType } from "../types/mouse.js";
export class MouseHandler {
    static init() {
        //window.addEventListener('click', this.mouseClick.bind(this));
        window.addEventListener('touchstart', MouseHandler.touchDown.bind(this));
        window.addEventListener('touchmove', MouseHandler.touchMove.bind(this));
        window.addEventListener('touchend', MouseHandler.touchUp.bind(this));
        window.addEventListener('mousedown', MouseHandler.mouseDown.bind(this));
        window.addEventListener('mousemove', MouseHandler.mouseMove.bind(this));
        window.addEventListener('mouseup', MouseHandler.mouseUp.bind(this));
    }
    static touchDown(e) {
        this.currentPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        this.isMouseDown = true;
        var obj = BoundingRect.checkOverlapp(this.currentPos);
        //console.log(obj);
        if (obj[0]) {
            this.activeRect?.onMouseHoverEnd(EMouseType.left);
            obj[0].onMouseDown(EMouseType.left);
            this.activeRect = obj[0]; //make this better later
        }
    }
    static touchMove(e) {
        this.currentPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        var obj = BoundingRect.checkOverlapp(this.currentPos);
        if (this.activeRect != null && this.isMouseDown == true) {
            this.activeRect.onMouseMoveDown(EMouseType.left);
        }
        else if (this.isMouseDown == false) {
            if (this.activeRect != obj[0]) {
                this.activeRect?.onMouseHoverEnd(EMouseType.left);
                this.activeRect = obj[0];
                this.activeRect?.onMouseHoverBegin(EMouseType.left);
            }
            else {
            }
            //hover logic
        }
        //console.log(obj);
    }
    static touchUp(e) {
        this.currentPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        this.isMouseDown = false;
        if (this.activeRect != null) {
            this.activeRect.onMouseUp(EMouseType.left);
            this.activeRect = null;
        }
        //console.log(obj);
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
