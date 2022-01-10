import { EObjectType } from "./shape.js";
import { Rect } from "./rect.js";
export class HorizontalBox extends Rect {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.type = EObjectType.HzBox;
    }
}
