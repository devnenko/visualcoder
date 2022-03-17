import { createAndRunScript, destroyScript } from "../../../../src/compiler/compiler.js";
import {Rect,Canvas} from "../../../ui/ui.js";
import {} from "../../../ui/types/types.js";
import { View, ViewOutline } from "../view.js";

export class Level extends View{
    viewName: string="Level";
    //linkedFiles: CBFile[]=[];
    constructor(view:ViewOutline){
        super(view) 


        createAndRunScript();
    }
    destroy(): void {
        this.viewOutline.editor.topbar.playButton.toggle(false);
        destroyScript();
        super.destroy();
    }
}
