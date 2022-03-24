import { View } from "../view.js";
import { Rect, boundingShape } from "../../../ui/ui.js";
export class PixelImage extends View {
    constructor(view) {
        super(view);
        this.viewName = "PixelImage";
        const mainImage = new Rect();
        mainImage.addConfig({
            parent: this
        });
        mainImage.image = new Image();
        mainImage.image.src = "/icons/trash.svg";
        mainImage.image.onload = function () {
            boundingShape.draw();
        };
    }
}
