import { MakeClickable } from "../ui/clickable_rect.js";
import { Rect } from "../ui/rect.js";
import { View } from "./view.js";
export class ScriptView extends View {
    constructor(controller) {
        super(controller);
        this.title = "script";
        this.changeTitle();
        this.clickArea = new (MakeClickable(Rect));
        this.clickArea
            .sParent(this.contentArea)
            .sFillSpace()
            .sIsVisible(false)
            .onMouseUp = (handler) => {
            console.log("click");
        };
    }
}
