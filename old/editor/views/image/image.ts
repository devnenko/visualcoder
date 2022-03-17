import { createAndRunScript, destroyScript } from "../../../../src/compiler/compiler.js";
import { View, ViewOutline } from "../view.js";
import {Rect,Canvas,boundingShape} from "../../../ui/ui.js";
import {} from "../../../ui/types/types.js";

export class PixelImage extends View{
    viewName: string="PixelImage";
    constructor(view:ViewOutline){
        super(view)
        const mainImage=new Rect();
        mainImage.addConfig({
            parent:this
        })
        mainImage.image=new Image();
        mainImage.image.src="/icons/trash.svg"
        mainImage.image.onload=function() {
            boundingShape.draw();
        }
    }
}
