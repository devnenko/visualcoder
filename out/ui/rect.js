import { isIMouseHandler, MouseHandler } from "./event_handlers/mouse.js";
import { EObjectType, Shape, boundingShape } from "./shape.js";
import { EConstraintsX, EConstraintsY } from "./types/constraints.js";
//export function instanceOfRectType(object: any): object is RectType {
//    return object.hasOwnProperty('absEdges');
//}
export class Rect extends Shape {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.type = EObjectType.Normal;
        //additional display options 
        this.isVisible = true;
        this.color = "pink";
        //constraints for calculating absEdges in resize event
        this.constX = EConstraintsX.left;
        this.constY = EConstraintsY.top;
        this.fixedSize = { w: 100, h: 100 };
        this.fixedPos = { x: 0, y: 0 };
        this.snapOffset = { left: 0, right: 0, top: 0, bottom: 0 };
        this.margin = 0;
        this.fixedProportion = { x: 100, y: 100 }; //number between 0 and 100 for fixed proportions
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
        this.parentSize = { left: 0, right: 0, top: 0, bottom: 0 };
        if (parent instanceof Rect) {
            this.parentSize = parent.absEdges;
        }
    }
    setConstraints(constX, constY) {
        this.constX = constX;
        this.constY = constY;
    }
    setConstraintsInfo(fixedPos, fixedSize, snapOffset) {
        if (fixedPos) {
            this.fixedPos = fixedPos;
        }
        if (fixedSize) {
            this.fixedSize = fixedSize;
        }
        if (snapOffset) {
            this.snapOffset = snapOffset;
        }
    }
    drawHierarchy(parent) {
        if (parent instanceof Rect || typeof boundingShape) {
            this.resize(parent);
            this.draw();
            for (const child of this.children) {
                child.drawHierarchy(this);
            }
        }
        else {
            //this.resize(parent.parent as Rect);
            //this.draw();
            for (const child of this.children) {
                child.drawHierarchy(this);
            }
        }
    }
    setParent(parent, index) {
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        if (index) {
            parent.children.splice(index, 0, this);
        }
        else {
            parent.children.push(this);
        }
        this.parent = parent;
        boundingShape.drawHierarchy();
    }
    destroyHierarchy() {
        //console.log(this)
        if (isIMouseHandler(this)) {
            //console.log("unsub")
            //console.log(this)
            MouseHandler.unsubscribe(this);
        }
        super.destroyHierarchy();
    }
    resize(parent) {
        if (parent.type == EObjectType.Normal) {
            const parentSize = parent.absEdges;
            if (this.constX == EConstraintsX.left) {
                this.absEdges.left = parentSize.left + this.snapOffset.left + this.fixedPos.x;
                this.absEdges.right = this.absEdges.left + this.fixedSize.w;
            }
            else if (this.constX == EConstraintsX.right) {
                this.absEdges.right = parentSize.right - this.snapOffset.right + this.fixedPos.x + this.fixedPos.x;
                this.absEdges.left = this.absEdges.right - this.fixedSize.w;
            }
            else if (this.constX == EConstraintsX.center) {
                this.absEdges.left = parentSize.left + (parentSize.right - parentSize.left) / 2 - this.fixedSize.w / 2 + this.fixedPos.x;
                this.absEdges.right = parentSize.left + (parentSize.right - parentSize.left) / 2 + this.fixedSize.w / 2 + this.fixedPos.x;
            }
            else if (this.constX == EConstraintsX.scale) {
                this.absEdges.left = parentSize.left + this.snapOffset.left;
                this.absEdges.right = parentSize.right - this.snapOffset.right;
            }
            if (this.constY == EConstraintsY.top) {
                this.absEdges.top = parentSize.top + this.snapOffset.top + this.fixedPos.y;
                this.absEdges.bottom = this.absEdges.top + this.fixedSize.h;
            }
            else if (this.constY == EConstraintsY.bottom) {
                this.absEdges.bottom = parentSize.bottom - this.snapOffset.bottom + this.fixedPos.y;
                this.absEdges.top = this.absEdges.bottom - this.fixedSize.h;
            }
            else if (this.constY == EConstraintsY.center) {
                this.absEdges.top = parentSize.top + (parentSize.bottom - parentSize.top) / 2 - this.fixedSize.h / 2 + this.fixedPos.y;
                this.absEdges.bottom = parentSize.top + (parentSize.bottom - parentSize.top) / 2 + this.fixedSize.h / 2 + this.fixedPos.y;
            }
            else if (this.constY == EConstraintsY.scale) {
                this.absEdges.top = parentSize.top + this.snapOffset.top;
                this.absEdges.bottom = parentSize.bottom - this.snapOffset.bottom;
            }
            if (this.absEdges.left < parent.absEdges.left) {
                this.absEdges.left = parent.absEdges.left;
            }
            if (this.absEdges.right > parent.absEdges.right) {
                this.absEdges.right = parent.absEdges.right;
            }
            if (this.absEdges.top < parent.absEdges.top) {
                this.absEdges.top = parent.absEdges.top;
            }
            if (this.absEdges.bottom > parent.absEdges.bottom) {
                this.absEdges.bottom = parent.absEdges.bottom;
            }
        }
        else if (parent.type == EObjectType.HzBox) {
            const indexInParent = parent.children.indexOf(this);
            //console.log(indexInParent)
            this.absEdges.top = parent.absEdges.top;
            this.absEdges.bottom = parent.absEdges.bottom;
            if (parent.children[indexInParent - 1]) //is not first element
             {
                this.absEdges.left = parent.children[indexInParent - 1].absEdges.right;
            }
            else //is first element
             {
                this.absEdges.left = parent.absEdges.left;
            }
            if (this.constX == EConstraintsX.scale && parent.children[indexInParent + 1] == null) {
                this.absEdges.right = parent.absEdges.right;
            }
            else if (this.constX == EConstraintsX.scale) {
                this.absEdges.right = this.absEdges.left + (parent.getAbsSize().w) * this.fixedProportion.x / 100;
            }
            else {
                this.absEdges.right = this.absEdges.left + this.fixedSize.w;
            }
        }
        else if (parent.type == EObjectType.VtBox) {
            const indexInParent = parent.children.indexOf(this);
            //console.log(indexInParent)
            this.absEdges.left = parent.absEdges.left;
            this.absEdges.right = parent.absEdges.right;
            if (parent.children[indexInParent - 1]) //is not first element
             {
                this.absEdges.top = parent.children[indexInParent - 1].absEdges.bottom;
            }
            else //is first element
             {
                this.absEdges.top = parent.absEdges.top;
            }
            if (this.constY == EConstraintsY.scale && parent.children[indexInParent + 1] == null) {
                this.absEdges.bottom = parent.absEdges.bottom;
            }
            else if (this.constY == EConstraintsY.scale) {
                this.absEdges.bottom = this.absEdges.top + (parent.getAbsSize().h) * this.fixedProportion.y / 100;
            }
            else {
                this.absEdges.bottom = this.absEdges.top + this.fixedSize.h;
            }
        }
        this.absEdges.left += this.margin;
        this.absEdges.right -= this.margin;
        this.absEdges.top += this.margin;
        this.absEdges.bottom -= this.margin;
    }
    draw() {
        if (this.isVisible == true) {
            const transform = this.edgesToDrawdimensions(this.absEdges);
            this.canvas.ctx.beginPath();
            this.canvas.ctx.rect(Math.floor(transform.pos.x), Math.floor(transform.pos.y), Math.floor(transform.size.w), Math.floor(transform.size.h));
            this.canvas.ctx.fillStyle = this.color;
            this.canvas.ctx.fill();
        }
    }
    edgesToDrawdimensions(edges) {
        //convert absolute edges to position and size
        let res = { pos: { x: 0, y: 0 }, size: { w: 0, h: 0 } };
        res.pos.x = edges.left;
        res.pos.y = edges.top;
        res.size.w = edges.right - edges.left;
        res.size.h = edges.bottom - edges.top;
        return res;
    }
    getAbsSize() {
        return { w: this.absEdges.right - this.absEdges.left, h: this.absEdges.bottom - this.absEdges.top };
    }
}
