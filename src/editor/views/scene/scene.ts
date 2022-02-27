import { createAndRunScript, destroyScript } from "../../../compiler/compiler.js";
import { ViewContentArea } from "../view.js";
import {Rect,Canvas} from "../../../ui/ui.js";
import {} from "../../../ui/types/types.js";
import { View } from "../views.js";

export class Scene extends ViewContentArea{
    viewName: string="Scene";
    constructor(view:View){
        super(view)


        createAndRunScript();
    }
    destroy(): void {
        this.view.editor.topbar.playButton.toggle(false);
        destroyScript();
        super.destroy();
    }
}
