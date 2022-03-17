import { boundingRect } from "../ui/bounding_rect.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { Rect } from "../ui/rect.js";
import { colorCreator } from "../util/color.js";
export function MakeHoverPressButton(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.idleColor = colorCreator.colorByBrightness(40);
            this.hoverColor = colorCreator.colorByBrightness(70);
            this.pressColor = colorCreator.colorByBrightness(90);
            this.forgetOnMouseLeave = true;
            this.onPress = (mouseHandler) => { };
            this.onRelease = (mouseHandler) => { };
            this.color = this.idleColor;
            this.setConfigAttrs(args[0]);
        }
        addConfig(config) {
            super.addConfig(config);
        }
        setAttr(key, value) {
            if (key === "idleColor") {
                this.color = value;
            }
            super.setAttr(key, value);
        }
        onMouseHoverBegin(mouseHandler) {
            this.addConfig({
                color: this.hoverColor
            });
            super.onMouseHoverBegin(mouseHandler);
        }
        onMouseHoverEnd(mouseHandler) {
            this.addConfig({
                color: this.idleColor
            });
            super.onMouseHoverEnd(mouseHandler);
        }
        onMouseDown(mouseHandler) {
            this.addConfig({
                color: this.pressColor
            });
            this.onPress(mouseHandler);
            super.onMouseDown(mouseHandler);
        }
        onMouseMoveDown(mouseHandler) {
            super.onMouseMoveDown(mouseHandler);
        }
        onMouseUp(mouseHandler) {
            this.addConfig({
                color: this.idleColor
            });
            if (this.forgetOnMouseLeave == true && mouseHandler.isOverlapping(this) == false) {
            }
            else {
                this.onRelease(mouseHandler);
            }
            super.onMouseUp(mouseHandler);
        }
    };
}
export function MakeToggleButton(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.hoverColor = colorCreator.colorByBrightness(28);
            this.pressColor = colorCreator.colorByBrightness(70);
            this.onPress = (mouseHandler) => { };
            this.onRelease = (mouseHandler) => { };
            this.isToggleOn = false;
            this.onToggle = () => { };
            this.onGroupToggle = () => { };
            this.canClickToggleOf = true;
            this.assignedGroup = null;
            this.color = colorCreator.darkColorDef;
            this.idleColor = this.color;
            this.setConfigAttrs(args[0]);
        }
        addConfig(config) {
            super.addConfig(config);
        }
        toggle(newToggleState) {
            this.isToggleOn = newToggleState;
            if (this.isToggleOn == true) {
                this.addConfig({
                    color: this.pressColor
                });
            }
            else {
                this.addConfig({
                    color: this.idleColor
                });
                //because need to be hovering over in order to be able to do that anyway
            }
            this.onToggle(this.isToggleOn);
            this.onGroupToggle(this.isToggleOn);
            boundingRect.draw();
        }
        onMouseHoverBegin(mouseHandler) {
            if (this.isToggleOn == false) {
                this.addConfig({
                    color: this.hoverColor
                });
            }
        }
        onMouseHoverEnd(mouseHandler) {
            if (this.isToggleOn == false) {
                this.addConfig({
                    color: this.idleColor
                });
            }
        }
        onMouseDown(mouseHandler) {
            if (!(this.isToggleOn == true && this.canClickToggleOf == false)) {
                this.isToggleOn = !this.isToggleOn;
                this.toggle(this.isToggleOn);
            }
            this.onPress(mouseHandler);
        }
        onMouseUp(mouseHandler) {
            this.onRelease(mouseHandler);
        }
        destroy() {
            this.assignedGroup?.removeButton(this);
            super.destroy();
        }
    };
}
const DefClass1 = (MakeToggleButton(MakeClickable(Rect)));
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
    addButtons(buttons) {
        buttons.forEach(button => {
            this.buttons.push(button);
            button.assignedGroup = this;
            button.addConfig({
                canClickToggleOf: false
            });
            button.onGroupToggle = (newToggleState) => {
                if (newToggleState == true) {
                    this.currentToggled?.toggle(false);
                    this.currentToggled = button;
                }
            };
        });
    }
    removeButton(button) {
        this.buttons.slice(this.buttons.indexOf(button), 1);
    }
}
