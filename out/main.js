import { boundingRect } from "./ui/bounding_rect.js";
import { BrowserSpec } from "./util/browser_spec.js";
import { Editor } from "./editor/editor.js";
import { ResizeHandler } from "./ui/event_handlers/resize.js";
import { KeypressHandler } from "./ui/event_handlers/keypress.js";
import { AssetType, createAsset } from "./editor/asset.js";
BrowserSpec.initDocBody();
ResizeHandler.init();
KeypressHandler.init();
//const r1=new Rect
//r1.sFillSpace()
//console.log(r1)
//r1.resAndDraw(false);
//const r2=new Rect
export const editor = new Editor();
createAsset("level1", AssetType.level);
createAsset("script1", AssetType.script);
//editor.addView(editor.contBrowserCont)
//boundingRect.draw();
////for debugging with keypresses
document.addEventListener('keypress', logKey);
function logKey(e) {
    if (e.code == "KeyQ") {
        //console.log(editor.)
    }
    if (e.code == "KeyR") {
        console.log(boundingRect.allShapes);
    }
    if (e.code == "KeyS") {
        editor.viewBox.refreshInBetween();
    }
    if (e.code == "KeyX") {
        boundingRect.draw();
    }
}
