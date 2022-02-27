import { createAndRunScript, destroyScript } from "../../../compiler/compiler.js";
import { ViewContentArea } from "../view.js";
export class Scene extends ViewContentArea {
    constructor(view) {
        super(view);
        this.viewName = "Scene";
        createAndRunScript();
    }
    destroy() {
        this.view.editor.topbar.playButton.toggle(false);
        destroyScript();
        super.destroy();
    }
}
