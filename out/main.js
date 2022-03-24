import { boundingRect } from "./ui/bounding_rect.js";
import { BrowserSpec } from "./util/browser_spec.js";
import { Editor } from "./editor/editor.js";
import { ResizeHandler } from "./ui/event_handlers/resize.js";
BrowserSpec.initDocBody();
ResizeHandler.init();
console.log("hi");
//const r1=new Rect
//r1.resAndDraw(false);
//const r2=new Rect
export const editor = new Editor();
////for debugging with keypresses
document.addEventListener('keypress', logKey);
function logKey(e) {
    if (e.code == "KeyQ") {
        let nextBox = boundingRect.children[0].children[1];
        console.log(nextBox.children);
    }
    if (e.code == "KeyR") {
        console.log(boundingRect.allShapes);
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
