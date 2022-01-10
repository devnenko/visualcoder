import { IMouseEvents, instanceOfIMouseEvents } from "../mouse_events.js";
import { BoundingRect } from "../bounding_rect.js";
import { Button } from "../button.js";
import { Canvas } from "../canvas.js";
import { Rect } from "../rect.js";
import { IPos } from "../types/pos.js";


export class MouseHandler{
    public static canvases:Canvas[]=[];
    public static currentPos:IPos={x:0,y:0};
    public static activeRect:Button|null=null;
    public static isMouseDown=false;

    public static init(){
        //window.addEventListener('click', this.mouseClick.bind(this));
        window.addEventListener('mousedown', MouseHandler.mouseDown.bind(this));
        window.addEventListener('mousemove', MouseHandler.mouseMove.bind(this));
        window.addEventListener('mouseup', MouseHandler.mouseUp.bind(this));
    }

    private static mouseDown(e:MouseEvent) {
        this.currentPos={x:e.x,y:e.y}
        this.isMouseDown=true;

        var obj=BoundingRect.checkOverlapp(this.currentPos);
        //console.log(obj);
        if(obj[0]){
            this.activeRect?.onMouseHoverEnd(e.button);
            (obj[0] as Button).onMouseDown(e.button);
            this.activeRect=obj[0] as Button; //make this better later
        }
    }

    private static mouseMove(e:MouseEvent) {
        this.currentPos={x:e.x,y:e.y}
        var obj=BoundingRect.checkOverlapp(this.currentPos);

        if(this.activeRect!=null&&this.isMouseDown==true){
            this.activeRect.onMouseMoveDown(e.button);
        }
        else if(this.isMouseDown==false){
            if(this.activeRect!=obj[0]){
                this.activeRect?.onMouseHoverEnd(e.button);
                this.activeRect=obj[0];
                this.activeRect?.onMouseHoverBegin(e.button);
            }
            else{

            }
            //hover logic
        }
        //console.log(obj);
    }

    private static mouseUp(e:MouseEvent) {
        this.currentPos={x:e.x,y:e.y}
        this.isMouseDown=false;

        if(this.activeRect!=null){
            this.activeRect.onMouseUp(e.button);
            this.activeRect=null;
        }
        //console.log(obj);
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
}