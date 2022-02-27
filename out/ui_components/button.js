import { Rect, TextBox, colorCreator } from "../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/types.js";
import { Clickable } from "../ui/clickable.js";
import { boundingShape } from "../ui/bounding_rect.js";
export class HoverPressButton extends Clickable {
    constructor() {
        super();
        this.hoverColor = colorCreator.colorByBrightness(28);
        this.pressColor = colorCreator.colorByBrightness(70);
        this.title = null;
        this.icon = null;
        this.onPress = (type, pos, isTopMost) => { };
        this.onRelease = (type, pos, isTopMost) => { };
        //if(hasTitle){
        //    this.title = new TextBox();
        //    this.title.createConfig({
        //        parent:this,
        //        constraintX:EConstraintsX.center,
        //        constraintY:EConstraintsY.center,
        //        color:"white",
        //        size:24,
        //    });
        //}
        this.constraintX = EConstraintsX.scale;
        this.constraintY = EConstraintsY.scale;
        this.color = colorCreator.darkColorDef;
        this.notPressedColor = this.color;
        //this.text.text = "";
    }
    createTitle() {
        this.title = new TextBox();
        this.title.createConfig({
            parent: this,
            constraintX: EConstraintsX.center,
            constraintY: EConstraintsY.center,
            color: "white",
            size: 24,
        });
    }
    createIcon() {
        this.icon = new Rect();
        this.icon.createConfig({
            imageSrc: "trash.svg",
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            parent: this
        });
    }
    createConfig(opts) {
        this.addConfig(opts);
    }
    onMouseHoverBegin(type, pos, isTopMost) {
        this.color = this.hoverColor;
    }
    onMouseHoverEnd(type, pos, isTopMost) {
        this.color = this.notPressedColor;
        console.log("end");
    }
    onMouseDown(type, pos, isTopMost) {
        this.color = this.pressColor;
        this.onPress(type, pos, isTopMost);
    }
    onMouseMoveDown(type, pos, isTopMost) {
    }
    onMouseUp(type, pos, isTopMost) {
        this.color = this.notPressedColor;
        this.onRelease(type, pos, isTopMost);
    }
}
export class ToggleButton extends HoverPressButton {
    constructor() {
        super();
        this.isOn = false;
        this.onToggle = () => { };
        this.canClickToggleOf = true;
        this.onMouseHoverBegin = (type, pos, isTopMost) => {
            if (this.isOn == false) {
                this.color = this.hoverColor;
            }
        };
        this.onMouseHoverEnd = (type, pos, isTopMost) => {
            if (this.isOn == false) {
                this.color = this.notPressedColor;
            }
        };
        this.onMouseDown = (type, pos, isTopMost) => {
            if (!(this.isOn == true && this.canClickToggleOf == false)) {
                this.isOn = !this.isOn;
                this.toggle(this.isOn);
            }
            this.onPress(type, pos, isTopMost);
        };
        this.onMouseUp = () => {
        };
    }
    createConfig(opts) {
        this.addConfig(opts);
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
        boundingShape.draw();
    }
}
