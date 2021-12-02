import { Rect } from './rect.js';
export class HorizBox extends Rect {
    constructor(parent, canvas) {
        super(parent, canvas);
    }
    resize() {
        super.resize();
        var children = this.children;
        var previousChild = null;
        for (var currentchild of children) {
            if (previousChild != null) {
                currentchild.absEdges.left = previousChild.absEdges.right;
            }
            previousChild = currentchild;
        }
    }
    res() {
        super.resize();
        var previousChild = null;
        for (var currentchild of this.children) {
            if (previousChild != null) {
                currentchild.absEdges.left = previousChild.absEdges.right;
            }
            else {
                currentchild.absEdges.left = this.absEdges.left;
            }
            currentchild.absEdges.top = this.absEdges.top;
            currentchild.absEdges.bottom = this.absEdges.bottom;
            if (currentchild.stretchTo.right == true) {
                currentchild.absEdges.right = this.absEdges.right;
            }
            else {
                currentchild.absEdges.right = currentchild.fixedOffset.right;
            }
            currentchild.applyAbsPos();
            previousChild = currentchild;
        }
    }
}
