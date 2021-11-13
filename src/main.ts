import { Canvas } from './canvas.js';
import { Rect } from './rect.js';

window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin="0px";

var canvas = new Canvas();
var rect = new Rect();
canvas.startDraw(rect);
rect.setMargin({left:20,right:10});
canvas.updateContent();