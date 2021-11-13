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

var child = new Rect();
canvas.startDraw(child);
child.setParent(boundingBox);
child.setMargin({bottom:100});
child.color="green"
child.resize();
canvas.updateContent();
console.log(child)

var child2 = new Rect();
canvas.startDraw(child2);
child2.setParent(child);
child2.setMargin({bottom:100,left:100});
child2.color="blue"
child2.resize();
canvas.updateContent();
console.log(child2)

var child3 = new Rect();
canvas.startDraw(child3);
child3.setParent(child2);
child3.setMargin({bottom:100,left:100,right:40});
child3.color="pink"
child3.resize();
canvas.updateContent();
console.log(child3)