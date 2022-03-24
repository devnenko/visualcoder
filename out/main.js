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
        let nextBox = boundingRect.children[0].children[1];
        console.log(nextBox.children);
    }
    if (e.code == "KeyR") {
        console.log(boundingRect.children);
    }
}
function logNextGen(obj, allShapesStr) {
    allShapesStr = allShapesStr.concat("=>");
    obj.children.forEach(el => {
        allShapesStr = allShapesStr.concat(el.constructor.name);
        el.children.forEach(el => {
            allShapesStr = logNextGen(el, allShapesStr);
        });
    });
    return allShapesStr;
}
