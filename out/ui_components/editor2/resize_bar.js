import { Button } from "../../ui/button.js";
import { Rect } from "../../ui/rect.js";
import { EObjectType } from "../../ui/shape.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { MouseHandler } from "../../ui/event_handlers/mouse.js";
export class ResizeBar extends Button {
    constructor(drawParent, canvas, p1, p2) {
        super(drawParent, canvas);
        this.minSize = 40;
        this.p1 = p1;
        this.p2 = p2;
        this.fixedSize.w = 12;
        this.fixedSize.h = 12;
        if (p1.parent instanceof Rect) {
            if (p1.parent.type = EObjectType.HzBox) {
                this.fixedPos.x = p1.absEdges.right;
                this.setConstraints(EConstraintsX.left, EConstraintsY.scale);
            }
            else if (p1.parent.type = EObjectType.VtBox) {
                this.fixedPos.y = p1.absEdges.bottom;
                this.setConstraints(EConstraintsX.scale, EConstraintsY.top);
            }
        }
        this.color = "blue";
        this.isVisible = false;
    }
    onMouseHoverBegin(type, pos) {
        this.isVisible = true;
    }
    onMouseHoverEnd(type, pos) {
        this.isVisible = false;
    }
    onMouseDown(type, pos) {
        this.isVisible = true;
    }
    onMouseMoveDown(type, pos) {
        this.setPos(pos);
    }
    onMouseUp(type, pos) {
        this.isVisible = false;
    }
    setPos(pos) {
        if (this.p1.parent instanceof Rect) {
            if (this.p1.parent.type = EObjectType.HzBox) {
                if (pos.x - this.fixedSize.w / 2 > this.minSize && pos.x + this.fixedSize.w / 2 < window.innerWidth) {
                    this.fixedPos.x = pos.x - this.fixedSize.w / 2;
                    this.p1.fixedSize.w = MouseHandler.posOnRects(this.p1).x;
                    this.p1.fixedProportion = MouseHandler.posOnRects(this.p1.parent).x / this.p1.parent.getAbsSize().w * 100;
                }
            }
            else if (this.p1.parent.type = EObjectType.VtBox) {
                if (pos.y - this.fixedSize.h / 2 > this.minSize && pos.y + this.fixedSize.h / 2 < window.innerHeight) {
                    this.fixedPos.y = pos.y - this.fixedSize.h / 2;
                    this.p1.fixedSize.h = MouseHandler.posOnRects(this.p1).y;
                }
            }
        }
    }
    updatePos() {
        if (this.p1.parent instanceof Rect) {
            if (this.p1.parent.type = EObjectType.HzBox) {
                this.fixedPos.x = this.p1.absEdges.right - 6;
            }
            else if (this.p1.parent.type = EObjectType.VtBox) {
                this.fixedPos.y = this.p1.absEdges.bottom - 6;
            }
        }
    }
    drawHierarchy(parent) {
        super.drawHierarchy(parent);
        this.updatePos();
    }
}
