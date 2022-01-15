import { IMouseEvents, instanceOfIMouseEvents } from "../mouse_events.js";
import { BoundingRect } from "../bounding_rect.js";
import { Button } from "../button.js";
import { Canvas } from "../canvas.js";
import { Rect } from "../rect.js";
import { IPos } from "../types/pos.js";
import { EMouseType } from "../types/mouse.js";
//import { components } from "../../main.js";


export class MouseHandler{
    public static canvases:Canvas[]=[];
    public static currentPos:IPos={x:0,y:0};
    public static activeRect:Button|null=null;
    public static isMouseDown=false;

    public static init(){
        //window.addEventListener('click', this.mouseClick.bind(this));
        window.addEventListener('touchstart', MouseHandler.touchDown.bind(this));
        window.addEventListener('touchmove', MouseHandler.touchMove.bind(this));
        window.addEventListener('touchend', MouseHandler.touchUp.bind(this));
        window.addEventListener('mousedown', MouseHandler.mouseDown.bind(this));
        window.addEventListener('mousemove', MouseHandler.mouseMove.bind(this));
        window.addEventListener('mouseup', MouseHandler.mouseUp.bind(this));
    }
    private static touchDown(e:TouchEvent){
        this.currentPos={x:e.touches[0].clientX,y:e.touches[0].clientY}
        this.isMouseDown=true;

        var obj=BoundingRect.checkOverlapp(this.currentPos);
        //console.log(obj);
        if(obj[0]){
            this.activeRect?.onMouseHoverEnd(EMouseType.touch);
            (obj[0] as Button).onMouseDown(EMouseType.touch);
            this.activeRect=obj[0] as Button; //make this better later
        }
        //components.view.actifContextMenu?.destroy();
        //components.view.actifContextMenu=null;
        BoundingRect.drawHierarchy();
    }

    private static touchMove(e:TouchEvent){
        this.currentPos={x:e.touches[0].clientX,y:e.touches[0].clientY}
        var obj=BoundingRect.checkOverlapp(this.currentPos);

        if(this.activeRect!=null&&this.isMouseDown==true){
            this.activeRect.onMouseMoveDown(EMouseType.touch);
        }
        else if(this.isMouseDown==false){
            if(this.activeRect!=obj[0]){
                this.activeRect?.onMouseHoverEnd(EMouseType.touch);
                this.activeRect=obj[0];
                this.activeRect?.onMouseHoverBegin(EMouseType.touch);
            }
            else{

            }
            //hover logic
        }
        //console.log(obj);
    }

    private static touchUp(e:TouchEvent){
        //this.currentPos={x:e.touches[0].clientX,y:e.touches[0].clientY}
        this.isMouseDown=false;

        if(this.activeRect!=null){
            this.activeRect.onMouseUp(EMouseType.touch);
            this.activeRect=null;
        }
        //console.log(obj);
    }

    private static mouseDown(e:MouseEvent) {
        //console.log("down")
        this.currentPos={x:e.x,y:e.y}
        this.isMouseDown=true;

        var obj=BoundingRect.checkOverlapp(this.currentPos);
        //console.log(obj);
        if(obj[0]){
            this.activeRect?.onMouseHoverEnd(e.button);
            (obj[0] as Button).onMouseDown(e.button);
            this.activeRect=obj[0] as Button; //make this better later
        }
        //components.view.actifContextMenu?.destroy();
        //components.view.actifContextMenu=null;
        BoundingRect.drawHierarchy();

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

        var obj=BoundingRect.checkOverlapp(this.currentPos);
        if(obj[0]==this.activeRect){
            this.activeRect.onMouseUp(e.button);
            this.activeRect?.onMouseHoverBegin(e.button);
        }
        else  if(this.activeRect!=null){
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