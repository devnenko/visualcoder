import { createAndRunScript, destroyScript } from "../../../compiler/compiler.js";
import { ViewContentArea } from "../view.js";
import {Rect,Canvas} from "../../../ui/ui.js";
import {} from "../../../ui/types/types.js";
import { View } from "../views.js";

export class Scene extends ViewContentArea{
    constructor(view:View){
        super(view)


        createAndRunScript();
    }
    destroy(): void {
        destroyScript();
        super.destroy();
    }
}
