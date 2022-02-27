import { MouseHandler, IMouseHandler,IKeyPressHandler,KeypressHandler } from "../ui/event_handlers/event_handlers.js";
import { Rect, Canvas, IShape, TextBox, colorCreator } from "../ui/ui.js";
import { EConstraintsX, EConstraintsY, EMouseType, IPos } from "../ui/types/types.js";
import { IRectOpts } from "../ui/rect.js";
import { Clickable, IClickableOpts } from "../ui/clickable.js";
import { boundingShape } from "../ui/bounding_rect.js";
import { HoverPressButton, IHoverPressButtonOpts, IToggleButtonOpts, ToggleButton } from "./button.js";

export interface ITextInputOpts extends IToggleButtonOpts{
}

export class TextInput<Opts extends ITextInputOpts = ITextInputOpts> extends ToggleButton implements IKeyPressHandler {


    public createConfig(opts: IToggleButtonOpts){
        this.addConfig(opts)
    }

    constructor() {
        super()
        this.createTitle();
        this.createConfig({
            constraintX:EConstraintsX.left,
            constraintY:EConstraintsY.top,
            fixedSizeH:35,
            fixedSizeW:200,
            canClickToggleOf:false
            
        })
        this.title?.createConfig({
            constraintX:EConstraintsX.left,
            text:"untitled"
        });
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