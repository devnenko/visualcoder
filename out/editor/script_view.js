import { boundingRect } from "../ui/bounding_rect.js";
import { Box } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { KeypressHandler } from "../ui/event_handlers/keypress.js";
import { BoxType, Rect } from "../ui/rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeToggleButton } from "../ui_components/button.js";
import { uni } from "../util/uniform.js";
import { View } from "./view.js";
//enum ScriptEvents{
//    editor="editor",
//    start="start",
//    frame="frame"
//}
var ScriptCommand;
(function (ScriptCommand) {
    ScriptCommand["print"] = "print";
})(ScriptCommand || (ScriptCommand = {}));
export class Block extends (MakeToggleButton(MakeClickable(Rect))) {
    constructor(view) {
        super();
        this.onToggle = (isOn) => {
            if (isOn) {
                KeypressHandler.subscribe(this);
            }
            else {
                KeypressHandler.unsubscribe(this);
            }
        };
        this.view = view;
        this.sParent(view.vtBox);
        this.setFixedSizeH(uni.vtBoxSize);
        this.text = new TextRect;
        this.text.sParent(this);
    }
    onKeyPress(key) {
        console.log("press");
        const prevText = this.text.gText();
        switch (key) {
            case "Backspace":
                this.text.sText(prevText.slice(0, -1));
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
    constructor(cont) {
        super(cont);
        this.viewName = "ScriptView";
        //this.viewName="LevelView " + "(" + cont.getAsset()?.name + ")";
        this.setTitle();
        this.clickArea = uni.invisFill(new (MakeClickable(Rect)));
        this.clickArea.sParent(this.contArea);
        this.vtBox = uni.invisFill(new Box(BoxType.vt));
        this.vtBox.sParent(this.clickArea);
        this.clickArea.onMouseUp = () => {
            const b = new Block(this);
            b.text.sText("new Block");
            boundingRect.draw();
            this.updateAsset();
        };
        boundingRect.draw();
        this.refreshContent();
    }
    updateAsset() {
        const fileSrc = [];
        const chil = this.vtBox.gChildren();
        chil.forEach(el => {
            fileSrc.push(el.text.gText());
        });
        const asset = this.controller.asset;
        if (asset) {
            asset.source = JSON.stringify(fileSrc);
        }
    }
    refreshContent() {
        this.vtBox.destroyChildren();
        const asset = this.controller.asset;
        if (asset) {
            const obj = JSON.parse(asset.source);
            obj.forEach(el => {
                const b = new Block(this);
                b.text.sText(el);
                boundingRect.draw();
            });
        }
    }
}
