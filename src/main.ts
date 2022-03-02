import { ResizeHandler, MouseHandler, KeypressHandler } from "./ui/event_handlers/event_handlers.js";
import { Rect,Canvas, boundingShape,colorCreator } from "./ui/ui.js";
import { EConstraintsX, EConstraintsY ,EMouseType,IPos} from "./ui/types/types.js";
import { Editor } from "./editor/editor.js";
import { TextBox } from "./ui/text_box.js";
import { applyMixins, Clickable, MakeClickable } from "./ui/clickable.js";
import { HoverPressButton, ToggleButton } from "./ui_components/button.js";
import { TextInput } from "./ui_components/text_input.js";
import { Block } from "./editor/views/script/block/block_editor.js";
import { ViewContentArea } from "./editor/views/views.js";
import { recti } from "./ui/rect.js";


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


//DragFileHandler.init();

//const canvas = new Canvas();
//const EightBitSprite = applyMixins(Clickable,[Rect])
//const r1 = new EightBitSprite();
//console.log(r1)
//r1.createConfig({
//  color:"red"
//});
//r1.onMouseDown=()=>{console.log("hi")}

//
//const r2 = new Rect({
//  parent:r1,
//  color:"blue",
//  constraintX:EConstraintsX.center,
//  constraintY:EConstraintsY.bottom,
//  fixedSizeH:40
//});
//
//
//
//
//const t1=new TextBox({
//  text:"hello",
//  color:"white",
//  size:30,
//  parent:b1
//});

//const b2=new ToggleButton({
//  constraintY:EConstraintsY.top
//});

//console.log(b2)
//const r1=new Rect({
//  color:"blue"
//});
//console.log(r1)
const editor=new Editor()
boundingShape.draw();
//console.log(boundingShape)


//window.open("frame1.html", "_blank");

document.addEventListener('keypress', logKey);
function logKey(e: KeyboardEvent) {
  if (e.code == "KeyQ") {
    console.log(boundingShape)
  }
  if (e.code == "KeyS") {
    console.log(MouseHandler.callbackObjects)
  }
  if (e.code == "KeyR") {
    console.log(MouseHandler.getOverlapp(MouseHandler.currentPos))
    //console.log(editor.views)
  }
  if (e.code == "KeyP") {
    //compile block code
    //edt.createSaveFile();
  }
}