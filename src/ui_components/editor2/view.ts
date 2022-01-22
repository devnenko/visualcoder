import { Button } from "../../ui/button.js";
import { Canvas } from "../../ui/canvas.js";
import { colorCreator } from "../../ui/color.js";
import { HorizontalBox } from "../../ui/horizontal_box.js";
import { Rect } from "../../ui/rect.js";
import { boundingShape, IShape, Shape } from "../../ui/shape.js";
import { Text } from "../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { CBButton } from "./content_browser.js";

export class View extends Button{
    vtBox;
    topBar;
    title;
    contentArea;
    source;
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.isVisible=false;

        this.vtBox=new VerticalBox(this,canvas)
        this.vtBox.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.vtBox.isVisible=false;

        this.topBar=new Rect(this.vtBox,canvas);
        this.topBar.color=colorCreator.colorByBrightness(30);
        this.topBar.fixedSize.h=60;

        this.title=new Text(this.topBar,canvas);
        this.title.text="nothing loaded"
        this.title.color="white"

        this.contentArea=new Rect(this.vtBox,canvas);
        this.contentArea.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.contentArea.color=colorCreator.colorByBrightness(55);

        this.source=new Text(this.contentArea,canvas);
        this.source.text="no source found"
        this.source.color="white"
    }
    load(file:CBButton){
        this.title.text=file.title.text;
        this.source.text=file.source;
        boundingShape.drawHierarchy();
    }
}

export class ViewLoader extends Shape{
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
    }
}