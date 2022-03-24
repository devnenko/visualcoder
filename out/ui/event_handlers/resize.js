import { editor } from "../../main.js";
import { boundingRect } from "../bounding_rect.js";
/**
 *
 */
export class ResizeHandler {
    static init() {
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow.bind(this));
        window.addEventListener("orientationchange", this.changeOrientation.bind(this));
        document.addEventListener("visibilitychange", this.visibilityChange.bind(this));
        document.addEventListener("webkitvisibilitychange", this.visibilityChange.bind(this));
        //this.mobileRes();
        //screen.orientation.addEventListener('change', this.resizeWindow.bind(this))
    }
    static changeOrientation(e) {
        console.log(screen.orientation);
        this.mobileRes();
        this.resizeWindow();
    }
    static resizeWindow() {
        for (const canvas of this.canvases) {
            canvas.resize();
        }
        boundingRect.draw();
    }
    static visibilityChange(e) {
        this.mobileRes();
        this.resizeWindow();
    }
    static mobileRes() {
        editor.orientSideBar();
    }
}
ResizeHandler.canvases = [];
