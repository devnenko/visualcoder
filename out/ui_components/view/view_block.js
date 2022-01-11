import { components } from "../../main.js";
import { BoundingRect } from "../../ui/bounding_rect.js";
import { Button } from "../../ui/button.js";
import { MouseHandler } from "../../ui/event_handlers/mouse.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { Text } from "../../ui/text.js";
import { Line } from "../../ui/line.js";
export var PinType;
(function (PinType) {
    PinType[PinType["in"] = 0] = "in";
    PinType[PinType["out"] = 1] = "out";
})(PinType || (PinType = {}));
class Pin extends Button {
    constructor(block, pinType, amountPins) {
        super(block, block.canvas);
        this.mouseEdge = null;
        this.provLine = null;
        this.color = "red";
        if (pinType == PinType.in) {
            this.setConstraints(EConstraintsX.left, EConstraintsY.top);
            this.snapOffset.left = 10;
        }
        else {
            this.setConstraints(EConstraintsX.right, EConstraintsY.top);
            this.snapOffset.right = 10;
        }
        this.snapOffset.top = 10 + amountPins * 30;
        this.fixedSize.w = 20;
        this.fixedSize.h = 20;
    }
    onMouseDown(type) {
        this.provLine = new Line(BoundingRect, components.view.canvas);
        this.provLine.obj1 = this;
        this.provLine.fixedPos2 = MouseHandler.currentPos;
        BoundingRect.drawHierarchy();
    }
    ;
    onMouseMoveDown(type) {
        if (this.provLine != null) {
            this.provLine.fixedPos2 = MouseHandler.currentPos;
            BoundingRect.drawHierarchy();
            console.log("yes");
            console.log(this.provLine);
        }
    }
    ;
    onMouseUp(type) {
        console.log(BoundingRect.checkOverlapp(MouseHandler.currentPos));
        if (BoundingRect.checkOverlapp(MouseHandler.currentPos)[0] instanceof Pin) {
            if (this.provLine != null) {
                this.provLine.obj2 = BoundingRect.checkOverlapp(MouseHandler.currentPos)[0];
                BoundingRect.drawHierarchy();
            }
        }
        else {
            //if(this.provLine!=null){
            //    const index = components.view.children.indexOf(this.provLine);
            //    components.view.children.splice(index, 1);
            //    BoundingRect.update();
        }
    }
}
;
export class ViewBlock extends Button {
    constructor(view, pos, block) {
        super(view, view.canvas);
        this.mouseOffset = { leftDist: 0, topDist: 0 };
        this.pins = [];
        this.amountInPins = 0;
        this.amountOutPins = 0;
        this.block = block;
        this.color = block.color;
        this.setConstraints(EConstraintsX.left, EConstraintsY.top);
        this.setConstraintsInfo(undefined, { w: 200, h: 140 });
        this.fixedPos = pos;
        const text = new Text(this, this.canvas);
        text.color = "black";
        text.text = block.name;
        this.children.push(text);
        for (const pin of this.block.pins) {
            this.addPin(pin);
        }
    }
    onMouseDown(type) {
        this.mouseOffset = { leftDist: MouseHandler.getMousePos().x - this.absEdges.left, topDist: MouseHandler.getMousePos().y - this.absEdges.top };
    }
    ;
    onMouseMoveDown(type) {
        this.fixedPos.x = MouseHandler.getRelativeMousePos(components.view).x - this.mouseOffset.leftDist;
        this.fixedPos.y = MouseHandler.getRelativeMousePos(components.view).y - this.mouseOffset.topDist;
        BoundingRect.drawHierarchy();
    }
    ;
    onMouseUp(type) {
    }
    ;
    addPin(pinType) {
        if (pinType == PinType.in) {
            this.pins.push(new Pin(this, pinType, this.amountInPins));
            this.amountInPins++;
        }
        else {
            this.pins.push(new Pin(this, pinType, this.amountOutPins));
            this.amountOutPins++;
        }
    }
}
