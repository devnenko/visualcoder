import { createAndRunScript, destroyScript } from "../../../compiler/compiler.js";
import { ViewContentArea } from "../view.js";
export class Level extends ViewContentArea {
    constructor(view) {
        super(view);
        this.viewName = "Level";
        this.linkedFiles = [];
        createAndRunScript();
    }
    destroy() {
        this.view.editor.topbar.playButton.toggle(false);
        destroyScript();
        super.destroy();
    }
}
