import { MakeClickable } from "../ui/clickable_rect.js";
import { MouseHandler } from "../ui/event_handlers/mouse.js";
import { Rect } from "../ui/rect.js";
import { View } from "./view.js";
import { FileView } from "./view/view.js";
import { FileViewController } from "./view_cont.js";

export class ScriptView extends View {
    title = "script";
    clickArea;
    constructor(controller: FileViewController) {
        super(controller)
        this.changeTitle();

        this.clickArea=new (MakeClickable(Rect))
        this.clickArea
                .sParent(this.contentArea)
                .sFillSpace()
                .sIsVisible(false)
                .onMouseUp=(handler:MouseHandler)=>{
                    console.log("click")
                }
    }
}