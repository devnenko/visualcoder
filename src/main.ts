import { Canvas } from './canvas.js';
import { Rect } from './rect.js';

window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin="0px";

var canvas = new Canvas();
var boundingBox = new Rect();
canvas.startDraw(boundingBox);
boundingBox.color="black"
boundingBox.resize();
canvas.updateContent();
console.log(boundingBox)

var tabbar = new Rect();
canvas.startDraw(tabbar);
tabbar.setParent(boundingBox);
tabbar.setStretchTo({top:true,left:true,right:true});
tabbar.setFixedOffset({bottom:45});
tabbar.color="green"
tabbar.resize();
canvas.updateContent();
console.log(tabbar)