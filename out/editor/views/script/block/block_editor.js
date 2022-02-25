import { PinType, FunctionNames2 } from "../../../../compiler/compiler.js";
import { HoverPressButton } from "../../../../ui_components/ui_components.js";
import { ViewContentArea } from "./../../views.js";
import { Rect, VerticalBox, TextBox, Line, colorCreator, boundingShape } from "../../../../ui/ui.js";
import { EConstraintsY, EMouseType } from "../../../../ui/types/types.js";
import { MouseHandler, KeypressHandler } from "../../../../ui/event_handlers/event_handlers.js";
export class Pin extends Rect {
    constructor(parent, canvas, isInPin, pinVal) {
        super(parent, canvas);
        this.prevLine = null;
        this.nextLine = null;
        this.repValue = "hello";
        this.text = null;
        this.parent = parent;
        MouseHandler.subscribe(this);
        this.fixedSize.w = 20;
        this.fixedSize.h = 20;
        this.color = colorCreator.colorByBrightness(100);
        this.isInPin = isInPin;
        this.pinVal = pinVal;
        if (isInPin == true) {
            this.fixedOffset.y = 35 + 25 * parent.inPins.length;
            parent.inPins.push(this);
        }
        else {
            this.fixedOffset.x = parent.fixedSize.w - this.fixedSize.w;
            this.fixedOffset.y = 35 + 25 * parent.outPins.length;
            parent.outPins.push(this);
            this.text = null;
        }
    }
    onMouseDown(type, pos, topMost) {
        this.prevLine = new Line(this, this.canvas);
        this.prevLine.obj1 = this;
        this.prevLine.fixedPos2 = pos;
    }
    onMouseMoveDown(type, pos) {
        if (this.prevLine instanceof Line) {
            this.prevLine.fixedPos2 = pos;
            boundingShape.drawHierarchy;
        }
    }
    onMouseUp(type, pos, topMost) {
        const overlapp = MouseHandler.getOverlapp(pos);
        const top = MouseHandler.getTopMost(overlapp);
        for (const topObj of top) {
            if (topObj instanceof Pin) {
                if (this.prevLine instanceof Line) {
                    if (this.isInPin == false) {
                        this.nextLine = new Line(this, this.canvas);
                        this.nextLine.obj1 = this;
                        this.nextLine.obj2 = topObj;
                    }
                    else {
                        topObj.nextLine = new Line(this, this.canvas);
                        topObj.nextLine.obj1 = topObj;
                        topObj.nextLine.obj2 = this;
                    }
                    this.parent.parent.createSaveFile();
                }
                break;
            }
        }
        if (top.includes(this)) {
            if (this.isInPin == true) {
                KeypressHandler.subscribe(this);
            }
        }
        this.prevLine?.destroy();
        this.prevLine = null;
        boundingShape.drawHierarchy;
    }
    onKeyPress(key) {
        if (this.text != null) {
            if (key == "Backspace") {
                this.repValue = this.text.text.slice(0, -1);
                this.parent.parent.createSaveFile();
            }
            else if (key != "Escape") {
                this.repValue = this.text.text.concat(key);
                this.parent.parent.createSaveFile();
            }
            if (key == "Escape") {
                KeypressHandler.unsubscribe(this);
            }
            this.text.text = this.repValue;
            boundingShape.drawHierarchy();
        }
    }
}
export class Block extends Rect {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.mouseOffsetBlock = { x: 0, y: 0 };
        this.inPins = [];
        this.outPins = [];
        this.parent = parent;
        MouseHandler.subscribe(this);
        this.fixedSize.w = 140;
        this.color = colorCreator.colorByBrightness(10);
        this.title = new TextBox(this, this.canvas);
        this.title.text = "block";
        this.title.color = "white";
    }
    onMouseDown(type, pos, topMost) {
        if (topMost == true) {
            this.mouseOffsetBlock = { x: pos.x - this.absEdges.left, y: pos.y - this.absEdges.top };
        }
    }
    onMouseMoveDown(type, pos, topMost) {
        if (topMost == true) {
            const relPos = MouseHandler.getRelativeMousePos(this.parent, pos);
            this.fixedOffset.x = relPos.x - this.mouseOffsetBlock.x;
            this.fixedOffset.y = relPos.y - this.mouseOffsetBlock.y;
        }
    }
}
export class BlockSelector extends VerticalBox {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.buttons = [];
        this.fixedSize.w = 160;
        this.fixedSize.h = FunctionNames2.length * 60;
        this.color = colorCreator.colorByBrightness(10);
        this.addButton();
    }
    addButton() {
        for (const fn of FunctionNames2) {
            const button = new HoverPressButton(this, this.canvas);
            button.constY = EConstraintsY.top;
            button.snapMargin = 5;
            button.title.size = 18;
            button.title.text = fn.functionName;
            button.onCLick = (type, pos) => {
                const block = new Block(this.parent, this.parent.canvas);
                block.fixedOffset = MouseHandler.getRelativeMousePos(this.parent, pos);
                block.title.text = fn.functionName;
                if (fn.args?.in != undefined) {
                    for (const inArgs of fn.args.in) {
                        const pin = new Pin(block, block.canvas, true, inArgs);
                        switch (inArgs.pinType) {
                            case PinType.exec:
                                pin.color = "blue";
                                break;
                            case PinType.string:
                                pin.color = "green";
                                pin.text = new TextBox(pin, pin.canvas);
                                pin.text.color = "red";
                                pin.text.text = inArgs.value;
                                break;
                            default:
                                pin.color = "pink";
                                break;
                        }
                    }
                }
                if (fn.args?.out != undefined) {
                    for (const outArgs of fn.args.out) {
                        const pin = new Pin(block, block.canvas, false, outArgs);
                        switch (outArgs.pinType) {
                            case PinType.exec:
                                pin.color = "blue";
                                break;
                            case PinType.string:
                                pin.color = "green";
                                pin.text = new TextBox(this, this.canvas);
                                pin.text.color = "red";
                                pin.text.text = outArgs.value;
                                break;
                            default:
                                pin.color = "pink";
                                break;
                        }
                    }
                }
            };
        }
    }
}
//maybe extend viewcontentarea to fileviewcontent or something to bind file change events to all instances of class
//do later when ideas more clear though
export class BlockEditor extends ViewContentArea {
    constructor(parent, canvas) {
        super(parent, canvas, "BlockEditor");
        this.selector = null;
        MouseHandler.subscribe(this);
        //this.showDebugSrc();
    }
    onMouseDown(type, pos, topMost) {
        if (topMost == true && (type == EMouseType.left || type == EMouseType.touch)) {
            if (this.selector == null) {
                this.selector = new BlockSelector(this, this.canvas);
                this.selector.fixedOffset = MouseHandler.getRelativeMousePos(this, pos);
            }
            this.selector.fixedOffset = MouseHandler.getRelativeMousePos(this, pos);
            //const block = new Block(this, this.canvas);
            //block.fixedPos = MouseHandler.getRelativeMousePos(this,pos);
            //boundingShape.drawHierarchy();
        }
        else {
            if (this.selector != null) {
                this.selector.destroy();
                this.selector = null;
            }
        }
    }
    createSaveFile() {
        //creates a json compatible with compiler from blocks
        const startBlock = this.children.find(element => element.title.text == "Start");
        let currentBlock = startBlock;
        const saveFile = { functions: [] };
        let shouldContinue = true;
        while (shouldContinue == true) {
            if (currentBlock.outPins.find(el => el.pinVal.pinType == PinType.exec)) {
                const nextOutPin = currentBlock.outPins.find(el => el.pinVal.pinType == PinType.exec);
                if (nextOutPin.nextLine && nextOutPin.nextLine.obj2) {
                    currentBlock = nextOutPin.nextLine.obj2.parent;
                    const command = currentBlock.title.text;
                    const commandObj = {
                        functionName: command,
                        args: { in: [], out: [] }
                    };
                    for (const inPin of currentBlock.inPins) {
                        if (inPin.pinVal.value) {
                            commandObj.args.in.push({ pinType: inPin.pinVal.pinType, value: inPin.pinVal.value });
                        }
                        else {
                            commandObj.args.in.push({ pinType: inPin.pinVal.pinType });
                        }
                    }
                    for (const outPin of currentBlock.outPins) {
                        if (outPin.pinVal.value) {
                            commandObj.args.out.push({ pinType: outPin.pinVal.pinType, value: outPin.pinVal.value });
                        }
                        else {
                            commandObj.args.out.push({ pinType: outPin.pinVal.pinType });
                        }
                    }
                    saveFile.functions.push(commandObj);
                }
                else {
                    shouldContinue = false;
                }
            }
            else {
                shouldContinue = false;
            }
        }
        const scriptString = JSON.stringify(saveFile);
        console.log(scriptString);
        //this.file.src=scriptString;
        window.localStorage.setItem("hi", scriptString);
    }
    findInArray(array, pinType) {
        return array.find(el => el.pinVal.pinType == PinType.exec);
    }
    changeFile() {
    }
}
