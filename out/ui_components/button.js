import { Rect, TextBox, colorCreator } from "../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/types.js";
import { Clickable } from "../ui/clickable.js";
import { boundingShape } from "../ui/bounding_rect.js";
export class HoverPressButton extends Clickable {
    constructor(config) {
        super();
        this.hoverColor = colorCreator.colorByBrightness(28);
        this.pressColor = colorCreator.colorByBrightness(70);
        this.title = null;
        this.icon = null;
        this.onPress = (type, pos, isTopMost) => { };
        this.onRelease = (type, pos, isTopMost) => { };
        this.constraintX = EConstraintsX.scale;
        this.constraintY = EConstraintsY.scale;
        this.color = colorCreator.darkColorDef;
        this.notPressedColor = this.color;
        this.setAttrs(config);
    }
    addConfig(config) {
        super.addConfig(config);
    }
    createTitle() {
        this.title = new TextBox();
        this.title.addConfig({
            parent: this,
            constraintX: EConstraintsX.center,
            constraintY: EConstraintsY.center,
            color: "white",
            size: 24,
        });
    }
    createIcon() {
        this.icon = new Rect();
        this.icon.addConfig({
            imageSrc: "trash.svg",
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            parent: this
        });
    }
    onMouseHoverBegin(type, pos, isTopMost) {
        this.color = this.hoverColor;
        super.onMouseHoverBegin(type, pos, isTopMost);
    }
    onMouseHoverEnd(type, pos, isTopMost) {
        this.color = this.notPressedColor;
        super.onMouseHoverEnd(type, pos, isTopMost);
    }
    onMouseDown(type, pos, isTopMost) {
        this.color = this.pressColor;
        this.onPress(type, pos, isTopMost);
        super.onMouseDown(type, pos, isTopMost);
    }
    onMouseMoveDown(type, pos, isTopMost) {
        super.onMouseMoveDown(type, pos, isTopMost);
    }
    onMouseUp(type, pos, isTopMost) {
        this.color = this.notPressedColor;
        this.onRelease(type, pos, isTopMost);
        super.onMouseUp(type, pos, isTopMost);
    }
}
export class ToggleButton extends HoverPressButton {
    constructor(config) {
        super();
        this.isOn = false;
        this.onToggle = () => { };
        this.onToggle2 = () => { };
        this.canClickToggleOf = true;
        this.group = null;
        this.onMouseHoverBegin = (type, pos, isTopMost) => {
            if (this.isOn == false) {
                this.color = this.hoverColor;
            }
            //super.onMouseHoverBegin(type,pos,isTopMost);
        };
        this.onMouseHoverEnd = (type, pos, isTopMost) => {
            if (this.isOn == false) {
                this.color = this.notPressedColor;
            }
            //super.onMouseHoverEnd(type,pos,isTopMost);
        };
        this.onMouseDown = (type, pos, isTopMost) => {
            if (!(this.isOn == true && this.canClickToggleOf == false)) {
                this.isOn = !this.isOn;
                this.toggle(this.isOn);
            }
            this.onPress(type, pos, isTopMost);
            //super.onMouseDown(type,pos,isTopMost);
        };
        this.setAttrs(config);
    }
    addConfig(config) {
        super.addConfig(config);
    }
    toggle(onOrOff) {
        this.isOn = onOrOff;
        if (onOrOff == true) {
            this.color = this.pressColor;
        }
        else {
            this.color = this.notPressedColor;
            //because need to be hovering over in order to be able to do that anyway
        }
        this.onToggle(this.isOn);
        this.onToggle2(this.isOn);
        boundingShape.draw();
    }
    onMouseMoveDown(type, pos, isTopMost) {
        //super.onMouseMoveDown(type,pos,isTopMost);
    }
    onMouseUp(type, pos, isTopMost) {
        //super.onMouseUp(type,pos,isTopMost);
    }
    destroy() {
        this.group?.removeButton(this);
        super.destroy();
    }
}
export class ToggleButtonGroup {
    constructor() {
        this.buttons = [];
        this.currentToggled = null;
    }
    setCurrentToggled(button) {
        if (this.currentToggled != button) {
            button.toggle(true);
        }
    }
    addButton(button) {
        this.buttons.push(button);
        button.group = this;
        button.addConfig({
            canClickToggleOf: false,
        });
        button.onToggle2 = (isOn) => {
            if (isOn) {
                this.currentToggled?.toggle(false);
                this.currentToggled = button;
            }
        };
    }
    removeButton(button) {
        console.log(this.buttons.indexOf(button));
        this.buttons.slice(this.buttons.indexOf(button), 1);
    }
}
