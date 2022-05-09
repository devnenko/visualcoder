import { editor } from "../../main.js";
import { boundingRect } from "../bounding_rect.js";
/**
 *
 */
export class ResizeHandler {
    static init() {
        this.firstResize();
        window.addEventListener('resize', this.resizeWindow.bind(this));
        window.addEventListener("orientationchange", this.changeOrientation.bind(this));
        document.addEventListener("visibilitychange", this.visibilityChange.bind(this));
        document.addEventListener("webkitvisibilitychange", this.visibilityChange.bind(this));
    }
    static changeOrientation(e) {
        this.resizeWindow();
        this.mobileRes();
        boundingRect.draw();
    }
    static resizeWindow() {
        for (const canvas of this.canvases) {
            canvas.resize();
        }
        boundingRect.draw();
    }
    static firstResize() {
        for (const canvas of this.canvases) {
            canvas.resize();
        }
    }
    static visibilityChange(e) {
        this.resizeWindow();
    }
    static mobileRes() {
        editor.orientSideBar();
    }
}
ResizeHandler.canvases = [];
