import { boundingRect } from "./ui/bounding_rect.js";
import { MakeClickable } from "./ui/clickable_rect.js";
import { MouseHandler, mouseHandler } from "./ui/event_handlers/mouse.js";
import { ResizeHandler } from "./ui/event_handlers/resize.js";
import { HzBox } from "./ui/hz_box.js";
import { SvgRect, SvgObj } from "./ui/svg_rect.js";
import { EConstraintsX, EConstraintsY, Rect } from "./ui/rect.js";
import { TextRect } from "./ui/text_rect.js";
import { VtBox } from "./ui/vt_box.js";
import { MakeHoverPressButton, MakeToggleButton, ToggleButtonGroup } from "./ui_components/button.js";
import { BrowserSpec } from "./util/browser_spec.js";
import { Editor } from "./editor/editor.js";


BrowserSpec.initDocBody();
ResizeHandler.init();

export const editor=new Editor();



//for debugging with keypresses
document.addEventListener('keypress', logKey);
function logKey(e: KeyboardEvent) {
    if (e.code == "KeyQ") {
        console.log(boundingRect.children)
    }
}
