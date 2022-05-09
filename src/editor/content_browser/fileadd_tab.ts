import { boundingRect } from "../../ui/bounding_rect.js";
import { Box, BoxType } from "../../ui/box.js";
import { MakeClickable } from "../../ui/clickable_rect.js";
import { EConstraintsX, EConstraintsY, Rect } from "../../ui/rect.js";
import { MakeHoverPressButton } from "../../ui_components/button.js";
import { FileTypeE } from "../view/view_connections.js";
import { allFiles, ContentBrowser } from "./content_browser.js";

export class FileAddTab extends Rect{
    createButton;
    constructor(contBrow:ContentBrowser){
        super()
        this.sZIndex(30)
            .sParent(contBrow.contArea)
            .sFillSpace()
            .sSnapMargin(40)

        this.createButton=new (MakeHoverPressButton(MakeClickable(Rect)))
        this.createButton.sParent(this)
                        .sConstX(EConstraintsX.right)
                        .sConstY(EConstraintsY.bottom)
                        .sZIndex(40)
                        .sFixedOffset(20)

        this.createButton.onRelease=()=>{
            allFiles.push({name:"addedFile",type:FileTypeE.text,source:"addedSource"})
            this.destroy();
            contBrow.editor.views.forEach(view=>{
                view.refresh();//should only refresh view of same type in future
            })
            boundingRect.draw();
        }
                        
    }
}