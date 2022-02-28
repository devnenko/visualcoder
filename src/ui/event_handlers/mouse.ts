

import { Canvas } from "../canvas.js";
import { Rect } from "../rect.js";
import { IPos } from "../types/pos.js";
import { EMouseType } from "../types/mouse.js";
import { boundingShape, IShape } from "../ui.js";
import { ToggleButton } from "../../ui_components/button.js";
import { Clickable } from "../clickable.js";
//import { components } from "../../main.js";

//need to rework the mouse logic in a more readable way and better structure with more static classes for usefull functions

export interface IMouseHandler{
    onMouseDown?(type:EMouseType,pos:IPos,isTopMost:boolean):void;
    onMouseMoveDown?(type:EMouseType,pos:IPos,isTopMost:boolean):void;
    onMouseUp?(type:EMouseType,pos:IPos,isTopMost:boolean):void;
    onMouseHoverBegin?(type:EMouseType,pos:IPos,isTopMost:boolean):void;
    onMouseHoverEnd?(type:EMouseType,pos:IPos,isTopMost:boolean):void;
}

export function isIMouseHandler(arg:any):arg is IMouseHandler{
    if (typeof arg.onMouseDown == 'function') { 
        return true;
    }
    return false;
}

export class MouseHandler{
    public static actifInputField:ToggleButton|null=null;
    public static canvases:Canvas[]=[];
    public static currentPos:IPos={x:0,y:0};
    public static mouseDownRects:Clickable[]=[];
    public static mouseHoverRects:Clickable[]=[];
    public static isMouseDown=false;
    public static topMostSave:Rect[]=[];

    static callbackObjects:Clickable[]=[];

    public static init(){
        //window.addEventListener('click', this.mouseClick.bind(this));
        window.addEventListener('touchstart', MouseHandler.touchDown.bind(this),{ passive: false });
        window.addEventListener('touchmove', MouseHandler.touchMove.bind(this),{ passive: false });
        window.addEventListener('touchend', MouseHandler.touchUp.bind(this),{ passive: false });
        window.addEventListener('mousedown', MouseHandler.mouseDown.bind(this));
        window.addEventListener('mousemove', MouseHandler.mouseMove.bind(this));
        window.addEventListener('mouseup', MouseHandler.mouseUp.bind(this));
        document.getElementById("keyboardHack")?.addEventListener('focusout', MouseHandler.focuseOut.bind(this));
    }
    

    static subscribe(object:Clickable){
        this.callbackObjects.push(object);
        //create dom here stuff for later optimization with collision checking
    }

    static unsubscribe(object:Clickable){
        if(this.callbackObjects.indexOf(object)!=-1){
            this.callbackObjects.splice(this.callbackObjects.indexOf(object), 1);

        }
        else{
            console.log("unsubscription failed")
        }
    }
    static focuseOut(){
        MouseHandler.actifInputField?.toggle(false);
    }

    public static getOverlapp(pos:IPos){
        const mousePos=pos;
        let objs:Clickable[]=[];
        
        for(const obj of this.callbackObjects){
            if(obj.absEdges.left<mousePos.x&&obj.absEdges.right>mousePos.x&&obj.absEdges.top<mousePos.y&&obj.absEdges.bottom>mousePos.y){
                //is overlapping$
                objs.push(obj);
            }
        }
        return objs;
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
        this.up(EMouseType.touch,{x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY});
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

        const overlObjs=this.getOverlapp(pos);
        const topMost=this.getTopMost(overlObjs);
        this.topMostSave=topMost;
        for(const overlObj of overlObjs){
            if (typeof overlObj.onMouseDown == 'function') { 
                if(!(overlObj.fireOnlyTopMost==true&&(overlObj as Rect)!=topMost[0])){
                    overlObj.onMouseDown(e,pos,topMost.includes(overlObj));
                }
                //overlObj.onMouseDown(e,pos,topMost.includes(overlObj));
            }
            this.mouseDownRects.push(overlObj);
        }
        if(this.actifInputField!=null){
            if(!overlObjs.includes(this.actifInputField)){
                this.actifInputField.toggle(false);
            }
        }
        boundingShape.draw();
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
        //boundingShape.draw();
        //this.currentPos=pos;

    }
    private static move(e:EMouseType,pos:IPos){
        //this runs to slowly (probably topmost is to power intensive function or smething else)
        this.currentPos=pos;
        const overlObjs=this.getOverlapp(pos);
        let topMost:Rect[]=[];
        let topMostDone:boolean=false;

        if(this.isMouseDown==true){

            for(const downRect of this.mouseDownRects){
                if (typeof downRect.onMouseMoveDown == 'function') { 
                    if(topMostDone==false){
                        topMost=this.getTopMost(overlObjs);
                        topMostDone=true;
                    }
                    downRect.onMouseMoveDown(e,pos,this.topMostSave.includes(downRect));
                }
            }

        }
        else{

            for(const overlObj of overlObjs){
                if(this.mouseHoverRects.includes(overlObj)==false){   
                    if(topMostDone==false){
                        topMost=this.getTopMost(overlObjs);
                        topMostDone=true;
                    };
                    if(overlObj.fireOnlyTopMost==true&&(overlObj as Rect)==topMost[0] as any){
                        if (typeof overlObj.onMouseHoverBegin == 'function') { 
                            overlObj.onMouseHoverBegin(e,pos,topMost.includes(overlObj));
                        }
                        this.mouseHoverRects.push(overlObj);
                    }
                    if(overlObj.fireOnlyTopMost==false){
                        if (typeof overlObj.onMouseHoverBegin == 'function') { 
                            overlObj.onMouseHoverBegin(e,pos,topMost.includes(overlObj));
                        }
                        this.mouseHoverRects.push(overlObj);
                    }

                    
                    for(const hoverObj of this.mouseHoverRects){
                        //console.log(hoverObj!=topMost as any)
                        if(hoverObj.fireOnlyTopMost==true&&(hoverObj as Rect)!=topMost[0] as any){
                            if (typeof hoverObj.onMouseHoverEnd == 'function') { 
                                hoverObj.onMouseHoverEnd(e,pos,topMost.includes(hoverObj));
                            }
            
                            this.mouseHoverRects.splice(this.mouseHoverRects.indexOf(hoverObj),1);
                        }
                        
                    }
                }
            }

            for(const hoverObj of this.mouseHoverRects){
                if(overlObjs.includes(hoverObj)==false){
    
                    if (typeof hoverObj.onMouseHoverEnd == 'function') { 
                        if(topMostDone==false){
                            topMost=this.getTopMost(overlObjs);
                            topMostDone=true;
                        }
                        hoverObj.onMouseHoverEnd(e,pos,topMost.includes(hoverObj));
                    }
    
                    this.mouseHoverRects.splice(this.mouseHoverRects.indexOf(hoverObj),1);
                }
            }
        }

        boundingShape.draw();
    }
    private static up(e:EMouseType,pos:IPos){
        this.currentPos=pos;
        this.isMouseDown=false;
        const overlObjs=this.getOverlapp(pos);
        const topMost=this.getTopMost(overlObjs);

        //for(const overlObj of overlObjs){
//
        //    if(this.mouseDownRects.includes(overlObj)==true){
        //        if (typeof overlObj.onMouseUp == 'function') { 
        //            overlObj.onMouseUp(e,pos,topMost.includes(overlObj));
        //        }
        //        if(e!=EMouseType.touch)//check if not mobile
        //        {
        //            if (typeof overlObj.onMouseHoverBegin == 'function') { 
        //                overlObj.onMouseHoverBegin(e,pos,topMost.includes(overlObj));
        //            }
        //        }
//
        //        this.mouseDownRects.splice(this.mouseDownRects.indexOf(overlObj),1);
    //
        //    }
        //    else  if(this.mouseDownRects.includes(overlObj)==false){
        //        if (typeof overlObj.onMouseUp == 'function') { 
        //            overlObj.onMouseUp(e,pos,topMost.includes(overlObj));
        //        }
        //    }
        //}
        for(const mouseDownRect of this.mouseDownRects){


            if (typeof mouseDownRect.onMouseUp == 'function') { 
                mouseDownRect.onMouseUp(e,pos,topMost.includes(mouseDownRect));
            }
            if(e!=EMouseType.touch)//check if not mobile
            {
                if(mouseDownRect.fireOnlyTopMost==true&&(mouseDownRect as Rect)==topMost[0]){
                    if (typeof mouseDownRect.onMouseHoverBegin == 'function') { 
                        mouseDownRect.onMouseHoverBegin(e,pos,topMost.includes(mouseDownRect));
                    }
                }
            }


        }
        this.mouseDownRects.splice(0,this.mouseDownRects.length);


        boundingShape.draw();
    }


    public static getMousePos(){
        return this.currentPos;
    }

    public static getRelativeMousePos(rect:Rect,pos:IPos){
        return {x:pos.x-rect.absEdges.left,y:pos.y-rect.absEdges.top};
    }

    public static posOnRects(rect:Rect){
        return {x:this.currentPos.x-rect.absEdges.left,y:this.currentPos.y-rect.absEdges.top}
    }

    public static getTopMostObject(pos:IPos){
        let overlapp=this.getOverlapp(pos);
        let topMost:(IMouseHandler&Rect);
        for (const over of overlapp){
        }
    }

    public static distanceFromBoundingShape(shape:IShape){
        let distanceFound=false;
        let distance:number=0;
        let currentShape:IShape=shape
        while(distanceFound==false){
            distance ++;
            if(currentShape.parent!=undefined){
                currentShape=currentShape.parent;
            }
            else{
                distanceFound=true;
            }
        }
        return distance-1;
    }
    public static getTopMost(rects:Rect[]){

        let previousWinner=0;
        let winnerRects:Rect[]=[];
        for(const rect of rects){
            if(this.distanceFromBoundingShape(rect)>previousWinner){
                previousWinner=this.distanceFromBoundingShape(rect);
                winnerRects.splice(0,winnerRects.length)
                winnerRects.push(rect);
            }
            else if(this.distanceFromBoundingShape(rect)==previousWinner){
                winnerRects.push(rect);
            }
        }

        return winnerRects;
    }

    //public static getOverlapping(pos:IPos){
    //    return boundingShape.overlappHierarchy(pos);
    //}
}