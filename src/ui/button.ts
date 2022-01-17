import { IMouseEvents, instanceOfIMouseEvents } from "./mouse_events.js";
import { Canvas } from "./canvas.js";
import { IShape} from "./shape.js";
import {  Rect, RectType} from "./rect.js";
import { EMouseType } from "./types/mouse.js";
import { IPos } from "./types/pos.js";


export class Button extends Rect implements IMouseEvents{
    public discIMouseEvents: 'IMouseEvents'='IMouseEvents';
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas);
    }

    checkOverlapp(pos:IPos): Button[] {
        let all:Button[]=[];
        
        if(this.absEdges.left<pos.x&&this.absEdges.right>pos.x&&this.absEdges.top<pos.y&&this.absEdges.bottom>pos.y){
            all.push(this);
        }
        for (const child of this.children){
            all=all.concat((child as IShape).checkOverlapp(pos) as Button[])
        }
        //all=all.slice().reverse();
        return all;
    }

    onMouseDown(type:EMouseType): void {
        //throw new Error('Method not implemented.');
    }

    onMouseMoveDown(type:EMouseType): void {
        //throw new Error('Method not implemented.');
    }

    onMouseUp(type:EMouseType): void {
        //throw new Error('Method not implemented.');
    }

    onMouseHoverBegin(type: EMouseType): void {
        //throw new Error('Method not implemented.');
    }

    onMouseHoverEnd(type:EMouseType): void {
        //throw new Error('Method not implemented.');
    }
}