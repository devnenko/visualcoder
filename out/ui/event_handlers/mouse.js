import { EMouseType } from "../types/mouse.js";
import { boundingShape } from "../ui.js";
export function isIMouseHandler(arg) {
    if (typeof arg.onMouseDown == 'function') {
        return true;
    }
    return false;
}
export class MouseHandler {
    static init() {
        //window.addEventListener('click', this.mouseClick.bind(this));
        window.addEventListener('touchstart', MouseHandler.touchDown.bind(this), { passive: false });
        window.addEventListener('touchmove', MouseHandler.touchMove.bind(this), { passive: false });
        window.addEventListener('touchend', MouseHandler.touchUp.bind(this), { passive: false });
        window.addEventListener('mousedown', MouseHandler.mouseDown.bind(this));
        window.addEventListener('mousemove', MouseHandler.mouseMove.bind(this));
        window.addEventListener('mouseup', MouseHandler.mouseUp.bind(this));
        document.getElementById("keyboardHack")?.addEventListener('focusout', MouseHandler.focuseOut.bind(this));
    }
    static subscribe(object) {
        this.callbackObjects.push(object);
        //create dom here stuff for later optimization with collision checking
    }
    static unsubscribe(object) {
        if (this.callbackObjects.indexOf(object) != -1) {
            this.callbackObjects.splice(this.callbackObjects.indexOf(object), 1);
        }
        else {
            console.log("unsubscription failed");
        }
    }
    static focuseOut() {
        MouseHandler.actifInputField?.toggle(false);
    }
    static getOverlapp(pos) {
        const mousePos = pos;
        let objs = [];
        for (const obj of this.callbackObjects) {
            if (obj.absEdges.left < mousePos.x && obj.absEdges.right > mousePos.x && obj.absEdges.top < mousePos.y && obj.absEdges.bottom > mousePos.y) {
                //is overlapping$
                objs.push(obj);
            }
        }
        return objs;
    }
    static touchDown(e) {
        e.preventDefault();
        this.down(EMouseType.touch, { x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
    static mouseDown(e) {
        this.down(e.button, { x: e.x, y: e.y });
    }
    static touchMove(e) {
        e.preventDefault();
        this.move(EMouseType.touch, { x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
    static mouseMove(e) {
        this.move(e.button, { x: e.x, y: e.y });
    }
    static touchUp(e) {
        e.preventDefault();
        this.up(EMouseType.touch, { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
    }
    static mouseUp(e) {
        this.up(e.button, { x: e.x, y: e.y });
    }
    static execIfAvailable(fn) {
        //if (typeof fn == 'function') { 
        //}
    }
    static down(e, pos) {
        this.isMouseDown = true;
        const overlObjs = this.getOverlapp(pos);
        const topMost = this.getTopMost(overlObjs);
        this.topMostSave = topMost;
        for (const overlObj of overlObjs) {
            if (typeof overlObj.onMouseDown == 'function') {
                if (!(overlObj.fireOnlyTopMost == true && overlObj != topMost[0])) {
                    overlObj.onMouseDown(e, pos, topMost.includes(overlObj));
                }
                //overlObj.onMouseDown(e,pos,topMost.includes(overlObj));
            }
            this.mouseDownRects.push(overlObj);
        }
        if (this.actifInputField != null) {
            if (!overlObjs.includes(this.actifInputField)) {
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
    static move(e, pos) {
        //this runs to slowly (probably topmost is to power intensive function or smething else)
        this.currentPos = pos;
        const overlObjs = this.getOverlapp(pos);
        let topMost = [];
        let topMostDone = false;
        if (this.isMouseDown == true) {
            for (const downRect of this.mouseDownRects) {
                if (typeof downRect.onMouseMoveDown == 'function') {
                    if (topMostDone == false) {
                        topMost = this.getTopMost(overlObjs);
                        topMostDone = true;
                    }
                    downRect.onMouseMoveDown(e, pos, this.topMostSave.includes(downRect));
                }
            }
        }
        else {
            for (const overlObj of overlObjs) {
                if (this.mouseHoverRects.includes(overlObj) == false) {
                    if (topMostDone == false) {
                        topMost = this.getTopMost(overlObjs);
                        topMostDone = true;
                    }
                    ;
                    if (overlObj.fireOnlyTopMost == true && overlObj == topMost[0]) {
                        if (typeof overlObj.onMouseHoverBegin == 'function') {
                            overlObj.onMouseHoverBegin(e, pos, topMost.includes(overlObj));
                        }
                        this.mouseHoverRects.push(overlObj);
                    }
                    if (overlObj.fireOnlyTopMost == false) {
                        if (typeof overlObj.onMouseHoverBegin == 'function') {
                            overlObj.onMouseHoverBegin(e, pos, topMost.includes(overlObj));
                        }
                        this.mouseHoverRects.push(overlObj);
                    }
                    for (const hoverObj of this.mouseHoverRects) {
                        //console.log(hoverObj!=topMost as any)
                        if (hoverObj.fireOnlyTopMost == true && hoverObj != topMost[0]) {
                            if (typeof hoverObj.onMouseHoverEnd == 'function') {
                                hoverObj.onMouseHoverEnd(e, pos, topMost.includes(hoverObj));
                            }
                            this.mouseHoverRects.splice(this.mouseHoverRects.indexOf(hoverObj), 1);
                        }
                    }
                }
            }
            for (const hoverObj of this.mouseHoverRects) {
                if (overlObjs.includes(hoverObj) == false) {
                    if (typeof hoverObj.onMouseHoverEnd == 'function') {
                        if (topMostDone == false) {
                            topMost = this.getTopMost(overlObjs);
                            topMostDone = true;
                        }
                        hoverObj.onMouseHoverEnd(e, pos, topMost.includes(hoverObj));
                    }
                    this.mouseHoverRects.splice(this.mouseHoverRects.indexOf(hoverObj), 1);
                }
            }
        }
        boundingShape.draw();
    }
    static up(e, pos) {
        this.currentPos = pos;
        this.isMouseDown = false;
        const overlObjs = this.getOverlapp(pos);
        const topMost = this.getTopMost(overlObjs);
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
        for (const mouseDownRect of this.mouseDownRects) {
            if (typeof mouseDownRect.onMouseUp == 'function') {
                mouseDownRect.onMouseUp(e, pos, topMost.includes(mouseDownRect));
            }
            if (e != EMouseType.touch) //check if not mobile
             {
                if (mouseDownRect.fireOnlyTopMost == true && mouseDownRect == topMost[0]) {
                    if (typeof mouseDownRect.onMouseHoverBegin == 'function') {
                        mouseDownRect.onMouseHoverBegin(e, pos, topMost.includes(mouseDownRect));
                    }
                }
            }
        }
        this.mouseDownRects.splice(0, this.mouseDownRects.length);
        boundingShape.draw();
    }
    static getMousePos() {
        return this.currentPos;
    }
    static getRelativeMousePos(rect, pos) {
        return { x: pos.x - rect.absEdges.left, y: pos.y - rect.absEdges.top };
    }
    static posOnRects(rect) {
        return { x: this.currentPos.x - rect.absEdges.left, y: this.currentPos.y - rect.absEdges.top };
    }
    static getTopMostObject(pos) {
        let overlapp = this.getOverlapp(pos);
        let topMost;
        for (const over of overlapp) {
        }
    }
    static distanceFromBoundingShape(shape) {
        let distanceFound = false;
        let distance = 0;
        let currentShape = shape;
        while (distanceFound == false) {
            distance++;
            if (currentShape.parent != undefined) {
                currentShape = currentShape.parent;
            }
            else {
                distanceFound = true;
            }
        }
        return distance - 1;
    }
    static getTopMost(rects) {
        let previousWinner = 0;
        let winnerRects = [];
        for (const rect of rects) {
            if (this.distanceFromBoundingShape(rect) > previousWinner) {
                previousWinner = this.distanceFromBoundingShape(rect);
                winnerRects.splice(0, winnerRects.length);
                winnerRects.push(rect);
            }
            else if (this.distanceFromBoundingShape(rect) == previousWinner) {
                winnerRects.push(rect);
            }
        }
        return winnerRects;
    }
}
MouseHandler.actifInputField = null;
MouseHandler.canvases = [];
MouseHandler.currentPos = { x: 0, y: 0 };
MouseHandler.mouseDownRects = [];
MouseHandler.mouseHoverRects = [];
MouseHandler.isMouseDown = false;
MouseHandler.topMostSave = [];
MouseHandler.callbackObjects = [];
