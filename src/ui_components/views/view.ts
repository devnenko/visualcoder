import { editor } from "../../main.js";
import { Canvas } from "../../ui/canvas.js";
import { colorCreator } from "../../ui/color.js";
import { IMouseHandler, MouseHandler } from "../../ui/event_handlers/mouse.js";
import { HorizontalBox } from "../../ui/horizontal_box.js";
import { Rect } from "../../ui/rect.js";
import { boundingShape, IShape, Shape } from "../../ui/shape.js";
import { Text } from "../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { IPos } from "../../ui/types/pos.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { HoverPressButton } from "../special_buttons.js";

class TopBar extends Rect{
    title;
    deleteButton;
    view;
    constructor(parent:IShape,canvas:Canvas,view:View){
        super(parent,canvas)
        this.view=view;
        this.color=colorCreator.colorByBrightness(25);
        this.fixedSize.h=50;

        this.title=new Text(this,canvas);
        this.title.text="nothing loaded"
        this.title.color="white"

        this.deleteButton=new HoverPressButton(this,this.canvas);
        this.deleteButton.setConstraints(EConstraintsX.right,EConstraintsY.scale)
        this.deleteButton.fixedSize.w=50;
        this.deleteButton.color=colorCreator.colorByBrightness(60);
        this.deleteButton.hoverColor=colorCreator.colorByBrightness(85);
        this.deleteButton.pressColor=colorCreator.colorByBrightness(90);
        this.deleteButton.onCLick=()=>{
            this.view.destroyHierarchy();
        }
    }
}

export class View extends Rect{
    vtBox;
    topBar;
    contentArea;
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.isVisible=false;

        this.vtBox=new VerticalBox(this,canvas)
        this.vtBox.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.vtBox.isVisible=false;

        this.topBar=new TopBar(this.vtBox,canvas,this);

        this.contentArea=new Rect(this.vtBox,canvas);
        this.contentArea.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.contentArea.color=colorCreator.colorByBrightness(55);


    }
    load(item:Rect){
        item.setParent(this.contentArea);
    }
}