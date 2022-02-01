import { EMouseType } from "../types/mouse.js";
import { boundingShape } from "../shape.js";
//import { components } from "../../main.js";
export class MouseHandler {
    static init() {
        //window.addEventListener('click', this.mouseClick.bind(this));
        window.addEventListener('touchstart', MouseHandler.touchDown.bind(this), { passive: false });
        window.addEventListener('touchmove', MouseHandler.touchMove.bind(this), { passive: false });
        window.addEventListener('touchend', MouseHandler.touchUp.bind(this), { passive: false });
        window.addEventListener('mousedown', MouseHandler.mouseDown.bind(this));
        window.addEventListener('mousemove', MouseHandler.mouseMove.bind(this));
        window.addEventListener('mouseup', MouseHandler.mouseUp.bind(this));
    }
    static touchDown(e) {
        e.preventDefault();
        this.down(EMouseType.touch, { x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
    static mouseDown(e) {
        this.down(e.button, { x: e.x, y: e.y });
    }
    static touchMove(e) {
        e.preventDefault();
        this.move(EMouseType.touch, { x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
    static mouseMove(e) {
        this.move(e.button, { x: e.x, y: e.y });
    }
    static touchUp(e) {
        e.preventDefault();
        this.up(EMouseType.touch, this.currentPos);
    }
    static mouseUp(e) {
        this.up(e.button, { x: e.x, y: e.y });
    }
    static down(e, pos) {
        this.isMouseDown = true;
        var overlapping = boundingShape.overlappHierarchy(pos);
        if (overlapping[0]) {
            this.activeRect?.onMouseHoverEnd(e, pos);
            overlapping[0].onMouseDown(e, pos);
            this.activeRect = overlapping[0]; //make this better later
        }
        else {
            this.activeRect = null;
        }
        boundingShape.drawHierarchy();
        this.currentPos = pos;
    }
    static move(e, pos) {
        var overlapping = boundingShape.overlappHierarchy(pos);
        if (this.activeRect != null && this.isMouseDown == true) {
            this.activeRect.onMouseMoveDown(e, pos);
        }
        else if (this.isMouseDown == false) {
            if (this.activeRect != overlapping[0]) {
                this.activeRect?.onMouseHoverEnd(e, pos);
                this.activeRect = overlapping[0];
                this.activeRect?.onMouseHoverBegin(e, pos);
            }
            else {
            }
            //hover logic
        }
        //console.log(obj);
        boundingShape.drawHierarchy();
        this.currentPos = pos;
    }
    static up(e, pos) {
        this.isMouseDown = false;
        var overlapping = boundingShape.overlappHierarchy(pos);
        if (overlapping[0] == this.activeRect) {
            this.activeRect?.onMouseUp(e, pos);
            if (e != EMouseType.touch) //check if not mobile
             {
                this.activeRect?.onMouseHoverBegin(e, pos);
            }
        }
        else if (this.activeRect != null) {
            this.activeRect.onMouseUp(e, pos);
            this.activeRect = null;
        }
        boundingShape.drawHierarchy();
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
    static getOverlapping(pos) {
        return boundingShape.overlappHierarchy(pos);
    }
}
MouseHandler.canvases = [];
MouseHandler.currentPos = { x: 0, y: 0 };
MouseHandler.activeRect = null;
MouseHandler.isMouseDown = false;
