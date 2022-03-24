
import { editor } from "../../main.js";
import { boundingRect } from "../bounding_rect.js";
import { Canvas } from "../canvas.js";

/**
 * 
 */
export abstract class ResizeHandler {

    public static canvases: Canvas[] = [];

    static init() {
        this.firstResize();
        window.addEventListener('resize', this.resizeWindow.bind(this));
        window.addEventListener("orientationchange", this.changeOrientation.bind(this));
        document.addEventListener("visibilitychange", this.visibilityChange.bind(this));
        document.addEventListener("webkitvisibilitychange", this.visibilityChange.bind(this));
    }

    static changeOrientation(e: any) {
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
    static firstResize(){
        for (const canvas of this.canvases) {
            canvas.resize();
        }
    }

    static visibilityChange(e: any) {
        this.mobileRes();
        this.resizeWindow();
    }

    static mobileRes() {
        editor.orientSideBar();
    }
}