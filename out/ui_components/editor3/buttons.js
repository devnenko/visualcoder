import { Button } from "../../ui/button.js";
import { Text } from "../../ui/text.js";
export class HoverPressButton extends Button {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.origColor = "";
        this.onPress = () => { };
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
        this.onPress();
    }
}
export class ToggleButton extends Button {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.origColor = "";
        this.isOn = false;
        this.onToggle = () => { };
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
