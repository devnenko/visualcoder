import { PinType, FunctionNames2 } from "../../../../compiler/compiler.js";
import { HoverPressButton } from "../../../../ui_components/ui_components.js";
import { Rect, TextBox, Line, colorCreator, boundingShape } from "../../../../ui/ui.js";
import { EConstraintsX, EConstraintsY, EMouseType } from "../../../../ui/types/types.js";
import { MouseHandler, KeypressHandler } from "../../../../ui/event_handlers/event_handlers.js";
import { Clickable } from "../../../../ui/clickable.js";
import { ViewContentArea } from "../../view.js";
import { ERectType } from "../../../../ui/shape.js";
export class Pin extends Clickable {
    constructor(block, isInPin, pinVal) {
        super();
        this.prevLine = null;
        this.nextLine = null;
        this.repValue = "hello";
        this.text = null;
        this.block = block;
        this.createConfig({
            parent: block,
            fixedSizeW: 20,
            fixedSizeH: 20,
            color: colorCreator.colorByBrightness(100)
        });
        this.isInPin = isInPin;
        this.pinVal = pinVal;
        if (isInPin == true) {
            this.createConfig({
                fixedOffsetY: 35 + 25 * block.inPins.length
            });
            block.inPins.push(this);
        }
        else {
            this.createConfig({
                constraintX: EConstraintsX.right,
                fixedOffsetY: 35 + 25 * block.outPins.length
            });
            block.outPins.push(this);
            this.text = null;
        }
    }
    onMouseDown(type, pos, topMost) {
        this.prevLine = new Line();
        this.prevLine.createConfig({
            parent: this
        });
        this.prevLine.obj1 = this;
        this.prevLine.fixedPos2 = pos;
    }
    onMouseMoveDown(type, pos) {
        if (this.prevLine instanceof Line) {
            this.prevLine.fixedPos2 = pos;
            boundingShape.draw();
        }
    }
    onMouseUp(type, pos, topMost) {
        const overlapp = MouseHandler.getOverlapp(pos);
        const top = MouseHandler.getTopMost(overlapp);
        for (const topObj of top) {
            if (topObj instanceof Pin) {
                if (this.prevLine instanceof Line) {
                    if (this.isInPin == false) {
                        this.nextLine = new Line();
                        this.nextLine.setParent(this);
                        this.nextLine.obj1 = this;
                        this.nextLine.obj2 = topObj;
                    }
                    else {
                        topObj.nextLine = new Line();
                        topObj.nextLine.setParent(this);
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
        boundingShape.draw();
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
            boundingShape.draw();
        }
    }
}
export class Block extends Clickable {
    constructor(blockEditor) {
        super();
        this.mouseOffsetBlock = { x: 0, y: 0 };
        this.inPins = [];
        this.outPins = [];
        this.blockEditor = blockEditor;
        this.setParent(blockEditor);
        this.createConfig({
            fixedSizeW: 140,
            color: colorCreator.colorByBrightness(10)
        });
        this.title = new TextBox();
        this.title.createConfig({
            parent: this,
            text: "block"
        });
    }
    onMouseDown(type, pos, topMost) {
        if (topMost == true) {
            this.blockEditor.selector?.destroy();
            this.blockEditor.selector = null;
            this.mouseOffsetBlock = { x: pos.x - this.absEdges.left, y: pos.y - this.absEdges.top };
        }
    }
    onMouseMoveDown(type, pos, topMost) {
        if (topMost == true) {
            const relPos = MouseHandler.getRelativeMousePos(this.parent, pos);
            this.createConfig({
                fixedOffsetX: relPos.x - this.mouseOffsetBlock.x,
                fixedOffsetY: relPos.y - this.mouseOffsetBlock.y
            });
        }
    }
}
export class BlockSelector extends Rect {
    constructor(blockEditor) {
        super();
        this.buttons = [];
        this.blockEditor = blockEditor;
        this.createConfig({
            rectType: ERectType.VtBox,
            parent: blockEditor,
            fixedSizeW: 160,
            fixedSizeH: FunctionNames2.length * 60,
            color: colorCreator.colorByBrightness(10)
        });
        this.addAllButtons();
    }
    addAllButtons() {
        for (const fn of FunctionNames2) {
            const button = new HoverPressButton();
            button.createConfig({
                parent: this,
                constraintY: EConstraintsY.top,
                fixedSizeH: 60,
                snapMargin: 5,
                onPress: (type, pos) => {
                    this.blockEditor.selector?.destroy();
                    this.blockEditor.selector = null;
                    const block = new Block(this.blockEditor);
                    block.createConfig({
                        fixedOffsetX: MouseHandler.getRelativeMousePos(this.parent, pos).x,
                        fixedOffsetY: MouseHandler.getRelativeMousePos(this.parent, pos).y
                    });
                    block.title.setText(fn.functionName);
                    if (fn.args?.in != undefined) {
                        for (const inArgs of fn.args.in) {
                            const pin = new Pin(block, true, inArgs);
                            switch (inArgs.pinType) {
                                case PinType.exec:
                                    pin.createConfig({
                                        color: "blue"
                                    });
                                    break;
                                case PinType.string:
                                    pin.createConfig({
                                        color: "green"
                                    });
                                    pin.text = new TextBox();
                                    pin.text.createConfig({
                                        parent: pin,
                                        color: "red",
                                        text: inArgs.value
                                    });
                                    break;
                                default:
                                    pin.createConfig({
                                        color: "pink"
                                    });
                                    break;
                            }
                        }
                    }
                    if (fn.args?.out != undefined) {
                        for (const outArgs of fn.args.out) {
                            const pin = new Pin(block, false, outArgs);
                            switch (outArgs.pinType) {
                                case PinType.exec:
                                    pin.createConfig({
                                        color: "blue"
                                    });
                                    break;
                                case PinType.string:
                                    pin.createConfig({
                                        color: "green"
                                    });
                                    pin.text = new TextBox();
                                    pin.text.createConfig({
                                        parent: pin,
                                        color: "red",
                                        text: outArgs.value
                                    });
                                    break;
                                default:
                                    pin.createConfig({
                                        color: "pink"
                                    });
                                    break;
                            }
                        }
                    }
                }
            });
            button.createTitle();
            button.title?.createConfig({
                size: 18,
                text: fn.functionName
            });
        }
    }
}
//maybe extend viewcontentarea to fileviewcontent or something to bind file change events to all instances of class
//do later when ideas more clear though
export class BlockEditor extends ViewContentArea {
    constructor(view) {
        super(view);
        this.selector = null;
        this.viewName = "BlockEditor";
        //this.showDebugSrc();
    }
    onMouseDown(type, pos, topMost) {
        console.log();
        if (topMost == true && (type == EMouseType.left || type == EMouseType.touch)) {
            if (this.selector == null) {
                this.selector = new BlockSelector(this);
            }
            this.selector.createConfig({
                fixedOffsetX: MouseHandler.getRelativeMousePos(this, pos).x,
                fixedOffsetY: MouseHandler.getRelativeMousePos(this, pos).y
            });
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
                    currentBlock = nextOutPin.nextLine.obj2.block;
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
