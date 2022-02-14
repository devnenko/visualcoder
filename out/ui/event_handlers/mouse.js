import { EMouseType } from "../types/mouse.js";
import { boundingShape } from "../shape.js";
export function isIMouseHandler(arg) {
    if (typeof arg.onMouseDown == 'function') {
        return true;
    }
    return false;
}
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
    static subscribe(object) {
        this.callbackObjects.push(object);
    }
    static unsubscribe(object) {
        if (this.callbackObjects.indexOf(object) != -1) {
            this.callbackObjects.splice(this.callbackObjects.indexOf(object), 1);
        }
    }
    static getOverlapp(pos) {
        const mousePos = pos;
        for (const obj of this.callbackObjects) {
            if (obj.absEdges.left < mousePos.x && obj.absEdges.right > mousePos.x && obj.absEdges.top < mousePos.y && obj.absEdges.bottom > mousePos.y) {
                //is overlapping$
                return obj;
            }
        }
        return null;
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
    static execIfAvailable(fn) {
        //if (typeof fn == 'function') { 
        //}
    }
    static down(e, pos) {
        this.isMouseDown = true;
        const overlapp = this.getOverlapp(pos);
        if (overlapp != null) {
            if (typeof overlapp.onMouseDown == 'function') {
                overlapp.onMouseDown(e, pos);
            }
            this.activeRect = overlapp;
        }
        else {
            this.activeRect = null;
        }
        //var overlapping=boundingShape.overlappHierarchy(pos);
        //if(overlapping[0]){
        //    this.activeRect?.onMouseHoverEnd(e,pos);
        //    (overlapping[0] as Button).onMouseDown(e,pos);
        //    this.activeRect=overlapping[0] as Button; //make this better later
        //}
        //else{
        //    this.activeRect=null;
        //}
        //
        //boundingShape.drawHierarchy();
        //this.currentPos=pos;
    }
    static move(e, pos) {
        this.currentPos = pos;
        const overlapp = this.getOverlapp(pos);
        if (this.isMouseDown == true && this.activeRect != null) {
            if (typeof this.activeRect.onMouseMoveDown == 'function') {
                this.activeRect.onMouseMoveDown(e, pos);
            }
        }
        else if (this.isMouseDown == false && this.activeRect != overlapp) {
            if (typeof this.activeRect?.onMouseHoverEnd == 'function') {
                this.activeRect.onMouseHoverEnd(e, pos);
            }
            if (typeof overlapp?.onMouseHoverBegin == 'function') {
                overlapp.onMouseHoverBegin(e, pos);
            }
            this.activeRect = overlapp;
        }
        boundingShape.drawHierarchy();
    }
    static up(e, pos) {
        this.isMouseDown = false;
        const overlapp = this.getOverlapp(pos);
        if (overlapp == this.activeRect) {
            if (typeof this.activeRect?.onMouseUp == 'function') {
                this.activeRect?.onMouseUp(e, pos);
            }
            if (e != EMouseType.touch) //check if not mobile
             {
                if (typeof this.activeRect?.onMouseHoverBegin == 'function') {
                    this.activeRect?.onMouseHoverBegin(e, pos);
                }
            }
        }
        else if (this.activeRect != null) {
            if (typeof this.activeRect.onMouseUp == 'function') {
                this.activeRect.onMouseUp(e, pos);
            }
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
}
MouseHandler.canvases = [];
MouseHandler.currentPos = { x: 0, y: 0 };
MouseHandler.activeRect = null;
MouseHandler.isMouseDown = false;
MouseHandler.callbackObjects = [];
