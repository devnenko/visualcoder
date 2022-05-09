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

class Touch {
    pos;
    type;
    mouseHandler;
    //down;
    //topMostRect;
    constructor(pos: IPos, type: EMouseType, mouseHandler: MouseHandler) {
        this.pos = pos;
        this.type = type;
        this.mouseHandler = mouseHandler;
        //this.touchDownRects = mouseHandler.getOverlapping({ x: x, y: y });
        //this.topMostRect = mouseHandler.getTopMostRect(this.touchDownRects);
    }

}

class MouseHandler {

    currentTouch: Touch | null = null;
    isDown = false;

    subscribedRects: CLickableMixin[] = [];

    constructor() {
        window.addEventListener('mousedown', this.mouseDown.bind(this));
        window.addEventListener('mousemove', this.mouseMove.bind(this));
        window.addEventListener('mouseup', this.mouseUp.bind(this));
        window.addEventListener('touchstart', this.touchStart.bind(this), { passive: false });
        window.addEventListener('touchmove', this.touchMove.bind(this), { passive: false });
        window.addEventListener('touchend', this.touchEnd.bind(this), { passive: false });
        //
        //window.addEventListener('blur', this.visiChange.bind(this));
        //window.addEventListener('focus', this.visiChange.bind(this));


    }


    subscribe(object: CLickableMixin) {
        this.subscribedRects.push(object);
        //could be optimized here with dom-like checking
    }
    unsubscribe(object: CLickableMixin) {
        if (this.subscribedRects.indexOf(object) != -1) {
            this.subscribedRects.splice(this.subscribedRects.indexOf(object), 1);
        }
        else {
            console.error("unsubscription failed")
        }
    }

    isOverlapping(obj: CLickableMixin, screenPos: IPos) {
        const objEdges = obj.gAbsEdges();
        return objEdges.left < screenPos.x && objEdges.right > screenPos.x && objEdges.top < screenPos.y && objEdges.bottom > screenPos.y;
    }

    getOverlappingRects(pos: IPos) {
        let rects: CLickableMixin[] = [];

        for (const obj of this.subscribedRects) {
            const objEdges = obj.gAbsEdges();
            if (objEdges.left < pos.x && objEdges.right > pos.x && objEdges.top < pos.y && objEdges.bottom > pos.y) {
                //is overlapping$
                rects.push(obj);
            }
        }
        return rects;
    }
    getTopMostRect(overlap: CLickableMixin[]) {
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
    getAffectedRects(rects: CLickableMixin[]) {
        const consRects: CLickableMixin[] = [];
        const top = this.getTopMostRect(rects);
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

    //--------------------------------

    absToRelative(rect: Rect, pos: IPos) {
        return { x: pos.x - rect.gAbsEdges().left, y: pos.y - rect.gAbsEdges().top }
    }

    //--------------------------------

    private mouseEToTouch(e: MouseEvent) {
        const pos: IPos = { x: e.clientX, y: e.clientY }
        return new Touch(pos, EMouseType.left, this);
    }

    mouseDown(e: MouseEvent) {
        //e.preventDefault();
        this.down(this.mouseEToTouch(e));
    }
    mouseMove(e: MouseEvent) {
        //e.preventDefault();
        this.move({ x: e.clientX, y: e.clientY });
    }
    mouseUp(e: MouseEvent) {
        //e.preventDefault();
        this.up({ x: e.clientX, y: e.clientY });
    }

    //--------------------------------

    touchStart(e: TouchEvent) {
        e.preventDefault(); //disables long click select with canvas but also events from passing through to div

    }
    touchMove(e: TouchEvent) {
        //e.preventDefault();

    }
    touchEnd(e: TouchEvent) {
        //e.preventDefault();

    }

    //--------------------------------

    move(pos: IPos) {
        if (this.isDown == true) {
            this.moveDown(pos);
        }
    }

    //--------------------------------

    down(touch: Touch) {
        this.isDown = true;
        this.currentTouch = touch;
    }

    moveDown(pos: IPos) {
        if(this.currentTouch){
            this.currentTouch.pos=pos;
        }
    }

    up(pos: IPos) {
        this.isDown = false;
        if(this.currentTouch){
            this.currentTouch=null;
        }
    }
}

export const mouseHandler = new MouseHandler();