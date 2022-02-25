import { MouseHandler } from "./event_handlers/event_handlers.js";
import { Rect } from "./ui.js";
export class Button extends Rect {
    constructor(opts) {
        super({});
        //use texture atlas in future
        this.onMouseDown = (type, pos, isTopMost) => { };
        this.onMouseMoveDown = (type, pos, isTopMost) => { };
        this.onMouseUp = (type, pos, isTopMost) => { };
        this.onMouseHoverBegin = (type, pos, isTopMost) => { };
        this.onMouseHoverEnd = (type, pos, isTopMost) => { };
        this.addConfig(opts);
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
