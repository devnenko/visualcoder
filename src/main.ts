import { ResizeHandler, MouseHandler, KeypressHandler } from "./ui/event_handlers/event_handlers.js";
import { Rect,Canvas, boundingShape,colorCreator } from "./ui/ui.js";
import { EConstraintsX, EConstraintsY ,EMouseType,IPos} from "./ui/types/types.js";
import { Editor } from "./editor/editor.js";
import { TextBox } from "./ui/text_box.js";
import { Clickable } from "./ui/clickable.js";
import { HoverPressButton, ToggleButton } from "./ui_components/button.js";
import { TextInput } from "./ui_components/text_input.js";



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

//const r1 = new Rect({
//  color:"red",
//  constraintX:EConstraintsX.scale
//});
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
//const b1=new Clickable({
//  onMouseHoverBegin:()=>{b1.createConfig({color:"purple"})},
//  onMouseHoverEnd:()=>{b1.createConfig({color:"orange"})},
//  color:"orange",
//  fixedOffsetX:200
//});
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