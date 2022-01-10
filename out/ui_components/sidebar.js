import { Button } from "../ui/button.js";
import { Text } from "../ui/text.js";
import { VerticalBox } from "../ui/vertical_box.js";
import { ViewBlock } from "./view_block.js";
import { EConstraintsX, EConstraintsY } from '../ui/types/constraints.js';
import { BoundingRect } from "../ui/bounding_rect.js";
import { components } from "../main.js";
import { MouseHandler } from "../ui/event_handlers/mouse.js";
import { Block } from "../block.js";
import { EMouseType } from "../ui/types/mouse.js";
import { DeleteButton } from "./delete_button.js";
export class SideBarTab extends Button {
    constructor(parent, block) {
        super(parent, parent.canvas);
        this.parent = parent;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.top);
        this.setConstraintsInfo(undefined, { w: 0, h: 50 });
        this.color = block.color;
        this.origColor = block.color;
        this.block = block;
        const text = new Text(this, this.canvas);
        text.color = "black";
        text.text = block.name;
        const deleteButton = new DeleteButton(this, this.canvas, this.delete);
        deleteButton.setConstraints(EConstraintsX.right, EConstraintsY.scale);
        deleteButton.setConstraintsInfo({ x: 0, y: 0 }, { w: 50, h: 50 }, { top: 10, bottom: 10, left: 0, right: 10 });
        parent.addTab.arraymove(parent.children, parent.children.indexOf(this), parent.children.indexOf(this) - 1);
    }
    delete() {
        console.log("delete");
    }
    onMouseDown(type) {
        if (type == EMouseType.left) {
            //open the selected function
            if (this.parent.loadedTab != null) {
                this.parent.loadedTab.color = this.parent.loadedTab.origColor;
                components.view.save(this.parent.loadedTab.block);
            }
            this.parent.loadedTab = this;
            this.color = "green";
            components.view.load(this.block);
        }
        else if (type == EMouseType.right && this.parent.loadedTab != this && components.view.loadedBlock != null) {
            this.color = "red";
        }
        BoundingRect.drawHierarchy();
    }
    onMouseMoveDown(type) {
    }
    onMouseUp(type) {
        if (type == EMouseType.right && this.parent.loadedTab != this && components.view.loadedBlock != null) {
            this.color = this.origColor;
            BoundingRect.drawHierarchy();
            if (components.view.checkOverlapp(MouseHandler.currentPos)?.indexOf(components.view) != -1) {
                const viewBlock = new ViewBlock(components.view, MouseHandler.posOnRects(components.view));
                viewBlock.color = this.block.color;
                for (const pin of this.block.pins) {
                    viewBlock.addPin(pin);
                }
                BoundingRect.drawHierarchy();
            }
        }
    }
}
export class SideBarAddTab extends Button {
    constructor(parent) {
        super(parent, parent.canvas);
        this.parent = parent;
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
        return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
    }
    onMouseDown(type) {
        if (type == EMouseType.left) {
            new Block(this.getRandomColor(), "test1", true);
        }
        BoundingRect.drawHierarchy();
    }
    onMouseMoveDown(type) {
    }
    onMouseUp(type) {
        BoundingRect.drawHierarchy();
    }
}
export class SideBar extends VerticalBox {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.loadedTab = null;
        this.color = "darkgrey";
        this.setConstraints(EConstraintsX.left, EConstraintsY.scale);
        this.setConstraintsInfo(undefined, { w: 200, h: 0 });
        this.addTab = new SideBarAddTab(this);
    }
}
