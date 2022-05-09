import { boundingRect } from "../ui/bounding_rect.js";
import { View } from "./view.js";
export class LevelView extends View {
    constructor(cont) {
        super(cont);
        this.viewName = "LevelView";
        //this.viewName="LevelView " + "(" + cont.getAsset()?.name + ")";
        this.setTitle();
        this.refreshContent();
    }
    refreshContent() {
        boundingRect.draw();
    }
}
