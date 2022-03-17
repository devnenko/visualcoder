
import { Canvas } from "../../src/ui/canvas.js";
import { colorCreator } from "../../src/util/color.js";
import { MouseHandler } from "../../src/ui/event_handlers/mouse.js";
import {Rect } from "../../src/ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
import { EMouseType } from "../ui/types/mouse.js";
import { IPos } from "../ui/types/pos.js";
import { Level } from "./views/level/level.js";
import {  HoverPressButton, ToggleButton } from "../../src/ui_components/button.js";
import { ViewOutline ,View} from "./views/view.js";
import { Editor } from "./editor.js";
import { ContentBrowser } from "./views/contentbrowser/content_browser.js";
import { ERectType } from "../../src/ui/shape.js";
import { mapStartFile } from "./views/cb_file.js";


export class TopBarButton extends HoverPressButton
{
    constructor(editorTopBar:EditorTopBar){
        super()
        this.addConfig({
            constraintX:EConstraintsX.left,
            fixedSizeW:editorTopBar.fixedSizeH,
            fixedSizeH:editorTopBar.fixedSizeH,
            parent:editorTopBar,
            snapMargin:5,
            boxProportion:{x:50,y:50}
        });
    }
}

export class TopBarToggleButton extends ToggleButton{
    public toggleOnIconSrc:string="";
    public toggleOffIconSrc:string="";
    constructor(editorTopBar:EditorTopBar){
        super()
        this.addConfig({
            constraintX:EConstraintsX.left,
            fixedSizeW:editorTopBar.fixedSizeH,
            fixedSizeH:editorTopBar.fixedSizeH,
            parent:editorTopBar,
            snapMargin:5,
            boxProportion:{x:50,y:50},
            onToggle:(isOn:boolean)=>{
                if(isOn){
                    this.icon?.addConfig({
                        imageSrc:this.toggleOnIconSrc
                })
                }
                else{
                    this.icon?.addConfig({
                        imageSrc:this.toggleOffIconSrc
                    })
                }
            }
        });
    }
}

export class TopViewOpenButton extends ToggleButton{
    public toggleOnIconSrc:string;
    public toggleOffIconSrc:string;
    constructor(editorTopBar:EditorTopBar,viewToHandle:typeof View,toggleOfIconSrc:string,toggleOnIconSrc:string){
        super()
        this.toggleOffIconSrc=toggleOfIconSrc;
        this.toggleOnIconSrc=toggleOnIconSrc;
        this.addConfig({
            canClickToggleOf:false,
            constraintX:EConstraintsX.left,
            fixedSizeW:editorTopBar.fixedSizeH,
            fixedSizeH:editorTopBar.fixedSizeH,
            parent:editorTopBar,
            snapMargin:5,
            boxProportion:{x:50,y:50},
            onToggle:(isOn:boolean)=>{
                if(isOn){
                    if(editorTopBar.editor.findView(viewToHandle)==null){
                        editorTopBar.editor.addViewGeneric(viewToHandle);
                    }
                    this.icon?.addConfig({
                        imageSrc:this.toggleOnIconSrc
                })
                }
                else{
                    this.icon?.addConfig({
                        imageSrc:this.toggleOffIconSrc
                    })
                }
            }
        });
        this.createIcon();
        this.icon?.addConfig({imageSrc:toggleOfIconSrc});
    }
}

export class EditorTopBar extends Rect//will have play button, options for adding views (maybe should be something better)
{
    public children:TopBarButton[]=[];
    playButton;
    cbButton;
    editor;
    //newWin:Window|null=null;
    constructor(editor:Editor){
        super()
        this.editor=editor;
        this.addConfig({
            rectType:ERectType.HzBox,
            parent:editor,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.top,
            fixedSizeH:70,
            fixedSizeW:70,
            color:colorCreator.colorByBrightness(5)
        });

        

        this.playButton=new TopViewOpenButton(this,Level,"play.svg","pause.svg");
        this.playButton.addConfig({
            canClickToggleOf:true
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
        this.cbButton=new TopViewOpenButton(this,ContentBrowser,"folder.svg","folder.svg");
        //contentBrowserButton.title.text="Content Browser"
        //contentBrowserButton.onPress=()=>//implement loading script also for drag and drop and multi tab. also implement for click add at best location
        //{
        //    ////parent.addViewGeneric(ContentBrowser,"ContentBrowser");
        //}
        //add last opened file button 
    }


}