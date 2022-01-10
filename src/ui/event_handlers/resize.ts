import { BoundingRect } from "../bounding_rect.js";
import { Canvas } from "../canvas.js";

//add info here
//

export class ResizeHandler{

    public static canvases:Canvas[]=[];

    static init(){
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow.bind(this));
    }

    static resizeWindow() {
        for (const canvas of this.canvases){
            canvas.resize();
        }
        BoundingRect.drawHierarchy();
    }
}