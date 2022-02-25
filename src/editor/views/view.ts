import { destroyScript } from "../../compiler/compiler.js";
import { HoverPressButton } from "../../ui_components/ui_components.js";
import { GeFile } from "./views.js";
import {Rect,Canvas,VerticalBox,HorizontalBox,TextBox,colorCreator} from "../../ui/ui.js";
import {EConstraintsX,EConstraintsY,EMouseType,IPos} from "../../ui/types/types.js";
import { Editor } from "../editor.js";
import { FileTypes } from "./cb_file.js";

class ViewTopBar extends Rect{
    title;
    deleteButton;
    constructor(view:View){
        super()
        this.createConfig({
            parent:view,
            color:colorCreator.colorByBrightness(25),
            fixedSizeH:50,
        })


        this.title=new TextBox();
        this.title.createConfig({
            constraintY:EConstraintsY.center,
            parent:this,
            text:"View name not specified",
            size:24,
            color:"white"
        })

        this.deleteButton=new HoverPressButton();
        this.deleteButton.createConfig({
            parent:this,
            constraintX:EConstraintsX.right,
            constraintY:EConstraintsY.scale,
            fixedSizeW:50,
            onPress:()=>{
                //destroyScript();
                view.destroy();
            }
        })
        this.deleteButton.title.createConfig({
            text:"delete"
        });
    }
}

//should view classes extend view maybe rather than be part of

export class View extends VerticalBox{
    topBar:ViewTopBar;
    contentArea:ViewContentArea;
    constructor(ContentAreaInstance: typeof ViewContentArea,editor:Editor,file?:GeFile){
        super()
        this.createConfig({
            parent:editor.contentArea,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.scale,
            isVisible:false
        });

        this.topBar=new ViewTopBar(this);

        this.contentArea=new ContentAreaInstance(this);

        this.topBar.title.createConfig({
            text:this.contentArea.viewName
        });
        //contentArea.setParent(this);
    }
    destroy(): void {
        //editor.views.splice(editor.views.indexOf(this),1);
        super.destroy();
    }
}

export class ViewContentArea extends Rect{
    viewName:string="Default View"
    constructor(view:View){
        super()
        this.createConfig({
            parent:view,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.scale,
            color:colorCreator.midColorDef
        })
    }
}

export class FileViewContentArea extends ViewContentArea{
    file:GeFile=new GeFile("hi",FileTypes.image,"hi");
    //debugSrc:Text|null=null;

    constructor(view:View,file:GeFile){
        super(view)
    }

    showDebugSrc(){
        //this.debugSrc=new Text(this,this.canvas);
    }
}