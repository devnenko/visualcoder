import { MouseHandler } from "./event_handlers/event_handlers.js";
import { Rect } from "./ui.js";
export class Clickable extends Rect {
    //use texture atlas in future
    onMouseDown(type, pos, isTopMost) { }
    ;
    onMouseMoveDown(type, pos, isTopMost) { }
    ;
    onMouseUp(type, pos, isTopMost) { }
    ;
    onMouseHoverBegin(type, pos, isTopMost) { }
    ;
    onMouseHoverEnd(type, pos, isTopMost) { }
    ;
    constructor() {
        super();
        MouseHandler.subscribe(this);
    }
    createConfig(opts) {
        this.addConfig(opts);
    }
    destroy() {
        MouseHandler.unsubscribe(this);
        super.destroy();
    }
}
