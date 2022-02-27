import { createAndRunScript, destroyScript } from "../../../compiler/compiler.js";
import { ViewContentArea } from "../view.js";
import {Rect,Canvas,boundingShape} from "../../../ui/ui.js";
import {} from "../../../ui/types/types.js";
import { View } from "../views.js";

export class PixelImage extends ViewContentArea{
    viewName: string="PixelImage";
    constructor(view:View){
        super(view)
        const mainImage=new Rect();
        mainImage.createConfig({
            parent:this
        })
        mainImage.image=new Image();
        mainImage.image.src="/icons/trash.svg"
        mainImage.image.onload=function() {
            boundingShape.draw();
        }
    }
}
