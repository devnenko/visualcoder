import { Asset } from "../../editor/asset.js";
import { IPos } from "../../util/transform.js";
import { boundingRect } from "../bounding_rect.js";
import { CLickableMixin } from "../clickable_rect.js";
import { Rect } from "../rect.js";

//for now mousehandler should only handle one touch event as if it was a mouse event and the only one on screen 
//implement multitouch later

export enum EMouseType {
    left = 0,
    middle = 1,
    right = 2,
    touch = 3
}

class CTouch {
    identifier;
    x;
    y;
    touchDownRects;
    topMostRect;
    parent;
    constructor(identifier: number, x: number, y: number, parent: MouseHandler) {
        this.identifier = identifier;
        this.x = x;
        this.y = y;
        this.touchDownRects = parent.getOverlapping({ x: x, y: y });
        this.topMostRect = parent.getTop(this.touchDownRects);
        this.parent = parent;
    }

}

export class MouseHandler {

    mousePos: IPos = { x: 0, y: 0 };

    ongoingTouches: CTouch[] = []

    touchesDownAmount: number = 0;

    hover: CTouch | null = null;

    callbackObjects: CLickableMixin[] = [];

    varrr: number = 0;

    isMouse: boolean = true;

    activepointer:Rect|null=null;
    activetoggle:Rect|null=null;
    mouseDownCallbacks:Array<{thisFunc:()=>void, thisObj: Rect}>=[];//make map out of this

    draggedAsset:Asset|null=null;

    constructor() {
        window.addEventListener('touchstart', this.touchStart.bind(this), { passive: false });
        window.addEventListener('mousedown', this.mouseDown.bind(this));
        window.addEventListener('touchmove', this.touchMove.bind(this), { passive: false });
        window.addEventListener('mousemove', this.mouseMove.bind(this));
        window.addEventListener('touchend', this.touchEnd.bind(this), { passive: false });
        window.addEventListener('mouseup', this.mouseUp.bind(this));
//
        window.addEventListener('blur', this.visiChange.bind(this));
        window.addEventListener('focus', this.visiChange.bind(this));


    }


    subscribe(object: CLickableMixin) {
        this.callbackObjects.push(object);
        //could be optimized here with dom-like checking
    }
    unsubscribe(object: CLickableMixin) {
        if (this.callbackObjects.indexOf(object) != -1) {
            this.callbackObjects.splice(this.callbackObjects.indexOf(object), 1);

        }
        else {
            console.error("unsubscription failed")
        }
    }

    visiChange(e: any) {
        this.cancelAll();
    }

    isOverlapping(obj: CLickableMixin){
        const objEdges=obj.gAbsEdges();
        return objEdges.left < this.mousePos.x && objEdges.right > this.mousePos.x && objEdges.top < this.mousePos.y && objEdges.bottom > this.mousePos.y;
    }

    getOverlapping(pos: IPos) {
        let objs: CLickableMixin[] = [];

        for (const obj of this.callbackObjects) {
            const objEdges=obj.gAbsEdges();
            if (objEdges.left < pos.x && objEdges.right > pos.x && objEdges.top < pos.y && objEdges.bottom > pos.y) {
                //is overlapping$
                objs.push(obj);
            }
        }
        return objs;
    }
    getTop(overlap: CLickableMixin[]) {
        if (overlap.length == 0) {
            return null;
        }
        let winnerRect: CLickableMixin = overlap[0];
        for (const obj of overlap) {
            if (boundingRect.allShapes.indexOf(obj) > boundingRect.allShapes.indexOf(winnerRect)) {
                winnerRect = obj;
            }
        }

        return winnerRect;
    }
    getConsidered(rects: CLickableMixin[]) {
        const consRects: CLickableMixin[] = [];
        const top = this.getTop(rects);
        for (const rect of rects) {
            if (rect.gMouseOnlyIfTopMost() == false && rect != top) {
                consRects.push(rect);
            }
        }
        if (top != null) {
            consRects.push(top);
        }
        return consRects;
    }

    cancelAll() {
        for (const touch of this.ongoingTouches) {
            this.up(touch)
            this.ongoingTouches.splice(this.ongoingTouches.indexOf(touch), 1);  // remove it; we're done

        }
        if (this.hover != null) {
            const hover = this.hover as CTouch;

            this.getConsidered(hover.touchDownRects).forEach(el => {
                hover.touchDownRects.splice(hover.touchDownRects.indexOf(el), 1)
                el.onMouseHoverEnd(this);
            })
            this.hover = null;

            this.hover = hover;
        }
    }



    touchStart(e: TouchEvent) {
        e.preventDefault(); //disables long clikc select with canvas but also events from passing through to div

        if (this.isMouse == true)//edgecase mouse down and then touch down
        {
            this.cancelAll();
            this.isMouse = false;
        }

        const ctx = boundingRect.canvas.ctx
        var touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            console.log("touchstart:" + i); 
            const touchClass = this.copyTouch(touches[i]);
            this.touchesDownAmount = this.ongoingTouches.push(touchClass);//copy cause of weird behaviour with safari else
            this.down(touchClass);
        }
        ctx.fillStyle = "red"
        ctx.font = 14 + "px Sans-Serif";
        this.varrr += 40;
        this.mousePos={x:this.ongoingTouches[0].x,y:this.ongoingTouches[0].y}
    }
    mouseDown(e: MouseEvent) {
        //e.preventDefault();

        for(var i =0;i<this.mouseDownCallbacks.length;i++){
            this.mouseDownCallbacks[i].thisFunc.call(this.mouseDownCallbacks[i].thisObj);
        }
        
        if(this.activepointer){
            this.activepointer.destroy();
            this.activepointer=null;//important dont forget or it will destroy all components
        }
        boundingRect.draw();

        if (this.isMouse == false)//edgecase touch down and then mouse down
        {
            this.cancelAll();
            this.isMouse = true;
        }

        this.ongoingTouches = [];//clear in case was using touches before 
        const touchClass = new CTouch(0, e.clientX, e.clientY, this)
        this.touchesDownAmount = this.ongoingTouches.push(touchClass);
        this.down(touchClass);
        this.hover = null;
        this.mousePos={x:this.ongoingTouches[0].x,y:this.ongoingTouches[0].y}
    }

    touchMove(e: TouchEvent) {

        //e.preventDefault();
        this.mousePos={x:this.ongoingTouches[0].x,y:this.ongoingTouches[0].y}
        var touches = e.changedTouches;

        for (const touch of touches) {
            var idx = this.ongoingTouchIndexById(touch.identifier);
            const changedTouchClass = this.ongoingTouches[idx];
            changedTouchClass.x = touch.clientX;
            changedTouchClass.y = touch.clientY;

            this.moveDown(changedTouchClass);
        }
    }
    mouseMove(e: MouseEvent) {
        //e.preventDefault();
        this.mousePos={x:e.clientX,y:e.clientY}
        if (this.ongoingTouches[0])//has a touch
        {
            //e.preventDefault();
            const changedTouchClass = this.ongoingTouches[0];
            changedTouchClass.x = e.clientX;
            changedTouchClass.y = e.clientY;

            this.moveDown(changedTouchClass);
        }
        else {
            if (this.hover == null) {
                this.hover = new CTouch(1, e.clientX, e.clientY, this)
                this.hover.touchDownRects.forEach(el => el.onMouseHoverBegin(this))
            }

            const hover = this.hover as CTouch;
            hover.x = e.clientX;
            hover.y = e.clientY;
            const overlap = this.getConsidered(this.getOverlapping({ x: e.clientX, y: e.clientY }))


            overlap.forEach(el => {
                if (!(hover.touchDownRects.includes(el))) {
                    this.hover?.touchDownRects.push(el);
                    el.onMouseHoverBegin(this);
                }
            })

            hover.touchDownRects.forEach(el => {
                if (!(overlap.includes(el))) {
                    hover.touchDownRects.splice(hover.touchDownRects.indexOf(el), 1)
                    el.onMouseHoverEnd(this);
                }
            })

            this.hover = hover;
        }
    }

    touchEnd(e: TouchEvent) {
        //e.preventDefault();
        const ctx = boundingRect.canvas.ctx
        var touches = e.changedTouches;

        for (var i = 0; i < touches.length; i++) {
            var idx = this.ongoingTouchIndexById(touches[i].identifier);
            this.up(this.ongoingTouches[idx])


            if (idx >= 0) {
                this.ongoingTouches.splice(idx, 1);  // remove it; we're done
                this.touchesDownAmount = this.ongoingTouches.length;
            } else {
                console.log("can't figure out which touch to end");
            }
        }
        this.varrr += 40;
        ctx.fillStyle = "blue"
    }
    mouseUp(e: MouseEvent) {
        //e.preventDefault();
        this.up(this.ongoingTouches[0])
        if (this.hover == null) {
            this.hover = new CTouch(1, e.clientX, e.clientY, this)
            this.getConsidered(this.hover.touchDownRects).forEach(el => el.onMouseHoverBegin(this))

            //const touchClass = new CTouch(20, e.clientX, e.clientY, this)
            //this.up(touchClass);
        }

        if(this.draggedAsset){
            const tClass= new CTouch(1, e.clientX, e.clientY, this)
            this.up(tClass)
        }

        this.ongoingTouches = [];
        this.draggedAsset=null;
    }

    down(touch: CTouch) {
        this.getConsidered(touch.touchDownRects).forEach(el => el.onMouseDown(this))
    }

    moveDown(touch: CTouch) {
        this.getConsidered(touch.touchDownRects).forEach(el => el.onMouseMoveDown(this))
    }

    up(touch: CTouch) {
        this.getConsidered(touch.touchDownRects).forEach(el => {
            
            el.onMouseUp(this);
        })
    }


    copyTouch({ identifier, clientX, clientY }: Touch): CTouch {
        return new CTouch(identifier, clientX, clientY, this);
    }

    ongoingTouchIndexById(idToFind: number) {
        for (var i = 0; i < this.ongoingTouches.length; i++) {
            var id = this.ongoingTouches[i].identifier;

            if (id == idToFind) {
                return i;
            }
        }
        return -1;    // not found
    }

    posOnRect(rect:Rect){
        return{x:this.mousePos.x-rect.gAbsEdges().left,y:this.mousePos.y-rect.gAbsEdges().top}
    }
}

export const mouseHandler = new MouseHandler();