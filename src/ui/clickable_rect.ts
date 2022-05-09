import { MouseHandler, mouseHandler } from "./event_handlers/mouse.js";
import {  Rect } from "./rect.js";

export type Class<T =Rect> = new (...args: any[]) => T;

export function MakeClickable<Base extends Class>(base: Base) {

    return class extends base {
        private mouseOnlyIfTopMost:boolean=true;
        onMouseDown(mouseHandler:MouseHandler) { };
        onMouseMoveDown(mouseHandler:MouseHandler) { };
        onMouseUp(mouseHandler:MouseHandler) { };
        onMouseHoverBegin(mouseHandler:MouseHandler) { };
        onMouseHoverEnd(mouseHandler:MouseHandler) { };
        constructor(...args: any[]) {
            super(...args);
            mouseHandler.subscribe(this);
        }

        gMouseOnlyIfTopMost(){
            return this.mouseOnlyIfTopMost;
        }

        destroy(){
            mouseHandler.unsubscribe(this);
            super.destroy();
        }

        sMouseOnlyTopMost(isTrue:boolean){
            this.mouseOnlyIfTopMost=isTrue;
        }
    }
}
const DefClass=(MakeClickable(Rect))
export type CLickableMixin= InstanceType<typeof DefClass>;
