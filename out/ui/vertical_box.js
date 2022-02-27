import { EObjectType, Rect } from "./ui.js";
export class VerticalBox extends Rect {
    constructor() {
        super();
        this.rectType = EObjectType.VtBox;
    }
}
