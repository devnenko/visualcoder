import { colorCreator } from "../ui/color.js";
import { MouseHandler } from "../ui/event_handlers/mouse.js";
import { Rect } from "../ui/rect.js";
import { Text } from "../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
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
        this.onCLick(type, pos);
    }
    onMouseUp(type, pos) {
        this.color = this.origColor;
    }
}
export class DefaultHoverPressButton extends HoverPressButton {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.fixedSize.w = 60;
        this.fixedSize.h = 60;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.setOrigColor(colorCreator.colorByBrightness(30));
        this.hoverColor = colorCreator.colorByBrightness(45);
        this.pressColor = colorCreator.colorByBrightness(80);
        this.title = new Text(this, this.canvas);
        this.title.color = "white";
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
