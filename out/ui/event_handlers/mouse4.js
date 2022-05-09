import { boundingRect } from "../bounding_rect.js";
//for now mousehandler should only handle one touch event as if it was a mouse event and the only one on screen 
//implement multitouch later
export var EMouseType;
(function (EMouseType) {
    EMouseType[EMouseType["left"] = 0] = "left";
    EMouseType[EMouseType["middle"] = 1] = "middle";
    EMouseType[EMouseType["right"] = 2] = "right";
    EMouseType[EMouseType["touch"] = 3] = "touch";
})(EMouseType || (EMouseType = {}));
class Touch {
    //down;
    //topMostRect;
    constructor(pos, type, mouseHandler) {
        this.pos = pos;
        this.type = type;
        this.mouseHandler = mouseHandler;
        //this.touchDownRects = mouseHandler.getOverlapping({ x: x, y: y });
        //this.topMostRect = mouseHandler.getTopMostRect(this.touchDownRects);
    }
}
class MouseHandler {
    constructor() {
        this.currentTouch = null;
        this.isDown = false;
        this.subscribedRects = [];
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
    subscribe(object) {
        this.subscribedRects.push(object);
        //could be optimized here with dom-like checking
    }
    unsubscribe(object) {
        if (this.subscribedRects.indexOf(object) != -1) {
            this.subscribedRects.splice(this.subscribedRects.indexOf(object), 1);
        }
        else {
            console.error("unsubscription failed");
        }
    }
    isOverlapping(obj, screenPos) {
        const objEdges = obj.gAbsEdges();
        return objEdges.left < screenPos.x && objEdges.right > screenPos.x && objEdges.top < screenPos.y && objEdges.bottom > screenPos.y;
    }
    getOverlappingRects(pos) {
        let rects = [];
        for (const obj of this.subscribedRects) {
            const objEdges = obj.gAbsEdges();
            if (objEdges.left < pos.x && objEdges.right > pos.x && objEdges.top < pos.y && objEdges.bottom > pos.y) {
                //is overlapping$
                rects.push(obj);
            }
        }
        return rects;
    }
    getTopMostRect(overlap) {
        if (overlap.length == 0) {
            return null;
        }
        let winnerRect = overlap[0];
        for (const obj of overlap) {
            if (boundingRect.allShapes.indexOf(obj) > boundingRect.allShapes.indexOf(winnerRect)) {
                winnerRect = obj;
            }
        }
        return winnerRect;
    }
    getAffectedRects(rects) {
        const consRects = [];
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
    absToRelative(rect, pos) {
        return { x: pos.x - rect.gAbsEdges().left, y: pos.y - rect.gAbsEdges().top };
    }
    //--------------------------------
    mouseEToTouch(e) {
        const pos = { x: e.clientX, y: e.clientY };
        return new Touch(pos, EMouseType.left, this);
    }
    mouseDown(e) {
        //e.preventDefault();
        this.down(this.mouseEToTouch(e));
    }
    mouseMove(e) {
        //e.preventDefault();
        this.move({ x: e.clientX, y: e.clientY });
    }
    mouseUp(e) {
        //e.preventDefault();
        this.up({ x: e.clientX, y: e.clientY });
    }
    //--------------------------------
    touchStart(e) {
        e.preventDefault(); //disables long click select with canvas but also events from passing through to div
    }
    touchMove(e) {
        //e.preventDefault();
    }
    touchEnd(e) {
        //e.preventDefault();
    }
    //--------------------------------
    move(pos) {
        if (this.isDown == true) {
            this.moveDown(pos);
        }
    }
    //--------------------------------
    down(touch) {
        this.isDown = true;
        this.currentTouch = touch;
    }
    moveDown(pos) {
        if (this.currentTouch) {
            this.currentTouch.pos = pos;
        }
    }
    up(pos) {
        this.isDown = false;
        if (this.currentTouch) {
            this.currentTouch = null;
        }
    }
}
export const mouseHandler = new MouseHandler();
