
import { Canvas } from "../canvas.js";
import { boundingShape } from "../ui.js";

//add info here
//

export class ResizeHandler{

    public static canvases:Canvas[]=[];

    static init(){
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow.bind(this));
        window.addEventListener("orientationchange", this.resizeWindow.bind(this));
        document.addEventListener("visibilitychange", this.visibilityChange.bind(this));
        document.addEventListener("webkitvisibilitychange", this.visibilityChange.bind(this));
        //screen.orientation.addEventListener('change', this.resizeWindow.bind(this))
    }

    static resizeWindow() {
        for (const canvas of this.canvases){
            canvas.resize();
        }
        boundingShape.draw();
    }

    static visibilityChange(event:ResizeHandler){
        this.resizeWindow();
    }
}