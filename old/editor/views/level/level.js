import { createAndRunScript, destroyScript } from "../../../../src/compiler/compiler.js";
import { View } from "../view.js";
export class Level extends View {
    //linkedFiles: CBFile[]=[];
    constructor(view) {
        super(view);
        this.viewName = "Level";
        createAndRunScript();
    }
    destroy() {
        this.viewOutline.editor.topbar.playButton.toggle(false);
        destroyScript();
        super.destroy();
    }
}
