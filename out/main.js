import { boundingRect } from "./ui/bounding_rect.js";
import { ResizeHandler } from "./ui/event_handlers/resize.js";
import { BrowserSpec } from "./util/browser_spec.js";
import { Editor } from "./editor/editor.js";
BrowserSpec.initDocBody();
ResizeHandler.init();
export const editor = new Editor();
//for debugging with keypresses
document.addEventListener('keypress', logKey);
function logKey(e) {
    if (e.code == "KeyQ") {
        console.log(boundingRect.children);
    }
}
