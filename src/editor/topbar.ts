
import { Canvas } from "../ui/canvas.js";
import { colorCreator } from "../ui/color.js";
import { MouseHandler } from "../ui/event_handlers/mouse.js";
import { HorizontalBox } from "../ui/horizontal_box.js";
import { IRectOpts, Rect } from "../ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
import { EMouseType } from "../ui/types/mouse.js";
import { IPos } from "../ui/types/pos.js";
import { VerticalBox } from "../ui/vertical_box.js";
import { Scene } from "./views/scene/scene.js";
import {  HoverPressButton, ToggleButton } from "../ui_components/button.js";
import { View ,ViewContentArea} from "./views/view.js";
import { Editor } from "./editor.js";
import { ContentBrowser } from "./views/contentbrowser/content_browser.js";


export class TopBarButton extends HoverPressButton
{
    constructor(parent:EditorTopBar){
        super()
        console.log(parent)
        this.createConfig({
            constraintX:EConstraintsX.scale,
            fixedSizeW:250,
            parent:parent,
            snapMargin:5,
            boxProportion:{x:50,y:50}
        });
    }
}

export class EditorTopBar extends HorizontalBox//will have play button, options for adding views (maybe should be something better)
{
    public children:TopBarButton[]=[];
    //newWin:Window|null=null;
    constructor(parent:Editor){
        super()
        console.log(parent)
        this.createConfig({
            parent:parent,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.top,
            fixedSizeH:65,
            color:colorCreator.colorByBrightness(0)
        });

        

        const playButton=new TopBarButton(this);
        playButton.title.createConfig({text:"Play"});
        playButton.createConfig({
            onPress:()=>{
            }
        });
        //playButton.title.text="Play"
        //playButton.onPress=()=>{
        //    //const scene=new Scene(boundingShape,this.canvas);
        //    //editor.addViewGeneric(scene,"Scene");
        //    //scene.reload();
        //    //const newWin=window.open("frame1.html", "_blank");
        //    ////parent.addViewGeneric(Scene,"Scene");
        //}
//
        const contentBrowserButton=new TopBarButton(this);
        contentBrowserButton.title.createConfig({text:"ContentBrowser"});
        contentBrowserButton.createConfig({
            onPress:()=>{
                parent.addViewGeneric(ContentBrowser);
            }
        });
        //contentBrowserButton.title.text="Content Browser"
        //contentBrowserButton.onPress=()=>//implement loading script also for drag and drop and multi tab. also implement for click add at best location
        //{
        //    ////parent.addViewGeneric(ContentBrowser,"ContentBrowser");
        //}
        //add last opened file button 
    }


}