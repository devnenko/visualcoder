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
import { TextEditor } from "./text_editor.js";

export class File{
    name:string;
    type:string;
    source:string;
    constructor(name:string,type:string,source:string){
        this.name=name;
        this.type=type;
        this.source=source;
    }
}

export let allFiles:File[]=[];

export class ContentBrowser extends VerticalBox{
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
        this.isVisible=false;
        this.fixedSize.w=200;
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.color=colorCreator.colorByBrightness(20);

        this.refresh();
    }
    refresh(){
        const length=this.children.length;
        for(var i =0;i<length;i++){
            this.children[0].destroyHierarchy();
        }
        for(const file of allFiles){
            const b1=new CBButton(this,this.canvas,file)
        }
        new FileAddButton(this,this.canvas)
    }
}

export class FileAddButton extends HoverPressButton{
    previewRect:Rect|null=null;
    text:Text;

    constructor(parent:ContentBrowser,canvas:Canvas){
        super(parent,canvas)
        this.fixedSize.h=60;
        this.setConstraints(EConstraintsX.center,EConstraintsY.top);
        this.color=colorCreator.colorByBrightness(70);
        this.hoverColor=colorCreator.colorByBrightness(60);
        this.pressColor=colorCreator.colorByBrightness(60);

        this.text=new Text(this,this.canvas);
        this.text.color="white";
        this.text.text="new file"
        


        this.onCLick=()=>{
            allFiles.push(new File("new","src","src"));
            parent.refresh();
        };
    }
}

export class CBButton extends HoverPressButton{
    name:Text;
    fileType:Text;
    source:string;
    previewRect:Rect|null=null;
    file:File;
    //type:Text;

    constructor(parent:ContentBrowser,canvas:Canvas,file:File){
        super(parent,canvas)
        this.fixedSize.h=60;
        this.setConstraints(EConstraintsX.scale,EConstraintsY.top);
        this.color=colorCreator.colorByBrightness(70);
        this.hoverColor=colorCreator.colorByBrightness(60);
        this.pressColor=colorCreator.colorByBrightness(60);
        
        this.name=new Text(this,this.canvas);
        this.name.color="white";
        this.name.text=file.name

        this.fileType=new Text(this,this.canvas);
        this.fileType.fixedOffset.x=100;
        this.fileType.color="white";
        this.fileType.text=file.type;

        this.source=file.source;

        this.file=file;

        this.onCLick=()=>{
            if(this.file.type=="src"){
                editor.addViewGeneric(new TextEditor(boundingShape,this.canvas,this.file),"Script");
            }
        };
    }
}