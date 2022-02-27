// @ts-ignore
import { HoverPressButton, ToggleButton } from "../../../ui_components/ui_components.js";
import { Rect, TextBox, colorCreator, boundingShape } from "../../../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../../../ui/types/types.js";
import { ViewContentArea } from "../view.js";
import { allFiles, CBFile, FileTypes } from "../cb_file.js";
import { TextInput } from "../../../ui_components/text_input.js";
import { BlockEditor } from "../script/block/block_editor.js";
import { ERectType } from "../../../ui/shape.js";
import { PixelImage } from "../image/image.js";
export class ContentBrowser extends ViewContentArea {
    constructor(view) {
        super(view);
        this.isInFileSelector = false;
        this.viewName = "ContentBrowser";
        //this.color=colorCreator.colorByBrightness(20);
        this.vtBox = new Rect();
        this.vtBox.createConfig({
            rectType: ERectType.VtBox,
            parent: this,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            isVisible: false
        });
        //this.vtBox.isVisible=false;
        this.refresh();
    }
    refresh() {
        const length = this.vtBox.children.length;
        for (var i = 0; i < length; i++) {
            this.vtBox.children[0].destroy();
        }
        for (const file of allFiles) {
            const b1 = new CBButton(file, this);
        }
        console.log("ref");
        const b1 = new FileAddButton(this);
        console.log(b1);
    }
}
export class FileAddButton extends HoverPressButton {
    constructor(contentBrowser) {
        super();
        this.previewRect = null;
        this.onMouseHoverBegin = (type, pos, isTopMost) => {
            if (this.contentBrowser.isInFileSelector == false) {
                super.onMouseHoverBegin(type, pos, isTopMost);
            }
        };
        this.onMouseDown = (type, pos, isTopMost) => {
            if (this.contentBrowser.isInFileSelector == false) {
                super.onMouseDown(type, pos, isTopMost);
            }
        };
        this.contentBrowser = contentBrowser;
        this.createConfig({
            parent: contentBrowser.vtBox,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.top,
            snapMargin: 5,
            fixedSizeH: 70,
            onPress: () => {
                this.color = this.notPressedColor;
                boundingShape.draw();
                new FileSelector(contentBrowser);
            }
        });
        this.createTitle();
        this.title?.createConfig({
            text: "Create File"
        });
    }
}
class FileSelector extends Rect {
    constructor(contentBrowser) {
        super();
        this.contentBrowser = contentBrowser;
        contentBrowser.isInFileSelector = true;
        this.createConfig({
            parent: contentBrowser,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            snapMargin: 20,
            color: colorCreator.colorByBrightness(10),
        });
        const vtBox = new Rect();
        vtBox.createConfig({
            rectType: ERectType.VtBox,
            parent: this,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            snapMargin: 25,
            isVisible: false
        });
        const titleConfig = {
            parent: vtBox,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.top,
            size: 20,
            text: "Title"
        };
        //const t1=new TextBox();
        //t1.createConfig(titleConfig)
        const textInput = new TextInput();
        textInput.createConfig({
            parent: vtBox,
            fixedSizeH: 50,
            snapMargin: 5,
        });
        this.fileTypeHzBox = new Rect();
        this.fileTypeHzBox.createConfig({
            rectType: ERectType.HzBox,
            parent: vtBox,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.top,
            snapOffset: { left: 50, right: 50, top: 0, bottom: 0 },
            isVisible: false,
            fixedSizeH: 100
        });
        let first = true;
        for (const fileType in FileTypes) {
            let button = new ToggleButton();
            // @ts-ignore to ignore next line
            button["cBFileType"] = fileType;
            if (first) {
                this.fileTypePrevToggle = button;
                button.toggle(true);
                first = false;
            }
            button.createConfig({
                parent: this.fileTypeHzBox,
                canClickToggleOf: false,
                constraintX: EConstraintsX.left,
                fixedSizeW: 100,
                snapMargin: 8,
                onToggle: () => {
                    const prevtoggle = this.fileTypePrevToggle;
                    this.fileTypePrevToggle = undefined;
                    prevtoggle?.toggle(false);
                    this.fileTypePrevToggle = button;
                }
            });
            button.createTitle();
            button.title?.setText(fileType);
        }
        this.bottomHzBox = new Rect();
        this.bottomHzBox.createConfig({
            rectType: ERectType.HzBox,
            parent: this,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.bottom,
            snapOffset: { left: 25, right: 25, top: 0, bottom: 25 },
            fixedSizeW: 400,
            fixedSizeH: 45,
            isVisible: false
        });
        this.cancelButton = new HoverPressButton();
        this.cancelButton.createConfig({
            parent: this.bottomHzBox,
            snapMargin: 5,
            boxProportion: { x: 50, y: 50 },
            onPress: () => {
                contentBrowser.isInFileSelector = false;
                this.destroy();
            }
        });
        this.cancelButton.createTitle();
        this.cancelButton.title?.createConfig({
            text: "Cancel"
        });
        this.createButton = new HoverPressButton();
        this.createButton.createConfig({
            parent: this.bottomHzBox,
            snapMargin: 5,
            boxProportion: { x: 50, y: 50 },
            onPress: () => {
                // @ts-ignore to ignore next line
                allFiles.push(new CBFile(textInput.title.text, this.fileTypePrevToggle["cBFileType"], ""));
                contentBrowser.refresh();
                contentBrowser.isInFileSelector = false;
                this.destroy();
            }
        });
        this.createButton.createTitle();
        this.createButton.title?.setText("Create");
    }
}
export class CBButton extends HoverPressButton {
    //type:Text;
    constructor(file, contentBrowser) {
        super();
        this.previewRect = null;
        this.onMouseHoverBegin = (type, pos, isTopMost) => {
            if (this.contentBrowser.isInFileSelector == false) {
                super.onMouseHoverBegin(type, pos, isTopMost);
            }
        };
        this.onMouseDown = (type, pos, isTopMost) => {
            if (this.contentBrowser.isInFileSelector == false) {
                super.onMouseDown(type, pos, isTopMost);
            }
        };
        this.contentBrowser = contentBrowser;
        this.file = file;
        this.createConfig({
            parent: contentBrowser.vtBox,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.top,
            snapMargin: 5,
            fixedSizeH: 70,
            onPress: (type, pos, isTopMost) => {
                if (isTopMost) {
                    if (file.type == FileTypes.script) {
                        contentBrowser.view.editor.addViewGeneric(BlockEditor);
                    }
                    else if (file.type == FileTypes.image) {
                        contentBrowser.view.editor.addViewGeneric(PixelImage);
                    }
                }
            }
        });
        const labelConfig = {
            constraintY: EConstraintsY.center,
            size: 24,
            parent: this,
            text: file.type,
            snapOffset: { left: 20, right: 20, top: 0, bottom: 0 }
        };
        const nameText = new TextBox();
        nameText.createConfig(labelConfig);
        nameText.setText(file.name);
        const typeText = new TextBox();
        typeText.createConfig(labelConfig);
        typeText.createConfig({
            fixedOffsetX: nameText.getAbsSize().w,
            text: file.type
        });
        const deleteButton = new HoverPressButton();
        deleteButton.createConfig({
            parent: this,
            constraintX: EConstraintsX.right,
            constraintY: EConstraintsY.scale,
            fixedSizeW: 65,
            onPress: () => {
                //destroyScript();
                allFiles.splice(allFiles.indexOf(file), 1);
                contentBrowser.refresh();
            }
        });
        deleteButton.createIcon();
        deleteButton.icon?.createConfig({
            imageSrc: "trash.svg",
            snapMargin: 5
        });
        ///this.fileType.fixedOffset.x=100;
        ///this.fileType.color="white";
        ///this.fileType.text=file.type;
    }
}
