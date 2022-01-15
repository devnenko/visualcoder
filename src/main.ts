import { WelcomePage } from "./ui_components/welcome_page/welcome_page_creator.js";
import {ResizeHandler,MouseHandler,Canvas,BoundingRect} from "./ui/ui.js";

window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin="0px";
document.body.style.position="relative";
document.body.style.overflow="hidden";

ResizeHandler.init();
MouseHandler.init();

const canvas=new Canvas();

WelcomePage.init(canvas);

BoundingRect.drawHierarchy();