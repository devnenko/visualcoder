import { EObjectType } from "./shape.js";
import { EConstraintsX, EConstraintsY } from "./types/constraints.js";
export function instanceOfRectType(object) {
    return object.hasOwnProperty('absEdges');
}
export class Rect {
    constructor(parent, canvas) {
        this.discriminator1 = 'IShape';
        this.type = EObjectType.Normal;
        this.children = [];
        //additional display options 
        this.isVisible = true;
        this.color = "pink";
        //constraints for calculating absEdges in resize event
        this.constX = EConstraintsX.left;
        this.constY = EConstraintsY.top;
        this.fixedSize = { w: 100, h: 100 };
        this.fixedPos = { x: 0, y: 0 };
        this.snapOffset = { left: 0, right: 0, top: 0, bottom: 0 };
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
        this.parentSize = { left: 0, right: 0, top: 0, bottom: 0 };
        this.parentSize = parent.absEdges;
        parent.children.push(this); //set this as a child of parent to create an object tree
        this.parent = parent;
        this.canvas = canvas;
    }
    checkOverlapp(pos) {
        let all = [];
        for (const child of this.children) {
            all = all.concat(child.checkOverlapp(pos));
        }
        return all;
    }
    destroy() {
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        if (this.parent.children.indexOf(this) == -1) {
            console.log("error");
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
    draw() {
        if (this.isVisible == true) {
            const transform = this.edgesToDrawdimensions(this.absEdges);
            this.canvas.ctx.beginPath();
            this.canvas.ctx.rect(transform.pos.x, transform.pos.y, transform.size.w, transform.size.h);
            this.canvas.ctx.fillStyle = this.color;
            this.canvas.ctx.fill();
        }
    }
    drawHierarchy(parent) {
        if (instanceOfRectType(parent)) {
            this.resize(parent);
            this.draw();
            for (const child of this.children) {
                child.drawHierarchy(this);
            }
        }
        else {
            throw new Error('Shape cannot be parent of Rect.');
        }
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
        }
        else if (parent.type == EObjectType.HzBox) {
            const indexInParent = parent.children.indexOf(this);
            //console.log(indexInParent)
            this.absEdges.top = parent.absEdges.top;
            this.absEdges.bottom = parent.absEdges.bottom;
            if (parent.children[indexInParent - 1]) {
                this.absEdges.left = parent.children[indexInParent - 1].absEdges.right;
            }
            else {
                this.absEdges.left = parent.absEdges.left;
            }
            if (parent.children[indexInParent + 1] == null && this.constX == EConstraintsX.scale) {
                this.absEdges.right = parent.absEdges.right;
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
            if (parent.children[indexInParent - 1]) {
                this.absEdges.top = parent.children[indexInParent - 1].absEdges.bottom;
            }
            else {
                this.absEdges.top = parent.absEdges.top;
            }
            if (parent.children[indexInParent + 1] == null && this.constY == EConstraintsY.scale) {
                this.absEdges.bottom = parent.absEdges.bottom;
            }
            else {
                this.absEdges.bottom = this.absEdges.top + this.fixedSize.h;
            }
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
}
