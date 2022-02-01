
import { Button } from "./ui/button.js";
import { Canvas } from "./ui/canvas.js";
import { DragFileHandler } from "./ui/event_handlers/drag_file.js";
import { MouseHandler } from "./ui/event_handlers/mouse.js";
import { ResizeHandler } from "./ui/event_handlers/resize.js";
import { Rect } from "./ui/rect.js";
import { boundingShape } from "./ui/shape.js";
import { EConstraintsX, EConstraintsY } from "./ui/types/constraints.js";
import { EMouseType } from "./ui/types/mouse.js";
import { ContentBrowser } from "./ui_components/editor2/content_browser.js";
import { Editor } from "./ui_components/editor3/editor.js";
import { WelcomePage } from "./ui_components/welcome_page/welcome_page.js";

window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin="0px";
document.body.style.position="fixed";
document.body.style.overflow="hidden";
document.body.style.width="100%";
document.body.style.height="100%";

  


ResizeHandler.init();
MouseHandler.init();
//DragFileHandler.init();

const canvas=new Canvas();

export const editor=new Editor(boundingShape,canvas)

boundingShape.drawHierarchy();
console.log(boundingShape)

document.addEventListener('keypress', logKey);
function logKey(e:KeyboardEvent) {
  if(e.code=="KeyQ"){
    console.log(boundingShape)
  }

}