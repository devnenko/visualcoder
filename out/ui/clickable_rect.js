import { mouseHandler } from "./event_handlers/mouse.js";
import { Rect } from "./rect.js";
export function MakeClickable(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.mouseOnlyIfTopMost = true;
            mouseHandler.subscribe(this);
            this.setConfigAttrs(args[0]);
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
        addConfig(config) {
            super.addConfig(config);
        }
        destroySelfAndChildren() {
            mouseHandler.unsubscribe(this);
            super.destroySelfAndChildren();
        }
    };
}
const DefClass = (MakeClickable(Rect));
