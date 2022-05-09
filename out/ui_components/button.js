import { boundingRect } from "../ui/bounding_rect.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { EConstraintsX, EConstraintsY, Rect } from "../ui/rect.js";
import { colorCreator } from "../util/color.js";
import { TextRect } from "../ui/text_rect.js";
export function MakeHoverPressButton(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.idleColor = colorCreator.colorByBrightness(40);
            this.hoverColor = colorCreator.colorByBrightness(70);
            this.pressColor = colorCreator.colorByBrightness(90);
            this.onPress = (mouseHandler) => { };
            this.onMovePressed = (mouseHandler) => { };
            this.onRelease = (mouseHandler) => { };
            this.sColor(this.idleColor);
        }
        addText() {
            const t = new TextRect();
            t.sParent(this)
                .sConsts(EConstraintsX.center, EConstraintsY.center);
            return t;
        }
        //sForgetOnLeave(forget:boolean){
        //    this.forgetOnMouseLeave=forget;
        //    return this;
        //}
        onMouseHoverBegin(mouseHandler) {
            this.sColor(this.hoverColor);
            boundingRect.draw();
            //document.body.style.cursor = "pointer";
            super.onMouseHoverBegin(mouseHandler);
        }
        onMouseHoverEnd(mouseHandler) {
            this.sColor(this.idleColor);
            boundingRect.draw();
            //document.body.style.cursor = "default";
            super.onMouseHoverEnd(mouseHandler);
        }
        onMouseDown(mouseHandler) {
            this.sColor(this.pressColor);
            boundingRect.draw();
            this.onPress(mouseHandler);
            super.onMouseDown(mouseHandler);
        }
        onMouseMoveDown(mouseHandler) {
            this.onMovePressed(mouseHandler);
            super.onMouseMoveDown(mouseHandler);
        }
        onMouseUp(mouseHandler) {
            this.sColor(this.idleColor);
            boundingRect.draw();
            this.onRelease(mouseHandler);
            //document.body.style.cursor = "default";
            super.onMouseUp(mouseHandler);
        }
    };
}
export function MakeToggleButton(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.idleColor = colorCreator.colorByBrightness(40);
            this.hoverColor = colorCreator.colorByBrightness(70);
            this.pressColor = colorCreator.colorByBrightness(90);
            this.onPress = (mouseHandler) => { };
            this.onRelease = (mouseHandler) => { };
            this.isToggleOn = false;
            this.onToggle = () => { };
            this.onGroupToggle = () => { };
            this.canClickToggleOf = true;
            this.assignedGroup = null;
            this.sColor(this.idleColor);
        }
        addText() {
            const t = new TextRect();
            t.sParent(this)
                .sConsts(EConstraintsX.center, EConstraintsY.center);
            return t;
        }
        toggle(newToggleState) {
            this.isToggleOn = newToggleState;
            if (this.isToggleOn == true) {
                this.sColor(this.pressColor);
                boundingRect.draw();
            }
            else {
                this.sColor(this.idleColor);
                boundingRect.draw();
                //because need to be hovering over in order to be able to do that anyway
            }
            this.onToggle(this.isToggleOn);
            this.onGroupToggle(this.isToggleOn);
            boundingRect.draw();
        }
        onMouseHoverBegin(mouseHandler) {
            //document.body.style.cursor = "pointer";
            if (this.isToggleOn == false) {
                this.sColor(this.hoverColor);
                boundingRect.draw();
            }
        }
        onMouseHoverEnd(mouseHandler) {
            //document.body.style.cursor = "default";
            if (this.isToggleOn == false) {
                this.sColor(this.idleColor);
                boundingRect.draw();
            }
        }
        onMouseDown(mouseHandler) {
            this.onPress(mouseHandler);
            if (this.isToggleOn == false) {
                this.sColor(this.hoverColor);
                boundingRect.draw();
            }
        }
        onMouseUp(mouseHandler) {
            if (!(this.isToggleOn == true && this.canClickToggleOf == false)) {
                this.isToggleOn = !this.isToggleOn;
                this.toggle(this.isToggleOn);
            }
            this.onRelease(mouseHandler);
            //document.body.style.cursor = "default";
        }
        destroySelf() {
            this.assignedGroup?.removeButton(this);
            super.destroySelf();
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
    addButton(button) {
        this.buttons.push(button);
        button.assignedGroup = this;
        button.canClickToggleOf = false;
        button.onGroupToggle = (newToggleState) => {
            if (newToggleState == true) {
                this.currentToggled?.toggle(false);
                this.currentToggled = button;
            }
        };
    }
    removeButton(button) {
        this.buttons.slice(this.buttons.indexOf(button), 1);
    }
}
export function MakeBoxButton(baseObj) {
}
/**

export interface IToggleButtonConfig extends IClickableConfig {
    hoverColor?: string,
    pressColor?: string,
    onPress?: (mouseHandler: MouseHandler) => void,
    onRelease?: (mouseHandler: MouseHandler) => void;
    onToggle?: (isOn: boolean) => void,
    canClickToggleOf?: boolean,
    assignedGroup?: ToggleButtonGroup | null
}

export function MakeToggleButton<Base extends Class, Config extends IToggleButtonConfig>(base: Base) {

    return class extends base {
        idleColor: string;
        hoverColor: string = colorCreator.colorByBrightness(28);
        pressColor: string = colorCreator.colorByBrightness(70);
        onPress = (mouseHandler: MouseHandler) => { };
        onRelease = (mouseHandler: MouseHandler) => { };

        isToggleOn: boolean = false;
        onToggle: (isOn: boolean) => void = () => { };
        onGroupToggle: (isOn: boolean) => void = () => { };
        canClickToggleOf: boolean = true;
        assignedGroup: ToggleButtonGroup | null = null;

        constructor(...args: any[]) {
            super(...args);
            this.color = colorCreator.darkColorDef;
            this.idleColor = this.color;
            this.setConfigAttrs(args[0]);
        }

        public addConfig(config: Config | IToggleButtonConfig): void {
            super.addConfig(config);
        }

        public toggle(newToggleState: boolean) {
            this.isToggleOn = newToggleState;
            if (this.isToggleOn == true) {
                this.addConfig({
                    color: this.pressColor
                })
            }
            else {
                this.addConfig({
                    color: this.idleColor
                })
                //because need to be hovering over in order to be able to do that anyway
            }
            this.onToggle(this.isToggleOn);
            this.onGroupToggle(this.isToggleOn);
            boundingRect.draw();
        }

        onMouseHoverBegin(mouseHandler: MouseHandler) {
            if (this.isToggleOn == false) {
                this.addConfig({
                    color: this.hoverColor
                })
            }
        }
        onMouseHoverEnd(mouseHandler: MouseHandler) {
            if (this.isToggleOn == false) {
                this.addConfig({
                    color: this.idleColor
                })
            }
        }
        onMouseDown(mouseHandler: MouseHandler) {
            if (!(this.isToggleOn == true && this.canClickToggleOf == false)) {
                this.isToggleOn = !this.isToggleOn
                this.toggle(this.isToggleOn);
            }
            this.onPress(mouseHandler);
        }
        onMouseUp(mouseHandler: MouseHandler) {
            this.onRelease(mouseHandler);
        }
        destroy(): void {
            this.assignedGroup?.removeButton(this);
            super.destroySelfAndChildren();
        }

    }
}

const DefClass1 = (MakeToggleButton(MakeClickable(Rect)))
export type ToggleButtonMixin = InstanceType<typeof DefClass1>;

export class ToggleButtonGroup {
    public buttons: ToggleButtonMixin[] = [];
    public currentToggled: ToggleButtonMixin | null = null;
    constructor() {

    }
    setCurrentToggled(button: ToggleButtonMixin) {
        if (this.currentToggled != button) {
            button.toggle(true);
        }
    }
    addButtons(buttons: ToggleButtonMixin[]) {
        buttons.forEach(button => {
            this.buttons.push(button);
            button.assignedGroup = this;
            button.addConfig({
                canClickToggleOf: false
            })
            button.onGroupToggle = (newToggleState) => {
                if (newToggleState == true) {
                    this.currentToggled?.toggle(false);
                    this.currentToggled = button;
                }
            }
        });
    }
    removeButton(button: ToggleButtonMixin) {
        this.buttons.slice(this.buttons.indexOf(button), 1)
    }
}

*/ 
