import { HoverPressButton, ToggleButton } from "../../../ui_components/ui_components.js";
import { Rect, TextBox } from "../../../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../../../ui/types/types.js";
import { allFiles, FileTypes, mapStartFile, setMapStartFile } from "../cb_file.js";
import { BlockEditor } from "../script/block/block_editor.js";
import { ERectType } from "../../../ui/shape.js";
import { PixelImage } from "../image/image.js";
import { Level } from "../level/level.js";
export class FileButton extends HoverPressButton {
    //type:Text;
    constructor(file, contentBrowser) {
        super();
        this.previewRect = null;
        this.setStartButton = null;
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
        this.addConfig({
            parent: contentBrowser.vtBox,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.top,
            snapMargin: 5,
            fixedSizeH: 70,
            onPress: (type, pos, isTopMost) => {
                if (isTopMost) {
                    if (file.type == FileTypes.script) {
                        contentBrowser.viewOutline.editor.addViewGeneric(BlockEditor);
                    }
                    else if (file.type == FileTypes.image) {
                        contentBrowser.viewOutline.editor.addViewGeneric(PixelImage);
                    }
                    else if (file.type == FileTypes.level) {
                        contentBrowser.viewOutline.editor.addViewGeneric(Level, file);
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
        nameText.addConfig(labelConfig);
        nameText.setText(file.name);
        const typeText = new TextBox();
        typeText.addConfig(labelConfig);
        typeText.addConfig({
            fixedOffsetX: nameText.getAbsSize().w,
            text: file.type
        });
        const rightHzBox = new Rect({
            parent: this,
            rectType: ERectType.HzBox,
            constraintX: EConstraintsX.right,
            constraintY: EConstraintsY.scale,
            fixedSizeW: 500,
            isVisible: true,
            resizeBoxToContent: false
        });
        if (file.type == FileTypes.level) {
            const setStartButton = new ToggleButton();
            setStartButton.addConfig({
                parent: rightHzBox,
                constraintX: EConstraintsX.right,
                constraintY: EConstraintsY.scale,
                fixedSizeW: 65,
                onToggle: (isOn) => {
                    if (isOn) {
                        setMapStartFile(this.file);
                        setStartButton.icon?.addConfig({
                            imageSrc: "flag.square.svg"
                        });
                    }
                    else {
                        setStartButton.icon?.addConfig({
                            imageSrc: "flag.square.fill.svg"
                        });
                    }
                }
            });
            setStartButton.createIcon();
            setStartButton.icon?.addConfig({
                imageSrc: "flag.square.fill.svg",
                snapMargin: 5
            });
            this.contentBrowser.startFlagGroup.addButton(setStartButton);
            this.setStartButton = setStartButton;
            if (mapStartFile == file) {
                this.contentBrowser.startFlagGroup.setCurrentToggled(setStartButton);
            }
        }
        const deleteButton = new HoverPressButton();
        deleteButton.addConfig({
            parent: rightHzBox,
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
        deleteButton.icon?.addConfig({
            imageSrc: "trash.svg",
            snapMargin: 5
        });
        rightHzBox.addConfig({
            fixedSizeW: rightHzBox.children.length * 65
        });
    }
}
