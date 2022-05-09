import { boundingRect } from "../ui/bounding_rect.js";
import { Box, BoxType } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { KeypressHandler } from "../ui/event_handlers/keypress.js";
import { mouseHandler } from "../ui/event_handlers/mouse.js";
import { EConstraintsY, Rect } from "../ui/rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeToggleButton } from "../ui_components/button.js";
import { View } from "./view.js";
var Commands;
(function (Commands) {
    Commands["print"] = "print";
})(Commands || (Commands = {}));
class TextBlock extends MakeToggleButton(MakeClickable(Rect)) {
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
        this.sParent(view.vtBox)
            .setFixedSizeH(85)
            .sSnapMargin(8);
        this.toggle(true);
        boundingRect.draw();
        this.text = new TextRect;
        this.text.sParent(this)
            .sConstY(EConstraintsY.center)
            .sText("")
            .sTextSize(32);
        mouseHandler.mouseDownCallbacks.push({ thisFunc: () => {
                this.toggle(false);
                boundingRect.draw();
            }, thisObj: this }); //click on same thing logic
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
        this.view.updateFile();
    }
}
export class TextScriptView extends View {
    constructor(controller) {
        super(controller);
        this.title = "textscript";
        this.controller = controller;
        this.changeTitle();
        this.vtBox = new (MakeClickable(Box))(BoxType.vt);
        this.vtBox
            .sParent(this.contentArea)
            .sFillSpace()
            .sIsVisible(false)
            .onMouseUp = () => {
            new TextBlock(this);
            //       this.updateFile();
            boundingRect.draw();
        };
        //
        //this.vtBox=new Box(BoxType.vt)
        //this.vtBox
        //    .sParent(this.clickArea)
        //    .sFillSpace()
        //    .sIsVisible(false)
        this.refresh();
        //const b1=new TextBlock(this)
    }
    refresh() {
        const newObj = JSON.parse(this.controller.file.source);
        newObj.forEach(el => {
            const tb = new TextBlock(this);
            //tb.text.sText(el);
        });
    }
    updateFile() {
        let newObj = [];
        this.vtBox.gChildren().forEach(el => {
            const splitString = el.gChildren()[0].gText().split(" ");
            if (splitString[0] == Commands.print) {
                newObj.push({ command: Commands.print, arg: el.gChildren()[0].gText() });
            }
            else {
                console.error("token unrecognized");
            }
        });
        const newString = JSON.stringify(newObj);
        this.controller.file.source = newString;
    }
}
