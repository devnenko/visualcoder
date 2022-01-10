import { BoundingRect } from "../bounding_rect.js";
//add info here
//
export class ResizeHandler {
    static init() {
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow.bind(this));
    }
    static resizeWindow() {
        for (const canvas of this.canvases) {
            canvas.resize();
        }
        BoundingRect.drawHierarchy();
    }
}
ResizeHandler.canvases = [];
