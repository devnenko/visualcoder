import { MouseHandler } from "./event_handlers/event_handlers.js";
import { Rect } from "./ui.js";
export class Clickable extends Rect {
    constructor(config) {
        super();
        this.fireOnlyTopMost = true;
        MouseHandler.subscribe(this);
        this.setAttrs(config);
    }
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
    addConfig(config) {
        super.addConfig(config);
    }
    destroy() {
        MouseHandler.unsubscribe(this);
        super.destroy();
    }
}
export function applyMixins(derivedCtor, constructors) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null));
        });
    });
    return Object;
}
// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:
function Scale(Base) {
    return class Scaling extends Base {
        constructor() {
            super(...arguments);
            // Mixins may not declare private/protected properties
            // however, you can use ES2020 private fields
            this._scale = 1;
        }
        setScale(scale) {
            this._scale = scale;
        }
        get scale() {
            return this._scale;
        }
    };
}
export function MakeClickable(Base) {
    return class Clickable extends Base {
        constructor() {
            super();
            this.fireOnlyTopMost = true;
            MouseHandler.subscribe(this);
        }
        addConfig(opts) {
            this.addConfig(opts);
        }
        destroy() {
            MouseHandler.unsubscribe(this);
            super.destroy();
        }
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
    };
}
