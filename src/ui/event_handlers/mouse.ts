

import { Canvas } from "../canvas.js";
import { Rect } from "../rect.js";
import { IPos } from "../types/pos.js";
import { EMouseType } from "../types/mouse.js";
import { boundingShape, instanceOfShape, IShape } from "../shape.js";
//import { components } from "../../main.js";

export interface IMouseHandler{
    onMouseDown?(type:EMouseType,pos:IPos):void;
    onMouseMoveDown?(type:EMouseType,pos:IPos):void;
    onMouseUp?(type:EMouseType,pos:IPos):void;
    onMouseHoverBegin?(type:EMouseType,pos:IPos):void;
    onMouseHoverEnd?(type:EMouseType,pos:IPos):void;
}

export function isIMouseHandler(arg:any):arg is IMouseHandler{
    if (typeof arg.onMouseDown == 'function') { 
        return true;
    }
    return false;
}

export class MouseHandler{
    public static canvases:Canvas[]=[];
    public static currentPos:IPos={x:0,y:0};
    public static activeRect:(IMouseHandler&Rect)|null=null;
    public static isMouseDown=false;

    static callbackObjects:(IMouseHandler&Rect)[]=[];

    public static init(){
        //window.addEventListener('click', this.mouseClick.bind(this));
        window.addEventListener('touchstart', MouseHandler.touchDown.bind(this),{ passive: false });
        window.addEventListener('touchmove', MouseHandler.touchMove.bind(this),{ passive: false });
        window.addEventListener('touchend', MouseHandler.touchUp.bind(this),{ passive: false });
        window.addEventListener('mousedown', MouseHandler.mouseDown.bind(this));
        window.addEventListener('mousemove', MouseHandler.mouseMove.bind(this));
        window.addEventListener('mouseup', MouseHandler.mouseUp.bind(this));
    }

    static subscribe(object:(IMouseHandler&Rect)){
        this.callbackObjects.push(object);
    }

    static unsubscribe(object:(IMouseHandler&Rect)){
        if(this.callbackObjects.indexOf(object)!=-1){
            this.callbackObjects.splice(this.callbackObjects.indexOf(object), 1);
        }
    }

    private static getOverlapp(pos:IPos){
        const mousePos=pos;
        
        for(const obj of this.callbackObjects){
            if(obj.absEdges.left<mousePos.x&&obj.absEdges.right>mousePos.x&&obj.absEdges.top<mousePos.y&&obj.absEdges.bottom>mousePos.y){
                //is overlapping$
                return obj;
            }
        }
        return null;
    }

    private static touchDown(e:TouchEvent){
        e.preventDefault();
        this.down(EMouseType.touch,{x:e.touches[0].clientX,y:e.touches[0].clientY});
    }
    private static mouseDown(e:MouseEvent) {
        this.down(e.button,{x:e.x,y:e.y});
    }
    private static touchMove(e:TouchEvent){
        e.preventDefault();
        this.move(EMouseType.touch,{x:e.touches[0].clientX,y:e.touches[0].clientY});
    }
    private static mouseMove(e:MouseEvent) {
        this.move(e.button,{x:e.x,y:e.y});
    }
    private static touchUp(e:TouchEvent){
        e.preventDefault();
        this.up(EMouseType.touch,this.currentPos);
    }
    private static mouseUp(e:MouseEvent) {
        this.up(e.button,{x:e.x,y:e.y});
    }

    private static execIfAvailable(fn?:any){
        //if (typeof fn == 'function') { 
            
        //}
    }


    private static down(e:EMouseType,pos:IPos){
        this.isMouseDown=true;
        const overlapp=this.getOverlapp(pos);

        if(overlapp!=null){
            if (typeof overlapp.onMouseDown == 'function') { 
                overlapp.onMouseDown(e,pos);
            }
            this.activeRect=overlapp;
        }
        else{
            this.activeRect=null;
        }
        //var overlapping=boundingShape.overlappHierarchy(pos);

        //if(overlapping[0]){
        //    this.activeRect?.onMouseHoverEnd(e,pos);
        //    (overlapping[0] as Button).onMouseDown(e,pos);
        //    this.activeRect=overlapping[0] as Button; //make this better later
        //}
        //else{
        //    this.activeRect=null;
        //}
//
        //boundingShape.drawHierarchy();
        //this.currentPos=pos;
    }
    private static move(e:EMouseType,pos:IPos){
        this.currentPos=pos;
        const overlapp=this.getOverlapp(pos);

        if(this.isMouseDown==true&&this.activeRect!=null){
            if (typeof this.activeRect.onMouseMoveDown == 'function') { 
                this.activeRect.onMouseMoveDown(e,pos);
            }
        }
        else if(this.isMouseDown==false&&this.activeRect!=overlapp){

            if (typeof this.activeRect?.onMouseHoverEnd == 'function') { 
                this.activeRect.onMouseHoverEnd(e,pos);
            }
            if (typeof overlapp?.onMouseHoverBegin == 'function') { 
                overlapp.onMouseHoverBegin(e,pos);
            }

            this.activeRect=overlapp;
        }

        boundingShape.drawHierarchy();
    }
    private static up(e:EMouseType,pos:IPos){
        this.isMouseDown=false;
        const overlapp=this.getOverlapp(pos);

        if(overlapp==this.activeRect){
            if (typeof this.activeRect?.onMouseUp == 'function') { 
                this.activeRect?.onMouseUp(e,pos);
            }
            if(e!=EMouseType.touch)//check if not mobile
            {
                if (typeof this.activeRect?.onMouseHoverBegin == 'function') { 
                    this.activeRect?.onMouseHoverBegin(e,pos);
                }
            }

        }
        else  if(this.activeRect!=null){
            if (typeof this.activeRect.onMouseUp == 'function') { 
                this.activeRect.onMouseUp(e,pos);
            }
            this.activeRect=null;
        }

        boundingShape.drawHierarchy();
    }


    public static getMousePos(){
        return this.currentPos;
    }

    public static getRelativeMousePos(rect:Rect){
        return {x:this.currentPos.x-rect.absEdges.left,y:this.currentPos.y-rect.absEdges.top};
    }

    public static posOnRects(rect:Rect){
        return {x:this.currentPos.x-rect.absEdges.left,y:this.currentPos.y-rect.absEdges.top}
    }

    //public static getOverlapping(pos:IPos){
    //    return boundingShape.overlappHierarchy(pos);
    //}
}