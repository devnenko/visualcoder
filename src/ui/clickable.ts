import { Button } from "./button.js";
import { EMouseType } from "./types/mouse.js";
import { IPos } from "./types/pos.js";


export interface IClickable{
    discriminator2: 'IMouseEvents',
    onMouseDown?(type:EMouseType,pos:IPos):void;
    onMouseMoveDown?(type:EMouseType,pos:IPos):void;
    onMouseUp?(type:EMouseType,pos:IPos):void;
    onMouseHoverBegin?(type:EMouseType,pos:IPos):void;
    onMouseHoverEnd?(type:EMouseType,pos:IPos):void;
}

export function instanceOfIClickable(arg: any): arg is IClickable{
    return arg.discriminator2 === 'IMouseEvents';
}