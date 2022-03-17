import { mouseHandler } from "./event_handlers/mouse.js";
import { Rect } from "./rect.js";
export function ClickableMixin(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.mouseOnlyIfTopMost = true;
            this.forgetOnMouseLeave = false;
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
        addConfig(config) {
            super.addConfig(config);
        }
        destroy() {
            mouseHandler.unsubscribe(this);
            super.destroy();
        }
    };
}
const DefClass = (ClickableMixin(Rect));
