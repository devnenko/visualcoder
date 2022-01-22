import { Button } from "../../../ui/button.js";
import { Text } from "../../../ui/text.js";
import { EConstraintsX, EConstraintsY } from '../../../ui/types/constraints.js';
import { BoundingRect } from "../../../ui/bounding_shape.js";
import { Block } from "../view/block.js";
import { EMouseType } from "../../../ui/types/mouse.js";
export class SideBarAddTab extends Button {
    constructor(parent) {
        super(parent, parent.canvas);
        this.parent2 = parent;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.top);
        this.setConstraintsInfo(undefined, { w: 0, h: 50 });
        this.color = "blue";
        this.origColor = "blue";
        const text = new Text(this, this.canvas);
        text.color = "black";
        text.text = "add tab";
    }
    arraymove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
    getRandomColor() {
        return Math.floor(Math.random() * 16777215).toString(16);
    }
    onMouseDown(type) {
        if (type == EMouseType.left) {
            new Block(this.getRandomColor(), "test1");
        }
        BoundingRect.drawHierarchy();
    }
    onMouseMoveDown(type) {
    }
    onMouseUp(type) {
        BoundingRect.drawHierarchy();
    }
}
