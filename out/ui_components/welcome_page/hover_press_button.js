import { BoundingRect, Button, Text } from "../../ui/ui.js";
export class HoverPressButton extends Button {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.origColor = "";
        this.hoverColor = this.color;
        this.pressColor = this.color;
        this.text = new Text(this, this.canvas);
        this.text.text = "";
    }
    onMouseHoverBegin(type) {
        this.origColor = this.color;
        this.color = this.hoverColor;
        BoundingRect.drawHierarchy();
    }
    onMouseHoverEnd(type) {
        this.color = this.origColor;
        BoundingRect.drawHierarchy();
    }
    onMouseDown(type) {
        this.color = this.pressColor;
        BoundingRect.drawHierarchy();
    }
    onMouseUp(type) {
        this.color = this.origColor;
        BoundingRect.drawHierarchy();
    }
}
