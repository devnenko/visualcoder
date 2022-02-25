import { createAndRunScript, destroyScript } from "../../../compiler/compiler.js";
import { ViewContentArea } from "../view.js";
export class Scene extends ViewContentArea {
    constructor(view) {
        super(view);
        createAndRunScript();
    }
    destroy() {
        destroyScript();
        super.destroy();
    }
}
