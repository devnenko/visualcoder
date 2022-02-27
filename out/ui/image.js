import { Rect } from "./rect.js";
//export function instanceOfRectType(object: any): object is RectType {
//    return object.hasOwnProperty('absEdges');
//}
export class ImageRect extends Rect {
    constructor() {
        super();
        this.srcId = "";
    }
    drawRect() {
        if (this.isVisible == true) {
            const transform = this.edgesToDrawdimensions(this.absEdges);
            var img = new Image();
            img.src = "/icons/trash.svg";
            if (img) {
                this.canvas.ctx.drawImage(img, Math.floor(transform.pos.x), Math.floor(transform.pos.y), Math.floor(transform.size.w), Math.floor(transform.size.h));
            }
            else {
                console.error("image not valid");
            }
        }
    }
}
