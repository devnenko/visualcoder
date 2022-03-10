import { ResizeHandler, MouseHandler, KeypressHandler } from "./ui/event_handlers/event_handlers.js";
import { Rect,Canvas, boundingShape,colorCreator } from "./ui/ui.js";
import { EConstraintsX, EConstraintsY ,EMouseType,IPos} from "./ui/types/types.js";
import { Editor } from "./editor/editor.js";
import { TextBox } from "./ui/text_box.js";
import { applyMixins, Clickable, MakeClickable } from "./ui/clickable.js";
import { HoverPressButton, ToggleButton } from "./ui_components/button.js";
import { TextInput } from "./ui_components/text_input.js";
import { Block, BlockEditor } from "./editor/views/script/block/block_editor.js";
import { recti } from "./ui/rect.js";
import { Level } from "./editor/views/level/level.js";
import { ContentBrowser } from "./editor/views/contentbrowser/content_browser.js";
import Stats from "./Stats.js";
import { ERectType } from "./ui/shape.js";

export let stats = Stats();
stats.showPanel( 2 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );




window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin = "0px";
document.body.style.position = "fixed";
document.body.style.overflow = "hidden";
document.body.style.width = "100%";
document.body.style.height = "100%";
document.body.style.backgroundColor = colorCreator.colorByBrightness(8);




ResizeHandler.init();
MouseHandler.init();
KeypressHandler.init();


export const editor=new Editor()
ResizeHandler.mobileRes();


//for debugging
//document.addEventListener('keypress', logKey);
//function logKey(e: KeyboardEvent) {
//  if (e.code == "KeyQ") {
//    console.log(editor.contentArea)
//  }
//  if (e.code == "KeyS") {
//    console.log(MouseHandler.callbackObjects)
//  }
//  if (e.code == "KeyR") {
//    console.log(MouseHandler.getOverlapp(MouseHandler.currentPos))
//    //console.log(editor.views)
//  }
//  if (e.code == "KeyP") {
//    //compile block code
//    //edt.createSaveFile();
//  }
//  if (e.code == "KeyO") {
//    console.log(editor.findView(Level))
//  }
//}