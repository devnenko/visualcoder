import { PinVal, PinType, FunctionNames2, IFn, IScript } from "../../../../compiler/compiler.js";
import { HoverPressButton } from "../../../../ui_components/ui_components.js";
import { GeFile } from "./../../views.js";
import { Rect, Canvas, TextBox, Line, colorCreator, IShape, boundingShape } from "../../../../ui/ui.js";
import { EConstraintsX, EConstraintsY, EMouseType, IPos } from "../../../../ui/types/types.js";
import { MouseHandler, IMouseHandler, KeypressHandler, IKeyPressHandler } from "../../../../ui/event_handlers/event_handlers.js";
import { Clickable } from "../../../../ui/clickable.js";
import { ViewContentArea,View } from "../../view.js";
import { ERectType } from "../../../../ui/shape.js";

export class Pin extends Clickable {
    prevLine: Line | null = null;
    nextLine: Line | null = null;
    isInPin: boolean;
    repValue: string = "hello";
    text: TextBox | null = null;
    pinVal: PinVal;
    block: Block;
    constructor(block: Block, isInPin: boolean, pinVal: PinVal) {
        super();
        this.block = block;
        this.addConfig({
            parent: block,
            fixedSizeW: 20,
            fixedSizeH: 20,
            color: colorCreator.colorByBrightness(100)
        });
        this.isInPin = isInPin;
        this.pinVal = pinVal;
        if (isInPin == true) {
            this.addConfig({
                fixedOffsetY: 35 + 25 * block.inPins.length
            });
            block.inPins.push(this);

        }
        else {
            this.addConfig({
                constraintX:EConstraintsX.right,
                fixedOffsetY: 35 + 25 * block.outPins.length
            });
            block.outPins.push(this);

            this.text = null;
        }


    }
    onMouseDown(type: EMouseType, pos: IPos, topMost: boolean) {
        this.prevLine = new Line();
        this.prevLine.addConfig({
            parent: this
        });
        this.prevLine.obj1 = this;
        this.prevLine.fixedPos2 = pos;
    }
    onMouseMoveDown(type: EMouseType, pos: IPos) {
        if (this.prevLine instanceof Line) {
            this.prevLine.fixedPos2 = pos;
            boundingShape.draw();
        }
    }
    onMouseUp(type: EMouseType, pos: IPos, topMost: boolean) {
        const overlapp = MouseHandler.getOverlapp(pos);
        const top = MouseHandler.getTopMost(overlapp);
        for (const topObj of top) {
            if (topObj instanceof Pin) {
                if (this.prevLine instanceof Line) {
                    if (this.isInPin == false) {
                        this.nextLine = new Line();
                        this.nextLine.addConfig({
                            parent:this
                        }) 
                        this.nextLine.obj1 = this;
                        this.nextLine.obj2 = topObj;
                    } else {
                        topObj.nextLine = new Line();
                        topObj.nextLine.addConfig({
                            parent:this
                        }) 
                        topObj.nextLine.obj1 = topObj;
                        topObj.nextLine.obj2 = this;
                    }
                    (this.parent.parent as BlockEditor).createSaveFile();
                }
                break;
            }
        }
        if (top.includes(this)) {
            if (this.isInPin == true) {
                KeypressHandler.subscribe(this)
            }
        }
        this.prevLine?.destroy();
        this.prevLine = null;
        boundingShape.draw();
    }
    onKeyPress(key: string): void {
        if (this.text != null) {
            if (key == "Backspace") {
                this.repValue = this.text.text.slice(0, -1);
                (this.parent.parent as BlockEditor).createSaveFile();
            }
            else if (key != "Escape") {
                this.repValue = this.text.text.concat(key);
                (this.parent.parent as BlockEditor).createSaveFile();
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
    mouseOffsetBlock: IPos = { x: 0, y: 0 }
    title;
    inPins: Pin[] = [];
    outPins: Pin[] = [];
    blockEditor:BlockEditor;
    constructor(blockEditor: BlockEditor) {
        super();
        this.blockEditor=blockEditor;
        this.addConfig({
            parent:blockEditor,
            fixedSizeW: 140,
            color: colorCreator.colorByBrightness(10)
        })

        this.title = new TextBox();
        this.title.addConfig({
            parent: this,
            text: "block"
        })
        console.log("wh")
    }
    onMouseDown(type: EMouseType, pos: IPos, topMost: boolean) {
        console.log("wh")
        if (topMost == true) {
            this.blockEditor.selector?.destroy();
            this.blockEditor.selector=null;
            this.mouseOffsetBlock = { x: pos.x - this.absEdges.left, y: pos.y - this.absEdges.top }
        }
    }
    onMouseMoveDown(type: EMouseType, pos: IPos, topMost: boolean) {
        if (topMost == true) {
            const relPos = MouseHandler.getRelativeMousePos(this.parent as Rect, pos);
            this.addConfig({
                fixedOffsetX: relPos.x - this.mouseOffsetBlock.x,
                fixedOffsetY: relPos.y - this.mouseOffsetBlock.y
            });
        }
    }
}

export class BlockSelector extends Rect {
    buttons: HoverPressButton[] = [];
    blockEditor: BlockEditor;
    constructor(blockEditor: BlockEditor) {
        super();
        this.blockEditor = blockEditor;
        this.addConfig({
            rectType:ERectType.VtBox,
            parent: blockEditor,
            fixedSizeW: 160,
            fixedSizeH: FunctionNames2.length * 60,
            color: colorCreator.colorByBrightness(10)
        })

        this.addAllButtons();

    }
    addAllButtons() {
        for (const fn of FunctionNames2) {
            const button = new HoverPressButton();
            button.addConfig({
                parent: this,
                constraintY: EConstraintsY.top,
                fixedSizeH:60,
                snapMargin: 5,
                onPress:(type: EMouseType, pos: IPos) => {
                    this.blockEditor.selector?.destroy();
                    this.blockEditor.selector=null;
                    const block = new Block(this.blockEditor);
                    block.addConfig({
                        fixedOffsetX: MouseHandler.getRelativeMousePos(this.parent as BlockEditor, pos).x,
                        fixedOffsetY: MouseHandler.getRelativeMousePos(this.parent as BlockEditor, pos).y
                    })
                    block.title.setText(fn.functionName);

                    if (fn.args?.in != undefined) {
                        for (const inArgs of fn.args.in) {
                            const pin = new Pin(block, true, inArgs)
                            switch (inArgs.pinType) {
                                case PinType.exec:
                                    pin.addConfig({
                                        color: "blue"
                                    })
                                    break;
                                case PinType.string:
                                    pin.addConfig({
                                        color: "green"
                                    })
                                    pin.text = new TextBox()
                                    pin.text.addConfig({
                                        parent: pin,
                                        color: "red",
                                        text: inArgs.value
                                    })
                                    break;
                                default:
                                    pin.addConfig({
                                        color: "pink"
                                    })
                                    break;

                            }
                        }
                    }
                    if (fn.args?.out != undefined) {
                        for (const outArgs of fn.args.out) {
                            const pin = new Pin(block, false, outArgs)
                            switch (outArgs.pinType) {
                                case PinType.exec:
                                    pin.addConfig({
                                        color: "blue"
                                    })
                                    break;
                                case PinType.string:
                                    pin.addConfig({
                                        color: "green"
                                    })
                                    pin.text = new TextBox()
                                    pin.text.addConfig({
                                        parent: pin,
                                        color: "red",
                                        text: outArgs.value
                                    })
                                    break;
                                default:
                                    pin.addConfig({
                                        color: "pink"
                                    })
                                    break;

                            }
                        }
                    }
                }
            });
            button.createTitle();
            button.title?.addConfig({
                size: 18,
                text: fn.functionName
            })
        }
    }
}

//maybe extend viewcontentarea to fileviewcontent or something to bind file change events to all instances of class
//do later when ideas more clear though
export class BlockEditor extends ViewContentArea {
    selector: BlockSelector | null = null;
    viewName: string="BlockEditor";
    constructor(view: View) {
        super(view)
        //this.showDebugSrc();
    }
    onMouseDown(type: EMouseType, pos: IPos, topMost: boolean) {
        if (topMost == true && (type == EMouseType.left || type == EMouseType.touch)) {
            if (this.selector == null) {
                this.selector = new BlockSelector(this)
            }
            this.selector.addConfig({
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
        super.onMouseDown(type,pos,topMost);
    }
    createSaveFile() {
        //creates a json compatible with compiler from blocks
        const startBlock = this.children.find(element => (element as any).title.text == "Start") as Block
        let currentBlock = startBlock;
        const saveFile: IScript = { functions: [] }
        let shouldContinue: boolean = true;
        while (shouldContinue == true) {
            if (currentBlock.outPins.find(el => el.pinVal.pinType == PinType.exec)) {
                const nextOutPin = currentBlock.outPins.find(el => el.pinVal.pinType == PinType.exec) as Pin;
                if (nextOutPin.nextLine && nextOutPin.nextLine.obj2) {
                    currentBlock = (nextOutPin.nextLine.obj2 as Pin).block;

                    const command = currentBlock.title.text

                    const commandObj: IFn = {
                        functionName: command,
                        args: { in: [], out: [] }
                    }
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
                    saveFile.functions.push(commandObj)
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
        console.log(scriptString)
        //this.file.src=scriptString;
        window.localStorage.setItem("hi", scriptString);
    }

    findInArray(array: Pin[], pinType: PinType) {
        return array.find(el => el.pinVal.pinType == PinType.exec);
    }

    changeFile() {

    }
}



