import { colorCreator } from '../../util/color.js';
import { Rect } from "../../ui/rect.js";
import { MakeClickable } from '../../ui/clickable_rect.js';
export class ViewContentArea {
    constructor(view) {
        this.boundBox = new (MakeClickable(Rect));
        this.boundBox.addConfig({
            parent: view,
            fillSpace: true,
            color: colorCreator.colorByBrightness(10)
        });
    }
}
