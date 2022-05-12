import { boundingRect } from "../bounding_rect.js";
import { Rect } from "../rect.js";
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
    //topMostRect;
    constructor(pos, type, mouseHandler) {
        this.pos = pos;
        this.type = type;
        this.downRects = mouseHandler.getAffectedRects(pos);
        //this.touchDownRects = mouseHandler.getOverlapping({ x: x, y: y });
        //this.topMostRect = mouseHandler.getTopMostRect(this.touchDownRects);
    }
}
export class MouseHandler {
    constructor() {
        this.currentTouch = null;
        this.isDown = false;
        this.hoveredRects = [];
        this.draggedAsset = null;
        this.assetRect = null;
        this.isValidDrag = false;
        this.subscribedRects = [];
        this.dragInRects = [];
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
    subscribeDrag(object) {
        this.dragInRects.push(object);
    }
    unsubscribeDrag(object) {
        if (this.dragInRects.indexOf(object) != -1) {
            this.dragInRects.splice(this.dragInRects.indexOf(object), 1);
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
    getAffectedRects(pos) {
        const rects = this.getOverlappingRects(pos);
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
    touchEToTouch(e) {
        const pos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        return new Touch(pos, EMouseType.touch, this);
    }
    touchStart(e) {
        e.preventDefault(); //disables long click select with canvas but also events from passing through to div
        this.down(this.touchEToTouch(e));
        //if(e.changedTouches[0].identifier==0){
        //}
    }
    touchMove(e) {
        //e.preventDefault();
        this.move({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
    touchEnd(e) {
        //e.preventDefault();
        if (this.currentTouch) {
            this.up(this.currentTouch.pos);
        }
    }
    //--------------------------------
    move(pos) {
        if (this.isDown == true) {
            this.moveDown(pos);
        }
        else {
            this.moveUp(pos);
        }
    }
    //--------------------------------
    down(touch) {
        this.isDown = true;
        this.currentTouch = touch;
        touch.downRects.forEach(el => {
            el.onMouseDown(this);
        });
    }
    moveUp(pos) {
        const overlRects = this.getAffectedRects(pos);
        //add any newly-overlapping rects
        overlRects.forEach(overl => {
            if (this.hoveredRects.includes(overl) == false) {
                this.hoveredRects.push(overl);
                overl.onMouseHoverBegin(this);
            }
        });
        //remove not-overlapping-anymore rects
        this.hoveredRects.forEach(hover => {
            if (overlRects.includes(hover) == false) {
                this.hoveredRects.splice(this.hoveredRects.indexOf(hover), 1);
                hover.onMouseHoverEnd(this);
            }
        });
    }
    moveDown(pos) {
        if (this.currentTouch) {
            this.currentTouch.pos = pos;
        }
        this.currentTouch?.downRects.forEach(el => {
            el.onMouseMoveDown(this);
        });
        if (this.draggedAsset != null) {
            if (this.assetRect == null) {
                this.assetRect = new Rect;
                this.assetRect.sZIndex(100)
                    .sColor("red"); //red == not droppable here
                this.isValidDrag = false;
            }
            this.assetRect.sFixedOffsetX(pos.x);
            this.assetRect.sFixedOffsetY(pos.y);
            let overl;
            this.dragInRects.forEach(el => {
                if (this.isOverlapping(el, pos)) {
                    overl = el;
                }
            });
            if (overl) {
                if (overl.acceptedTypes.includes(this.draggedAsset.type)) {
                    this.assetRect.sColor("green");
                    this.isValidDrag = true;
                }
            }
            else {
                this.assetRect.sColor("red");
                this.isValidDrag = false;
            }
            boundingRect.draw();
        }
    }
    up(pos) {
        this.isDown = false;
        if (this.currentTouch) {
            this.currentTouch.downRects.forEach(el => {
                el.onMouseUp(this);
            });
            this.currentTouch = null;
        }
        let overl;
        this.dragInRects.forEach(el => {
            if (this.isOverlapping(el, pos)) {
                overl = el;
            }
        });
        if (overl && this.draggedAsset) {
            if (overl.acceptedTypes.includes(this.draggedAsset.type)) {
                overl.onDrag(this.draggedAsset);
            }
        }
        this.assetRect?.destroy();
        this.assetRect = null;
        this.draggedAsset = null;
    }
}
export const mouseHandler = new MouseHandler();
