import { mouseHandler } from "./event_handlers/mouse.js";
import { Rect } from "./rect.js";
export function MakeClickable(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.mouseOnlyIfTopMost = true;
            mouseHandler.subscribe(this);
        }
        onMouseDown(mouseHandler) { }
        ;
        onMouseMoveDown(mouseHandler) { }
        ;
        onMouseUp(mouseHandler) { }
        ;
        onMouseHoverBegin(mouseHandler) { }
        ;
        onMouseHoverEnd(mouseHandler) { }
        ;
        destroy() {
            mouseHandler.unsubscribe(this);
            super.destroy();
        }
        sMouseOnlyTopMost(isTrue) {
            this.mouseOnlyIfTopMost = isTrue;
        }
    };
}
const DefClass = (MakeClickable(Rect));
