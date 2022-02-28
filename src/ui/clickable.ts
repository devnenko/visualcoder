import { isIMouseHandler, MouseHandler } from "./event_handlers/event_handlers.js";
import { IShape, boundingShape, EObjectType, IShapeOpts, BoundingShape } from "./ui.js";
import { ITransform, EConstraintsX, EConstraintsY, IEdges, IPos, EMouseType } from "./types/types.js";
import { Shape } from "./shape.js";
import { Rect } from "./ui.js";
import { IRectConfig } from "./rect.js";

export interface IClickableConfig extends IRectConfig {
    onMouseDown?: (type: EMouseType, pos: IPos) => void,
    onMouseMoveDown?: (type: EMouseType, pos: IPos, isTopMost: boolean) => void;
    onMouseUp?: (type: EMouseType, pos: IPos, isTopMost: boolean) => void;
    onMouseHoverBegin?: (type: EMouseType, pos: IPos, isTopMost: boolean) => void;
    onMouseHoverEnd?: (type: EMouseType, pos: IPos, isTopMost: boolean) => void;
    fireOnlyTopMost?: boolean;
}

export class Clickable<Config= IClickableConfig> extends Rect<Config> {
    //use texture atlas in future

    onMouseDown(type: EMouseType, pos: IPos, isTopMost: boolean) {        };
    onMouseMoveDown(type: EMouseType, pos: IPos, isTopMost: boolean) { };
    onMouseUp(type: EMouseType, pos: IPos, isTopMost: boolean) { };
    onMouseHoverBegin(type: EMouseType, pos: IPos, isTopMost: boolean) { };
    onMouseHoverEnd(type: EMouseType, pos: IPos, isTopMost: boolean) { };
    fireOnlyTopMost: boolean = true;

    constructor(config?:IClickableConfig) {
        super()
        MouseHandler.subscribe(this);
        this.setAttrs(config);
    }

    addConfig(config: IClickableConfig): void {
        super.addConfig(config);
    }

    destroy() {
        MouseHandler.unsubscribe(this);
        super.destroy();
    }

}

export function applyMixins(derivedCtor: any, constructors: any[]) {
    constructors.forEach((baseCtor) => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
            Object.defineProperty(
                derivedCtor.prototype,
                name,
                Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
                Object.create(null)
            );
        });
    });
    return Object;
}

// To get started, we need a type which we'll use to extend
// other classes from. The main responsibility is to declare
// that the type being passed in is a class.

type Constructor = new (...args: any[]) => {};

// This mixin adds a scale property, with getters and setters
// for changing it with an encapsulated private property:

function Scale<TBase extends Constructor>(Base: TBase) {
    return class Scaling extends Base {
        // Mixins may not declare private/protected properties
        // however, you can use ES2020 private fields
        _scale = 1;

        setScale(scale: number) {
            this._scale = scale;
        }

        get scale(): number {
            return this._scale;
        }
    };
}

export function MakeClickable<TBase extends Constructor>(Base: { new(...args: any[]): Rect }) {
    return class Clickable extends Base {
        constructor() {
            super();
            MouseHandler.subscribe(this);
        }

        addConfig(opts: any) {
            this.addConfig(opts)
        }

        destroy() {
            MouseHandler.unsubscribe(this);
            super.destroy();
        }
        onMouseDown(type: EMouseType, pos: IPos, isTopMost: boolean) { };
        onMouseMoveDown(type: EMouseType, pos: IPos, isTopMost: boolean) { };
        onMouseUp(type: EMouseType, pos: IPos, isTopMost: boolean) { };
        onMouseHoverBegin(type: EMouseType, pos: IPos, isTopMost: boolean) { };
        onMouseHoverEnd(type: EMouseType, pos: IPos, isTopMost: boolean) { };
        fireOnlyTopMost: boolean = true;
    };
}