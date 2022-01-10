import { Button } from "./button.js";
import { EMouseType } from "./types/mouse.js";
import { IPos } from "./types/pos.js";


export interface IMouseEvents{
    discIMouseEvents: 'IMouseEvents',
    onMouseDown?(type:EMouseType):void;
    onMouseMoveDown?(type:EMouseType):void;
    onMouseUp?(type:EMouseType):void;
    onMouseHoverBegin?(type:EMouseType):void;
    onMouseHoverEnd?(type:EMouseType):void;
}

export function instanceOfIMouseEvents(object: any): object is IMouseEvents{
    return object.discIMouseEvents === 'IMouseEvents';
}