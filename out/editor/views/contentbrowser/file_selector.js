import { HoverPressButton, ToggleButton } from "../../../ui_components/ui_components.js";
import { Rect, colorCreator } from "../../../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../../../ui/types/types.js";
import { allFiles, CBFile, FileTypes } from "../cb_file.js";
import { TextInput } from "../../../ui_components/text_input.js";
import { ERectType } from "../../../ui/shape.js";
import { ToggleButtonGroup } from "../../../ui_components/button.js";
import { Clickable } from "../../../ui/clickable.js";
export class FileSelector extends Clickable {
    constructor(contentBrowser) {
        super();
        this.fileType = FileTypes.image; //default value
        this.contentBrowser = contentBrowser;
        contentBrowser.isInFileSelector = true;
        this.addConfig({
            parent: contentBrowser,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            snapMargin: 20,
            color: colorCreator.colorByBrightness(10),
        });
        const vtBox = new Rect();
        vtBox.addConfig({
            rectType: ERectType.VtBox,
            parent: this,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            snapMargin: 25,
            isVisible: false
        });
        const textInput = new TextInput({
            parent: vtBox,
            fixedSizeH: 50,
            snapMargin: 5,
        });
        this.fileTypeHzBox = new Rect({
            rectType: ERectType.HzBox,
            parent: vtBox,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.top,
            snapOffset: { left: 50, right: 50, top: 0, bottom: 0 },
            isVisible: false,
            fixedSizeH: 100
        });
        const group = new ToggleButtonGroup();
        let first = true;
        for (const fileType in FileTypes) {
            let button = new ToggleButton();
            // @ts-ignore to ignore next line
            this.fileType = fileType;
            button.addConfig({
                parent: this.fileTypeHzBox,
                constraintX: EConstraintsX.left,
                fixedSizeW: 100,
                snapMargin: 8,
                onToggle: (isOn) => {
                }
            });
            button.createTitle();
            button.title?.setText(fileType);
            group.addButton(button);
        }
        group.setCurrentToggled(this.fileTypeHzBox.children[0]);
        this.bottomHzBox = new Rect({
            rectType: ERectType.HzBox,
            parent: this,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.bottom,
            snapOffset: { left: 25, right: 25, top: 0, bottom: 25 },
            fixedSizeW: 400,
            fixedSizeH: 45,
            isVisible: false
        });
        this.cancelButton = new HoverPressButton({
            parent: this.bottomHzBox,
            snapMargin: 5,
            boxProportion: { x: 50, y: 50 },
            onPress: () => {
                contentBrowser.isInFileSelector = false;
                this.destroy();
            }
        });
        this.cancelButton.createTitle();
        this.cancelButton.title?.addConfig({
            text: "Cancel"
        });
        this.createButton = new HoverPressButton();
        this.createButton.addConfig({
            parent: this.bottomHzBox,
            snapMargin: 5,
            boxProportion: { x: 50, y: 50 },
            onPress: () => {
                // @ts-ignore to ignore next line
                allFiles.push(new CBFile(textInput.title.text, group.currentToggled?.title.text, ""));
                console.log("bef ref");
                contentBrowser.refresh();
                contentBrowser.isInFileSelector = false;
                this.destroy();
            }
        });
        this.createButton.createTitle();
        this.createButton.title?.setText("Create");
    }
}
