import { EObjectType, Rect } from "./ui.js";
export class HorizontalBox extends Rect {
    constructor() {
        super();
        this.rectType = EObjectType.HzBox;
    }
}
