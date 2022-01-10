import { isIMouseEvents } from './mouse_events.js';
import { Canvas } from './ui/canvas.js';
export class MouseState {
    static init() {
        //window.addEventListener('click', MouseState.mouseClick.bind(this));
        window.addEventListener('mousedown', MouseState.mouseDown.bind(this));
        window.addEventListener('mousemove', MouseState.mouseMove.bind(this));
        window.addEventListener('mouseup', MouseState.mouseUp.bind(this));
    }
    static posOnRects(rect) {
        return { x: this.currentPos.x - rect.absEdges.left, y: this.currentPos.y - rect.absEdges.top };
    }
    static mouseDown(e) {
        MouseState.currentPos = { x: e.x, y: e.y };
        var obj = Canvas.boundingRect.checkOverlapp(MouseState.currentPos.x, MouseState.currentPos.y);
        if (isIMouseEvents(obj[0])) {
            obj[0].onMouseDown();
            MouseState.activeRect = obj[0];
            MouseState.isMouseDown = true;
        }
        //console.log(obj);
    }
    static mouseMove(e) {
        MouseState.currentPos = { x: e.x, y: e.y };
        if (isIMouseEvents(MouseState.activeRect) && MouseState.isMouseDown == true) {
            MouseState.activeRect.onMouseMoveDown();
        }
        else if (isIMouseEvents(MouseState.activeRect) && MouseState.isMouseDown == false) {
            //hover logic
        }
        //console.log(obj);
    }
    static mouseUp(e) {
        MouseState.currentPos = { x: e.x, y: e.y };
        if (isIMouseEvents(MouseState.activeRect) && MouseState.activeRect != null) {
            MouseState.activeRect.onMouseUp();
            MouseState.activeRect;
            MouseState.activeRect = null;
            MouseState.isMouseDown = false;
        }
        //console.log(obj);
    }
    static getMousePos() {
        return MouseState.currentPos;
    }
    static getRelativeMousePos(rect) {
        return { x: MouseState.currentPos.x - rect.absEdges.left, y: MouseState.currentPos.y - rect.absEdges.top };
    }
}
MouseState.canvases = [];
MouseState.currentPos = { x: 0, y: 0 };
MouseState.activeRect = null;
MouseState.isMouseDown = false;
