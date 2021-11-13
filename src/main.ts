import { Canvas } from './canvas.js';
import { Rect } from './rect.js';

window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin="0px";

var canvas = new Canvas();
var Tabbar = new Rect();
canvas.startDraw(Tabbar);
Tabbar.color="black"
Tabbar.setMargin({left:0,right:0,top:0})
Tabbar.setFixedOffset({bottom:50})
console.log(Tabbar)
canvas.updateContent();