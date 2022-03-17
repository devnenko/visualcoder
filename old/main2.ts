import { ResizeHandler, MouseHandler, KeypressHandler } from "./ui/event_handlers/event_handlers.js";
import { Rect,Canvas, boundingShape,colorCreator } from "./ui/ui.js";
import { EConstraintsX, EConstraintsY ,EMouseType,IPos} from "./ui/types/types.js";
import { Editor } from "../src/editor/editor.js";
import { TextRect } from "../src/ui/text_rect.js";
import { applyMixins, Clickable, MakeClickable } from "../src/ui/clickable_rect.js";
import { HoverPressButton, ToggleButton } from "../src/ui_components/button.js";
import { TextInput } from "../src/ui_components/text_input.js";
import { Block, BlockEditor } from "../src/editor/views/script/block/block_editor.js";
import { recti } from "../src/ui/rect.js";
import { Level } from "../src/editor/views/level/level.js";
import { ContentBrowser } from "../src/editor/views/contentbrowser/content_browser.js";
import Stats from "../src/Stats.js";
import { ERectType } from "../src/ui/shape.js";

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


//for debugging with keypresses

//document.addEventListener('keypress', logKey);
//function logKey(e: KeyboardEvent) {
//  if (e.code == "KeyQ") {
//    console.log(editor.contentArea)
//  }
