import { Block, blockHandlers, blocks, removeBlocks } from "./block.js";
import { BoundingRect } from "./ui/bounding_rect.js";
import { MouseHandler } from "./ui/event_handlers/mouse.js";
import { ResizeHandler } from "./ui/event_handlers/resize.js";
import { ViewBlock } from "./ui_components/view/view_block.js";
import { WindowComponents } from "./ui_components/window_components.js";
window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin = "0px";
document.body.style.position = "relative";
document.body.style.overflow = "hidden";
ResizeHandler.init();
MouseHandler.init();
export const components = new WindowComponents();
function stringToHueColor(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var h = hash % 360;
    return h;
}
export function getDampedColor(color) {
    return "hsl(" + stringToHueColor(color) + ",30%,60%)";
}
const entry = new Block(getDampedColor("blue"), "test1");
const entry2 = new Block(getDampedColor("orange"), "test2");
const entry3 = new Block(getDampedColor("green"), "test3");
//entry.pins.push(PinType.out);
//const end =new Block("purple","out");
//end.pins.push(PinType.in);
BoundingRect.drawHierarchy();
let BlockSave = [];
document.addEventListener('keypress', logKey);
function logKey(e) {
    if (e.code == "KeyQ") {
        console.log(components.view);
        console.log(blocks);
        for (const BlockHandler of blockHandlers) {
            BlockHandler.updateBlocks(blocks);
        }
    }
    if (e.code == "KeyT") {
        new Block("purple", "out");
    }
    if (e.code == "KeyS") {
        //BlockSave=Array.from(components.view.children);
        console.log(blocks);
        const res = JSON.stringify(blocks, replacer);
        console.log(res);
        localStorage.setItem("myItem", res);
    }
    if (e.code == "KeyL") {
        var myDataString = (localStorage.getItem("myItem"));
        if (myDataString != null) {
            const blocksOld = JSON.parse(myDataString);
            console.log(blocksOld);
            removeBlocks();
            for (const blockOld of blocksOld) {
                new Block(blockOld.color, blockOld.name);
            }
            for (var i = 0; i < blocksOld.length; i++) {
                const newBlock = blocks[i];
                const newBlocks = blocks;
                const oldBlock = blocksOld[i];
                const oldBlocks = blocksOld;
                for (const oldBlockViewBlock of oldBlock.source) {
                    for (const newNewBlock of newBlocks) {
                        if (newNewBlock.name == oldBlockViewBlock.block.name) {
                            newBlock.source.push(new ViewBlock(components.view, oldBlockViewBlock.fixedPos, newNewBlock));
                        }
                    }
                }
            }
            components.view.load(blocks[0]);
            for (const BlockHandler of blockHandlers) {
                BlockHandler.updateBlocks(blocksOld);
            }
        }
    }
}
function replacer(name, val) {
    console.log("one"); //make this with a blocksave probably better
    console.log(name);
    if (name === '') { // 
        return val; // remove from results
    }
    else if (isNaN(+name) == false) { // 
        return val; // remove from results
    }
    else if (name == 'name') { // 
        return val; // remove from results
    }
    else if (name == 'color') { // 
        return val; // remove from results
    }
    else if (name == 'source') { // 
        return val; // remove from results
    }
    else {
        return undefined; // return as is
    }
}
;
//need to create a hierarchy system for the nodes
//main=>test3=>test1=>test2=>test3
/*

import { Block } from './block.js';
import { ExtensionManager } from './extension/extensions.js';
import { MouseState } from './mouse_state.js';
import { Canvas } from './ui/canvas.js';
import { ViewBlock, PinType } from './ui_components/view_block.js';
import { WindowComponents } from './ui_components/window_components.js';

window.addEventListener("contextmenu", e => e.preventDefault());
document.body.style.margin="0px";

MouseState.init();

export const components=new WindowComponents();
new Block("green",[PinType.in,PinType.out])
//const block=new Block(components.view,components.view.canvas);
//block.addPin(PinType.in);
//block.addPin(PinType.in);
Canvas.boundingRect.update();
console.log(components)
//const mg=new ExtensionManager();
//mg.loadExtension('extension/ext.js')

if (typeof(Storage) !== "undefined") {
    localStorage.setItem("test", "hie");
    localStorage.removeItem("test");
} else {
    throw new Error('Storage Api not supported');
}

console.log(localStorage.getItem("test"))

*/ 
