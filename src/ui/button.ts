
import { Canvas } from "./canvas.js";
import { IShape} from "./shape.js";
import {  Rect} from "./rect.js";
import { EMouseType } from "./types/mouse.js";
import { IPos } from "./types/pos.js";
import { IClickable } from "./clickable.js";


export class Button extends Rect implements IClickable{
    public discriminator2: 'IMouseEvents'='IMouseEvents';
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas);
    }

    overlappHierarchy(pos:IPos): Button[] {
        let all:Button[]=[];
        
        if(this.absEdges.left<pos.x&&this.absEdges.right>pos.x&&this.absEdges.top<pos.y&&this.absEdges.bottom>pos.y){
            all.push(this);
        }
        for (const child of this.children){
            all=all.concat((child as IShape).overlappHierarchy(pos) as Button[])
        }
        //all=all.slice().reverse();
        return all;
    }

    onMouseDown(type:EMouseType,pos:IPos): void {
        //throw new Error('Method not implemented.');
    }

    onMouseMoveDown(type:EMouseType,pos:IPos): void {
        //throw new Error('Method not implemented.');
    }

    onMouseUp(type:EMouseType,pos:IPos): void {
        //throw new Error('Method not implemented.');
    }

    onMouseHoverBegin(type: EMouseType,pos:IPos): void {
        //throw new Error('Method not implemented.');
    }

    onMouseHoverEnd(type:EMouseType,pos:IPos): void {
        //throw new Error('Method not implemented.');
    }
}