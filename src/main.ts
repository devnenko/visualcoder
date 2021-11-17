import { Canvas } from './canvas.js';
import { Rect } from './ui/rect.js';
import { Tabbar } from './ui/tabbar.js';
import {MouseState} from './mouse_state.js';

window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin="0px";

MouseState.init();

var canvas = new Canvas();

var tabbar = new Tabbar(canvas);
tabbar.addTab();
tabbar.addTab();
tabbar.addTab();
tabbar.addTab();
tabbar.addTab();
tabbar.addTab();
tabbar.addTab();
tabbar.addTab();
tabbar.addTab();