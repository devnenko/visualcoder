import { boundingRect } from "./ui/bounding_rect.js";
import { MakeClickable } from "./ui/clickable_rect.js";
import { MouseHandler, mouseHandler } from "./ui/event_handlers/mouse.js";
import { SvgRect, SvgObj } from "./ui/svg_rect.js";
import { EConstraintsX, EConstraintsY, Rect } from "./ui/rect.js";
import { TextRect } from "./ui/text_rect.js";
import { MakeHoverPressButton} from "./ui_components/button.js";
import { BrowserSpec } from "./util/browser_spec.js";
import { Editor } from "./editor/editor.js";
import { ResizeHandler } from "./ui/event_handlers/resize.js";
import { KeypressHandler } from "./ui/event_handlers/keypress.js";
import { allAssets, AssetType, createAsset } from "./editor/asset.js";


BrowserSpec.initDocBody();
ResizeHandler.init();
KeypressHandler.init();

//const r1=new Rect
//r1.sFillSpace()
//console.log(r1)
//r1.resAndDraw(false);
//const r2=new Rect

export const editor=new Editor();
createAsset("level1",AssetType.level)
createAsset("script1",AssetType.script)
//editor.addView(editor.contBrowserCont)
//boundingRect.draw();


////for debugging with keypresses
document.addEventListener('keypress', logKey);
function logKey(e: KeyboardEvent) {
    if (e.code == "KeyQ") {
        //console.log(editor.)
    }
    if (e.code == "KeyR") {
        console.log(boundingRect.allShapes)
    }
    if (e.code == "KeyS") {
        editor.viewBox.refreshInBetween();
    }
    if (e.code == "KeyX") {
        boundingRect.draw();
    }
}
