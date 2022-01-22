
import { Button } from "./ui/button.js";
import { Canvas } from "./ui/canvas.js";
import { MouseHandler } from "./ui/event_handlers/mouse.js";
import { ResizeHandler } from "./ui/event_handlers/resize.js";
import { Rect } from "./ui/rect.js";
import { boundingShape } from "./ui/shape.js";
import { EConstraintsX, EConstraintsY } from "./ui/types/constraints.js";
import { EMouseType } from "./ui/types/mouse.js";
import { ContentBrowser } from "./ui_components/editor2/content_browser.js";
import { Editor } from "./ui_components/editor2/editor.js";
import { WelcomePage } from "./ui_components/welcome_page/welcome_page.js";

window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin="0px";
document.body.style.position="relative";
document.body.style.overflow="hidden";

ResizeHandler.init();
MouseHandler.init();

const canvas=new Canvas();

const editor=new Editor(boundingShape,canvas)

boundingShape.drawHierarchy();
console.log(boundingShape)