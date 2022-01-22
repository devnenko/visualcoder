import { Canvas } from "../../ui/canvas.js";
import { HorizontalBox } from "../../ui/horizontal_box.js";
import { boundingShape, IShape, Shape } from "../../ui/shape.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { ContentBrowser } from "./content_browser.js";
import { ResizeBar } from "./resize_bar.js";
import { View } from "./view.js";

export class Editor extends HorizontalBox{
    public contentBrowser;
    public views:View[]=[];
    public selectedView;
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.isVisible=false;
        

        this.contentBrowser=new ContentBrowser(this,canvas);

        this.views.push(new View(this,canvas))
        this.selectedView=this.views[0];

        new ResizeBar(boundingShape,canvas,this.contentBrowser,this.views[0])

    }
}