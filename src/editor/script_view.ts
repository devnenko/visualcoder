import { boundingRect } from "../ui/bounding_rect.js";
import { Box } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { IKeyPressHandler, KeypressHandler } from "../ui/event_handlers/keypress.js";
import { BoxType, Rect } from "../ui/rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeHoverPressButton, MakeToggleButton } from "../ui_components/button.js";
import { uniform } from "../util/uniform.js";
import { View } from "./view.js";
import { ViewController } from "./view_controller.js";

export class Block extends (MakeToggleButton(MakeClickable(Rect))) implements IKeyPressHandler{
    text;
    view;
    constructor(view:ScriptView){
        super()
        this.view=view;
        this.sParent(view.vtBox);
        this.setFixedSizeH(uniform.vtBoxSize)
        this.text = new TextRect;
        this.text.sParent(this);
    
    }
    onToggle= (isOn: boolean) => {
        if(isOn){
            KeypressHandler.subscribe(this);
        }else{
            KeypressHandler.unsubscribe(this);
        }
    }
    onKeyPress(key: string): void {
        console.log("press")
        const prevText=this.text.gText();
        switch (key){
            case "Backspace":
                this.text.sText(prevText.slice(0,-1));
                break;
            case "Enter":
                break;
            default:
                this.text.sText(prevText.concat(key));
        }
        boundingRect.draw();
        this.view.updateAsset();
    }
}

export class ScriptView extends View {
    viewName = "ScriptView";
    clickArea;
    vtBox;
    constructor(cont: ViewController) {
        super(cont);
        //this.viewName="LevelView " + "(" + cont.getAsset()?.name + ")";
        this.setTitle()


        this.clickArea = uniform.makeInvisFill(new (MakeClickable(Rect)), this.contArea)

        this.vtBox = uniform.makeInvisFill(new Box(BoxType.vt), this.clickArea)

        this.clickArea.onMouseUp = () => {
            const b = new Block(this)
            b.text.sText("new Block");
            boundingRect.draw();
            this.updateAsset();
        }

        boundingRect.draw();
        this.refreshContent();
    }
    updateAsset(){
        const fileSrc:string[]=[];

        const chil:Block[]=this.vtBox.gChildren() as Block[];
        chil.forEach(el=>{
            fileSrc.push(el.text.gText());
        })
        const asset=this.cont.getAsset();
        if(asset){
            asset.source=JSON.stringify(fileSrc);
        }
    }
    refreshContent(): void {
        this.vtBox.destroyChildren();
        const asset = this.cont.getAsset();
        if (asset) {
            const obj: string[] = JSON.parse(asset.source);
            obj.forEach(el => {
                const b = new Block(this)
                b.text.sText(el);
                boundingRect.draw();
            })
        }
    }
}