import { Rect } from "./rect.js";
export class Button extends Rect {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.discIMouseEvents = 'IMouseEvents';
    }
    checkOverlapp(pos) {
        let all = [];
        if (this.absEdges.left < pos.x && this.absEdges.right > pos.x && this.absEdges.top < pos.y && this.absEdges.bottom > pos.y) {
            all.push(this);
        }
        for (const child of this.children) {
            all = all.concat(child.checkOverlapp(pos));
        }
        //all=all.slice().reverse();
        return all;
    }
    onMouseDown(type) {
        //throw new Error('Method not implemented.');
    }
    onMouseMoveDown(type) {
        //throw new Error('Method not implemented.');
    }
    onMouseUp(type) {
        //throw new Error('Method not implemented.');
    }
    onMouseHoverBegin(type) {
        //throw new Error('Method not implemented.');
    }
    onMouseHoverEnd(type) {
        //throw new Error('Method not implemented.');
    }
}
