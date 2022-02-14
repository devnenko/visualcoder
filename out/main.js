import { Canvas } from "./ui/canvas.js";
import { colorCreator } from "./ui/color.js";
import { KeypressHandler } from "./ui/event_handlers/keypress.js";
import { MouseHandler } from "./ui/event_handlers/mouse.js";
import { ResizeHandler } from "./ui/event_handlers/resize.js";
import { boundingShape } from "./ui/shape.js";
import { Editor } from "./ui_components/editor.js";
window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin = "0px";
document.body.style.position = "fixed";
document.body.style.overflow = "hidden";
document.body.style.width = "100%";
document.body.style.height = "100%";
document.body.style.backgroundColor = colorCreator.colorByBrightness(20);
ResizeHandler.init();
MouseHandler.init();
KeypressHandler.init();
//DragFileHandler.init();
const canvas = new Canvas();
export const editor = new Editor(boundingShape, canvas);
boundingShape.drawHierarchy();
console.log(boundingShape);
//window.open("frame1.html", "_blank");
document.addEventListener('keypress', logKey);
function logKey(e) {
    if (e.code == "KeyQ") {
        console.log(boundingShape);
    }
    if (e.code == "KeyS") {
        console.log(MouseHandler.callbackObjects);
    }
}
