import { Canvas } from './canvas.js';
import { Rect } from './ui/rect.js';
import {MouseState} from './mouse_state.js';
import {View} from './ui/view.js';
import {TopBar} from './ui/topbar.js';

console.time('LoadApplication')

window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin="0px";

MouseState.init();

var canvas = new Canvas();

var view=new View(canvas);

var actionbar=new TopBar(canvas);
actionbar.addButton();
actionbar.addButton();
actionbar.addButton();

canvas.logShapes();

console.timeEnd('LoadApplication')