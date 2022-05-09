import { boundingRect } from "../ui/bounding_rect.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { MouseHandler } from "../ui/event_handlers/mouse.js";
import { EConstraintsY, Rect } from "../ui/rect.js";
import { TextRect } from "../ui/text_rect.js";


export class TextInput extends MakeClickable(TextRect){
    pointer:Rect|null=null;
    onMouseDown(mouseHandler: MouseHandler): void {
        this.pointer=new Rect
        this.pointer.sParent(this)
                    .sZIndex(60)
                    .sFixedSizeW(3)
                    .setFixedSizeH(this.gFixedSize().h)
                    .sConstY(EConstraintsY.center)

        boundingRect.draw();
        mouseHandler.activepointer=this.pointer;
        console.log(mouseHandler.posOnRect(this))
    }

    setPointerLocation(){

    }
}


/**

import { MouseHandler, IMouseHandler,IKeyPressHandler,KeypressHandler } from "../ui/event_handlers/event_handlers.js";
import { Rect, Canvas, IShape, TextBox, colorCreator } from "../ui/ui.js";
import { EConstraintsX, EConstraintsY, EMouseType, IPos } from "../ui/types/types.js";
import { IRectConfig } from "../ui/rect.js";
import { Clickable, IClickableConfig } from "../ui/clickable_rect.js";
import { boundingShape } from "../ui/bounding_rect.js";
import { HoverPressButton, IHoverPressButtonConfig, IToggleButtonConfig, ToggleButton } from "./button.js";

export interface ITextInputConfig extends IToggleButtonConfig{
}

export class TextInput extends ToggleButton implements IKeyPressHandler {


    constructor(config:ITextInputConfig) {
        super()
        this.createTitle();
        this.addConfig({
            constraintX:EConstraintsX.left,
            constraintY:EConstraintsY.top,
            fixedSizeH:35,
            fixedSizeW:200,
            canClickToggleOf:false
            
        })
        this.title?.addConfig({
            constraintX:EConstraintsX.left,
            text:"untitled"
        });
        this.setConfigAttrs(config);
    }

    addConfig(config: ITextInputConfig): void {
        super.addConfig(config);
    }

    public onToggle: (isOn: boolean) => void=(isOn)=>{
        if(isOn){
            KeypressHandler.subscribe(this);
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                console.log(document.getElementById("keyboardHack"))
                document.getElementById("keyboardHack")?.focus();
            }
            MouseHandler.actifInputField=this;
        }
        else{
            KeypressHandler.unsubscribe(this);
            if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                console.log(document.getElementById("keyboardHack"))
                document.getElementById("keyboardHack")?.blur()
            }
            MouseHandler.actifInputField=null;
        }
    };

    public onKeyPress(key: string): void {
        console.log(key)
        if(this.title){
            let text=this.title.text;
        }
        else{
            console.error("no title on text input")
        }
        let text=(this.title as TextBox).text;
        if(key==="Backspace"){
            text=text.slice(0, -1)
        }
        else{
            text=text.concat(key);
        }
        this.title?.setText(text);
    }
}
*/