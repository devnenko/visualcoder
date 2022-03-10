import { MouseHandler, IMouseHandler } from "../ui/event_handlers/event_handlers.js";
import { Rect, Canvas, IShape, TextBox, colorCreator } from "../ui/ui.js";
import { EConstraintsX, EConstraintsY, EMouseType, IPos } from "../ui/types/types.js";
import { IRectConfig } from "../ui/rect.js";
import { Clickable, IClickableConfig } from "../ui/clickable.js";
import { boundingShape } from "../ui/bounding_rect.js";

export interface IHoverPressButtonConfig extends IClickableConfig {
    hoverColor?: string,
    pressColor?: string,
    onPress?: (type: EMouseType, pos: IPos, isTopMost: boolean) => void,
    onRelease?: (type: EMouseType, pos: IPos, isTopMost: boolean) => void;
}

export class HoverPressButton<Config= IHoverPressButtonConfig> extends Clickable<Config> {
    public notPressedColor: string;
    public hoverColor: string = colorCreator.colorByBrightness(28);
    public pressColor: string = colorCreator.colorByBrightness(70);
    public title: TextBox | null = null;
    public icon: Rect | null = null;
    public onPress = (type: EMouseType, pos: IPos, isTopMost: boolean) => { };
    public onRelease = (type: EMouseType, pos: IPos, isTopMost: boolean,stillOverlapping:boolean) => { };

    constructor(config?:IHoverPressButtonConfig){
        super();
        this.constraintX = EConstraintsX.scale;
        this.constraintY = EConstraintsY.scale;
        this.color = colorCreator.darkColorDef;
        this.notPressedColor = this.color;
        this.setAttrs(config);
    }
    addConfig(config: IHoverPressButtonConfig): void {
        super.addConfig(config)
    }

    public createTitle() {
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
        this.icon = new Rect()
        this.icon.addConfig({
            imageSrc: "trash.svg",
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            parent: this
        })
    }


    public onMouseHoverBegin(type: EMouseType, pos: IPos, isTopMost: boolean) {
        this.addConfig({
            color:this.hoverColor
        })
        super.onMouseHoverBegin(type,pos,isTopMost);
    }
    public onMouseHoverEnd(type: EMouseType, pos: IPos, isTopMost: boolean) {
        this.addConfig({
            color:this.notPressedColor
        })
        super.onMouseHoverEnd(type,pos,isTopMost);
    }
    public onMouseDown(type: EMouseType, pos: IPos, isTopMost: boolean) {
        this.addConfig({
            color:this.pressColor
        })
        this.onPress(type, pos, isTopMost);
        super.onMouseDown(type,pos,isTopMost);
    }
    onMouseMoveDown(type: EMouseType, pos: IPos, isTopMost: boolean): void {
        super.onMouseMoveDown(type,pos,isTopMost);
    }
    public onMouseUp(type: EMouseType, pos: IPos, isTopMost: boolean) {
        this.addConfig({
            color:this.notPressedColor
        })
        this.onRelease(type, pos, isTopMost);
        super.onMouseUp(type,pos,isTopMost);
    }

}

export interface IToggleButtonConfig extends IHoverPressButtonConfig {
    onToggle?: (isOn: boolean) => void,
    canClickToggleOf?: boolean,
    [key: string]: any;
}

export class ToggleButton<Config= IToggleButtonConfig> extends HoverPressButton<Config> {
    public isOn: boolean = false;
    public onToggle: (isOn: boolean) => void = () => { };
    public onToggle2: (isOn: boolean) => void = () => { };
    public canClickToggleOf: boolean = true;
    public group:ToggleButtonGroup|null=null;
    constructor(config?:IToggleButtonConfig) {
        super()
        this.setAttrs(config);
    }

    addConfig(config: IToggleButtonConfig): void {
        super.addConfig(config)
    }

    public toggle(onOrOff: boolean) {
        console.log("tog")
        console.log(this)
        this.isOn = onOrOff;
        if (onOrOff == true) {
            this.addConfig({
                color:this.pressColor
            })
        }
        else {
            this.addConfig({
                color:this.notPressedColor
            })
            //because need to be hovering over in order to be able to do that anyway
        }
        this.onToggle(this.isOn);
        this.onToggle2(this.isOn);
        boundingShape.draw();
    }

    public onMouseHoverBegin = (type: EMouseType, pos: IPos, isTopMost: boolean) => {
        if (this.isOn == false) {
            this.addConfig({
                color:this.hoverColor
            })
        }
        //super.onMouseHoverBegin(type,pos,isTopMost);
    }
    public onMouseHoverEnd = (type: EMouseType, pos: IPos, isTopMost: boolean) => {
        if (this.isOn == false) {
            this.addConfig({
                color:this.notPressedColor
            })
        }
        //super.onMouseHoverEnd(type,pos,isTopMost);
    }
    public onMouseDown = (type: EMouseType, pos: IPos, isTopMost: boolean) => {
        if (!(this.isOn == true && this.canClickToggleOf == false)) {
            this.isOn = !this.isOn
            this.toggle(this.isOn);
        }
        this.onPress(type, pos, isTopMost);
        //super.onMouseDown(type,pos,isTopMost);
    }
    onMouseMoveDown(type: EMouseType, pos: IPos, isTopMost: boolean): void {
        //super.onMouseMoveDown(type,pos,isTopMost);
    }
    public onMouseUp(type: EMouseType, pos: IPos, isTopMost: boolean) {
        //super.onMouseUp(type,pos,isTopMost);
    }
    destroy(): void {
        this.group?.removeButton(this);
        super.destroy();
    }
}

export class ToggleButtonGroup{
    public buttons:ToggleButton[]=[];
    public currentToggled:ToggleButton|null=null;
    constructor(){

    }
    setCurrentToggled(button:ToggleButton){
        if(this.currentToggled!=button){
            button.toggle(true);
        }
    }
    addButton(button:ToggleButton){
        this.buttons.push(button);
        button.group=this;
        button.addConfig({
            canClickToggleOf: false,
        })
        button.onToggle2=(isOn)=>{
            if(isOn){
                this.currentToggled?.toggle(false);
                this.currentToggled=button;
            }
        }
    }
    removeButton(button:ToggleButton){
        this.buttons.slice(this.buttons.indexOf(button),1)
    }
}