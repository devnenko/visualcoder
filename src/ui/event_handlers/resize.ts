
import { Editor } from "../../editor/editor.js";
import { editor } from "../../main.js";
import { BrowserSpecifics } from "../../util/browser_specifics.js";
import { Canvas } from "../canvas.js";
import { ERectType } from "../shape.js";
import { EConstraintsX, EConstraintsY } from "../types/constraints.js";
import { boundingShape } from "../ui.js";

//add info here
//

export class ResizeHandler{

    public static canvases:Canvas[]=[];

    static init(){
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow.bind(this));
        window.addEventListener("orientationchange", this.changeOrientation.bind(this));
        document.addEventListener("visibilitychange", this.visibilityChange.bind(this));
        document.addEventListener("webkitvisibilitychange", this.visibilityChange.bind(this));
        //this.mobileRes();
        //screen.orientation.addEventListener('change', this.resizeWindow.bind(this))
    }

    static changeOrientation(e:any){
        console.log(screen.orientation)
        this.mobileRes();
        this.resizeWindow();
    }

    static resizeWindow() {
        for (const canvas of this.canvases){
            canvas.resize();
        }
        boundingShape.draw();
    }

    static visibilityChange(e:any){
        this.mobileRes();
        this.resizeWindow();
    }

    static mobileRes(){
        console.log(window.orientation)
        if(window.orientation==90){
            editor.addConfig({
                rectType:ERectType.HzBox
            })
            editor.topbar.addConfig({
                rectType:ERectType.VtBox,
                constraintX:EConstraintsX.left,
                constraintY:EConstraintsY.scale
            })
            editor.topbar.children.forEach(e=>e.addConfig({
                constraintX:EConstraintsX.scale,
                constraintY:EConstraintsY.top
            }))
        }
        else{
            editor.addConfig({
                rectType:ERectType.VtBox
            })
            editor.topbar.addConfig({
                rectType:ERectType.HzBox,
                constraintX:EConstraintsX.scale,
                constraintY:EConstraintsY.top
            })
            editor.topbar.children.forEach(e=>e.addConfig({
                constraintX:EConstraintsX.left,
                constraintY:EConstraintsY.scale
            }))
        }
    }
}