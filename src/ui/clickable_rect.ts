import { MouseHandler, mouseHandler } from "./event_handlers/mouse.js";
import { IRectConfig, Rect } from "./rect.js";

export type Class<T =Rect> = new (...args: any[]) => T;

export interface IClickableConfig extends IRectConfig{
    mouseOnlyIfTopMost?:boolean;
    onMouseDown?: () => void,
    onMouseMoveDown?: () => void;
    onMouseUp?: () => void;
    onMouseHoverBegin?: () => void;
    onMouseHoverEnd?: () => void;
}

export function MakeClickable<Base extends Class,Config extends IClickableConfig>(base: Base) {

    return class extends base {
        mouseOnlyIfTopMost:boolean=true;
        onMouseDown(mouseHandler:MouseHandler) { };
        onMouseMoveDown(mouseHandler:MouseHandler) { };
        onMouseUp(mouseHandler:MouseHandler) { };
        onMouseHoverBegin(mouseHandler:MouseHandler) { };
        onMouseHoverEnd(mouseHandler:MouseHandler) { };
        constructor(...args: any[]) {
            super(...args);
            mouseHandler.subscribe(this);
            this.setConfigAttrs(args[0]);
        }
        public addConfig(config: Config): void {
            super.addConfig(config);
        }
        destroy(){
            mouseHandler.unsubscribe(this);
            super.destroy();
        }
    }
}
const DefClass=(MakeClickable(Rect))
export type CLickableMixinClass= InstanceType<typeof DefClass>;
