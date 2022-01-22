
import { BoundingRect } from "../../ui/bounding_shape.js";
import { Canvas } from "../../ui/canvas.js";
import { HorizontalBox } from "../../ui/horizontal_box.js";
import { IMouseEvents } from "../../ui/clickable.js";
import { RectType } from "../../ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { EditorPage } from "../editor/editor_page.js";
import { HoverPressButton } from "./hover_press_button.js";
import { WelcomePage } from "./welcome_page.js";

function colorByBrightness(value:number){
    return "rgb("+value+","+value+","+value+")";
}

export class ProjectButton extends HoverPressButton{
    constructor(parent:RectType,canvas:Canvas){
        super(parent,canvas)
        this.setConstraints(EConstraintsX.left,EConstraintsY.scale)
        this.fixedSize.w=240;
        this.margin=10;
        this.color=colorByBrightness(100);
        this.hoverColor=colorByBrightness(120);
        this.pressColor=colorByBrightness(166);
        //this.browseButton.margin=10;
        this.text.text="Project";
        this.text.size=50;
        this.text.color=colorByBrightness(300);
    }

    onMouseUp(type: EMouseType): void {
        super.onMouseUp(type);
        //welcomePageObj.destroy();
        //set new hash
        window.location.hash = "3";
        //load engine
        const editorPageObj=new EditorPage(BoundingRect,this.canvas);
        BoundingRect.drawHierarchy();
        //load project in engine
    }
}

export class EnginePage extends HorizontalBox{
    constructor(parent:RectType,canvas:Canvas){
        super(parent,canvas)
        this.isVisible=false;
        this.constX=EConstraintsX.scale;
        this.constY=EConstraintsY.top;
        this.fixedSize.h=200;
        this.margin=20
    }

    addProject(){
        new ProjectButton(this,this.canvas)
    }
}