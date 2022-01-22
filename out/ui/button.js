import { Rect } from "./rect.js";
export class Button extends Rect {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.discriminator2 = 'IMouseEvents';
    }
    overlappHierarchy(pos) {
        let all = [];
        if (this.absEdges.left < pos.x && this.absEdges.right > pos.x && this.absEdges.top < pos.y && this.absEdges.bottom > pos.y) {
            all.push(this);
        }
        for (const child of this.children) {
            all = all.concat(child.overlappHierarchy(pos));
        }
        //all=all.slice().reverse();
        return all;
    }
    onMouseDown(type, pos) {
        //throw new Error('Method not implemented.');
    }
    onMouseMoveDown(type, pos) {
        //throw new Error('Method not implemented.');
    }
    onMouseUp(type, pos) {
        //throw new Error('Method not implemented.');
    }
    onMouseHoverBegin(type, pos) {
        //throw new Error('Method not implemented.');
    }
    onMouseHoverEnd(type, pos) {
        //throw new Error('Method not implemented.');
    }
}
