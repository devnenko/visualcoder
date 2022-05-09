import { View } from "./view.js";
export class MapView extends View {
    constructor(controller) {
        super(controller);
        this.title = "map";
        this.changeTitle();
    }
}
