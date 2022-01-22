
import { Canvas } from "../canvas.js";
import { boundingShape } from "../shape.js";

//add info here
//

export class ResizeHandler{

    public static canvases:Canvas[]=[];

    static init(){
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow.bind(this));
        screen.orientation.addEventListener('change', this.resizeWindow.bind(this))
    }

    static resizeWindow() {
        for (const canvas of this.canvases){
            canvas.resize();
        }
        boundingShape.drawHierarchy();
    }
}