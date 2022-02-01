
import { Button } from "../button.js";
import { Canvas } from "../canvas.js";
import { Rect } from "../rect.js";
import { IPos } from "../types/pos.js";
import { EMouseType } from "../types/mouse.js";
import { boundingShape, instanceOfShape } from "../shape.js";
import { instanceOfIClickable } from "../clickable.js";
//import { components } from "../../main.js";


export class MouseHandler{
    public static canvases:Canvas[]=[];
    public static currentPos:IPos={x:0,y:0};
    public static activeRect:Button|null=null;
    public static isMouseDown=false;

    public static init(){
        //window.addEventListener('click', this.mouseClick.bind(this));
        window.addEventListener('touchstart', MouseHandler.touchDown.bind(this),{ passive: false });
        window.addEventListener('touchmove', MouseHandler.touchMove.bind(this),{ passive: false });
        window.addEventListener('touchend', MouseHandler.touchUp.bind(this),{ passive: false });
        window.addEventListener('mousedown', MouseHandler.mouseDown.bind(this));
        window.addEventListener('mousemove', MouseHandler.mouseMove.bind(this));
        window.addEventListener('mouseup', MouseHandler.mouseUp.bind(this));
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


    private static down(e:EMouseType,pos:IPos){
        this.isMouseDown=true;
        var overlapping=boundingShape.overlappHierarchy(pos);

        if(overlapping[0]){
            this.activeRect?.onMouseHoverEnd(e,pos);
            (overlapping[0] as Button).onMouseDown(e,pos);
            this.activeRect=overlapping[0] as Button; //make this better later
        }
        else{
            this.activeRect=null;
        }

        boundingShape.drawHierarchy();
        this.currentPos=pos;
    }
    private static move(e:EMouseType,pos:IPos){
        var overlapping=boundingShape.overlappHierarchy(pos);

        if(this.activeRect!=null&&this.isMouseDown==true){
            this.activeRect.onMouseMoveDown(e,pos);
        }
        else if(this.isMouseDown==false){
            if(this.activeRect!=overlapping[0]){
                this.activeRect?.onMouseHoverEnd(e,pos);
                this.activeRect=overlapping[0];
                this.activeRect?.onMouseHoverBegin(e,pos);
            }
            else{

            }
            //hover logic
        }
        //console.log(obj);
        boundingShape.drawHierarchy();
        this.currentPos=pos;

    }
    private static up(e:EMouseType,pos:IPos){
        this.isMouseDown=false;
        var overlapping=boundingShape.overlappHierarchy(pos);

        if(overlapping[0]==this.activeRect){
            this.activeRect?.onMouseUp(e,pos);
            if(e!=EMouseType.touch)//check if not mobile
            {
                this.activeRect?.onMouseHoverBegin(e,pos);
            }

        }
        else  if(this.activeRect!=null){
            this.activeRect.onMouseUp(e,pos);
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

    public static getOverlapping(pos:IPos){
        return boundingShape.overlappHierarchy(pos);
    }
}