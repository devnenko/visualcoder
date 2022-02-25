import { createAndRunScript, destroyScript } from "../../code/compiler.js";
import { AllFunctions } from "../../save_file/ge_lib.js";
import { ViewContentArea } from "./view.js";
export class Scene extends ViewContentArea {
    constructor(parent, canvas) {
        super(parent, canvas, "Scene");
        const scriptString = JSON.stringify([AllFunctions.LogConsoleTest]);
        //console.log(scriptString);
        window.localStorage.setItem("test", scriptString);
        createAndRunScript();
    }
    destroyHierarchy() {
        destroyScript();
        super.destroyHierarchy();
    }
}
