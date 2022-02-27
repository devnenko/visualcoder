import { MouseHandler, IMouseHandler } from "../ui/event_handlers/event_handlers.js";
import { Rect, Canvas, IShape, TextBox, colorCreator } from "../ui/ui.js";
import { EConstraintsX, EConstraintsY, EMouseType, IPos } from "../ui/types/types.js";
import { IRectOpts } from "../ui/rect.js";
import { Clickable, IClickableOpts } from "../ui/clickable.js";
import { boundingShape } from "../ui/bounding_rect.js";

export interface IHoverPressButtonOpts extends IClickableOpts {
    hoverColor?: string,
    pressColor?: string,
    onPress?: (type: EMouseType, pos: IPos, isTopMost: boolean) => void,
    onRelease?: (type: EMouseType, pos: IPos, isTopMost: boolean) => void;
}

export class HoverPressButton extends Clickable {
    public notPressedColor: string;
    public hoverColor: string = colorCreator.colorByBrightness(28);
    public pressColor: string = colorCreator.colorByBrightness(70);
    public title: TextBox | null = null;
    public icon: Rect | null = null;
    public onPress = (type: EMouseType, pos: IPos, isTopMost: boolean) => { };
    public onRelease = (type: EMouseType, pos: IPos, isTopMost: boolean) => { };

    public createTitle() {
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
        this.icon = new Rect()
        this.icon.createConfig({
            imageSrc: "trash.svg",
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            parent: this
        })
    }

    public createConfig(opts: IHoverPressButtonOpts) {
        this.addConfig(opts)
    }
    public onMouseHoverBegin(type: EMouseType, pos: IPos, isTopMost: boolean) {
        this.color = this.hoverColor;
    }
    public onMouseHoverEnd(type: EMouseType, pos: IPos, isTopMost: boolean) {
        this.color = this.notPressedColor;
        console.log("end")
    }
    public onMouseDown(type: EMouseType, pos: IPos, isTopMost: boolean) {
        this.color = this.pressColor;
        this.onPress(type, pos, isTopMost);
    }
    onMouseMoveDown(type: EMouseType, pos: IPos, isTopMost: boolean): void {

    }
    public onMouseUp(type: EMouseType, pos: IPos, isTopMost: boolean) {
        this.color = this.notPressedColor;
        this.onRelease(type, pos, isTopMost);
    }

    constructor() {
        super()
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
}

export interface IToggleButtonOpts extends IHoverPressButtonOpts {
    onToggle?: (isOn: boolean) => void,
    canClickToggleOf?: boolean,
    [key: string]: any;
}

export class ToggleButton extends HoverPressButton {
    public isOn: boolean = false;
    public onToggle: (isOn: boolean) => void = () => { };
    public canClickToggleOf: boolean = true;
    constructor() {
        super()
    }

    public createConfig(opts: IToggleButtonOpts) {
        this.addConfig(opts)
    }

    public toggle(onOrOff: boolean) {
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

    public onMouseHoverBegin = (type: EMouseType, pos: IPos, isTopMost: boolean) => {
        if (this.isOn == false) {
            this.color = this.hoverColor;
        }
    }
    public onMouseHoverEnd = (type: EMouseType, pos: IPos, isTopMost: boolean) => {
        if (this.isOn == false) {
            this.color = this.notPressedColor;
        }
    }
    public onMouseDown = (type: EMouseType, pos: IPos, isTopMost: boolean) => {
        if (!(this.isOn == true && this.canClickToggleOf == false)) {
            this.isOn = !this.isOn
            this.toggle(this.isOn);
        }
        this.onPress(type, pos, isTopMost);
    }
    public onMouseUp = () => {
    }
}