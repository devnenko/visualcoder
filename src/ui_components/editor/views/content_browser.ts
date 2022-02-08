import { editor } from "../../../main.js";
import { Button } from "../../../ui/button.js";
import { Canvas } from "../../../ui/canvas.js";
import { colorCreator } from "../../../ui/color.js";
import { MouseHandler } from "../../../ui/event_handlers/mouse.js";
import { Rect } from "../../../ui/rect.js";
import { boundingShape, IShape } from "../../../ui/shape.js";
import { Text } from "../../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../../ui/types/constraints.js";
import { EMouseType } from "../../../ui/types/mouse.js";
import { IPos } from "../../../ui/types/pos.js";
import { VerticalBox } from "../../../ui/vertical_box.js";
import { HoverPressButton } from "../special_buttons.js";
import { TextEditor } from "./text_editor.js";
import { View } from "./view.js";

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
allFiles.push(new File("example","exp","hi"));
allFiles.push(new File("script","src","log this script for the moment"));

export class ContentBrowser extends VerticalBox{
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
        this.isVisible=false;
        this.fixedSize.w=200;
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.color=colorCreator.colorByBrightness(20);
        for(const file of allFiles){
            const b1=new CBButton(this,this.canvas,file)
        }
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
            console.log(this.source)
            if(this.file.type=="src"){
                editor.addViewGeneric(new TextEditor(boundingShape,this.canvas,this.file),"Script");
            }
        };
    }
}