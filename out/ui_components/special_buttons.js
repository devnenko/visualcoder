import { MouseHandler } from "../ui/event_handlers/mouse.js";
import { Rect } from "../ui/rect.js";
import { Text } from "../ui/text.js";
export class HoverPressButton extends Rect {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.origColor = "";
        this.onCLick = () => { };
        MouseHandler.subscribe(this);
        this.hoverColor = this.color;
        this.pressColor = this.color;
        this.text = new Text(this, this.canvas);
        this.text.text = "";
    }
    setOrigColor(origColor) {
        this.color = origColor;
        this.origColor = this.color;
    }
    onMouseHoverBegin(type, pos) {
        this.origColor = this.color;
        this.color = this.hoverColor;
    }
    onMouseHoverEnd(type, pos) {
        this.color = this.origColor;
    }
    onMouseDown(type, pos) {
        this.color = this.pressColor;
    }
    onMouseUp(type, pos) {
        this.color = this.origColor;
        this.onCLick();
    }
}
export class ToggleButton extends Rect {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.origColor = "";
        this.isOn = false;
        this.onToggle = () => { };
        MouseHandler.subscribe(this);
        this.hoverColor = this.color;
        this.pressColor = this.color;
        this.text = new Text(this, this.canvas);
        this.text.text = "";
    }
    setOrigColor(origColor) {
        this.color = origColor;
        this.origColor = this.color;
    }
    onMouseHoverBegin(type) {
        if (this.isOn == false) {
            this.color = this.hoverColor;
        }
    }
    onMouseHoverEnd(type) {
        if (this.isOn == false) {
            this.color = this.origColor;
        }
    }
    toggle(value) {
        if (value == true) {
            this.color = this.pressColor;
        }
        else {
            this.color = this.origColor;
        }
        this.isOn = value;
        this.onToggle();
    }
    onMouseDown(type) {
        if (this.isOn == false) {
            this.color = this.pressColor;
        }
        else {
            this.color = this.origColor;
        }
        this.isOn = !this.isOn;
        this.onToggle();
    }
}
