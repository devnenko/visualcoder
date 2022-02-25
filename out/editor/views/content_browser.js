import { editor } from "../../main.js";
import { colorCreator } from "../../ui/color.js";
import { HorizontalBox } from "../../ui/horizontal_box.js";
import { Rect } from "../../ui/rect.js";
import { Text } from "../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { DefaultHoverPressButton, DefaultToggleButton, HoverPressButton } from "../button.js";
import { BlockEditor } from "./block_editor.js";
import { allFiles, GeFile } from "./ge_file.js";
import { ViewContentArea } from "./view.js";
var FileTypes;
(function (FileTypes) {
    FileTypes["BlockEditor"] = "BlockEditor";
    FileTypes["Image"] = "Image";
})(FileTypes || (FileTypes = {}));
export class ContentBrowser extends ViewContentArea {
    constructor(parent, canvas) {
        super(parent, canvas, "ContentBrowser");
        this.isInFileSelector = false;
        //this.color=colorCreator.colorByBrightness(20);
        this.vtBox = new VerticalBox(this, this.canvas);
        this.vtBox.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.vtBox.isVisible = false;
        //this.vtBox.isVisible=false;
        this.refresh();
    }
    refresh() {
        const length = this.vtBox.children.length;
        for (var i = 0; i < length; i++) {
            this.vtBox.children[0].destroyHierarchy();
        }
        for (const file of allFiles) {
            const b1 = new CBButton(this.vtBox, this.canvas, file, this);
        }
        new FileAddButton(this.vtBox, this.canvas, this);
    }
}
export class FileAddButton extends HoverPressButton {
    constructor(parent, canvas, contentBrowser) {
        super(parent, canvas);
        this.previewRect = null;
        this.fixedSize.h = 70;
        this.margin = 5;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.top);
        this.color = colorCreator.colorByBrightness(70);
        this.hoverColor = colorCreator.colorByBrightness(60);
        this.pressColor = colorCreator.colorByBrightness(60);
        this.text = new Text(this, this.canvas);
        this.text.color = "white";
        this.text.text = "new file";
        this.contentBrowser = contentBrowser;
        this.onCLick = (type, pos, isTopMost) => {
            new FileSelector(contentBrowser, contentBrowser.canvas, contentBrowser);
            //allFiles.push(new GeFile("new","be",""));
            //console.log(allFiles)
            //contentBrowser.refresh();
        };
    }
    onMouseHoverBegin(type, pos) {
        console.log(this.contentBrowser.isInFileSelector);
        if (this.contentBrowser.isInFileSelector === false) {
            super.onMouseHoverBegin(type, pos);
        }
    }
    onMouseDown(type, pos, isTopMost) {
        if (this.contentBrowser.isInFileSelector === false) {
            super.onMouseDown(type, pos, isTopMost);
        }
    }
}
class FileSelector extends Rect {
    constructor(parent, canvas, contentBrowser) {
        super(parent, canvas);
        contentBrowser.isInFileSelector = true;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.color = colorCreator.colorByBrightness(10);
        this.margin = 50;
        this.topDragArea = new Rect(this, this.canvas);
        this.topDragArea.setConstraints(EConstraintsX.scale, EConstraintsY.center);
        this.topDragArea.fixedPos.y = -150;
        this.topDragArea.snapOffset.left = 50;
        this.topDragArea.snapOffset.right = 50;
        this.topDragArea.snapOffset.top = 50;
        this.topDragArea.fixedSize.h = 200;
        const text1 = new Text(this.topDragArea, this.canvas);
        text1.color = "white";
        text1.text = "drag file here";
        //this.fileTypeHzBox.isVisible=false;
        this.fileTypeHzBox = new HorizontalBox(this, this.canvas);
        this.fileTypeHzBox.setConstraints(EConstraintsX.scale, EConstraintsY.center);
        this.fileTypeHzBox.snapOffset.left = 50;
        this.fileTypeHzBox.snapOffset.right = 50;
        this.fileTypeHzBox.isVisible = false;
        let first = true;
        for (const fileType in FileTypes) {
            let button = new DefaultToggleButton(this.fileTypeHzBox, this.canvas);
            button.canClickToggleOf = false;
            if (first) {
                this.fileTypePrevToggle = button;
                button.toggle(true);
                first = false;
            }
            button.constX = EConstraintsX.left;
            button.fixedSize.w = this.fileTypeHzBox.fixedSize.h;
            button.margin = 8;
            button.title.text = fileType;
            button.onToggle = () => {
                this.fileTypePrevToggle?.toggle(false);
                this.fileTypePrevToggle = button;
            };
        }
        this.bottomHzBox = new HorizontalBox(this, this.canvas);
        this.bottomHzBox.setConstraints(EConstraintsX.right, EConstraintsY.bottom);
        this.bottomHzBox.snapOffset.right = 25;
        this.bottomHzBox.snapOffset.bottom = 25;
        this.bottomHzBox.fixedSize.w = 400;
        this.bottomHzBox.fixedSize.h = 45;
        this.bottomHzBox.isVisible = false;
        this.cancelButton = new DefaultHoverPressButton(this.bottomHzBox, this.canvas);
        this.cancelButton.margin = 5;
        this.cancelButton.fixedProportion.x = 50;
        this.cancelButton.title.text = "Cancel";
        this.cancelButton.onCLick = () => {
            contentBrowser.isInFileSelector = false;
            this.destroyHierarchy();
        };
        this.createButton = new DefaultHoverPressButton(this.bottomHzBox, this.canvas);
        this.createButton.margin = 5;
        this.createButton.fixedProportion.x = 50;
        this.createButton.title.text = "Create";
        this.createButton.onCLick = () => {
            allFiles.push(new GeFile("new", this.fileTypePrevToggle.title.text, ""));
            console.log(allFiles);
            contentBrowser.refresh();
            contentBrowser.isInFileSelector = false;
            this.destroyHierarchy();
        };
    }
}
export class CBButton extends HoverPressButton {
    //type:Text;
    constructor(parent, canvas, file, contentBrowser) {
        super(parent, canvas);
        this.previewRect = null;
        this.contentBrowser = contentBrowser;
        this.fixedSize.h = 70;
        this.margin = 5;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.top);
        this.color = colorCreator.colorByBrightness(70);
        this.hoverColor = colorCreator.colorByBrightness(60);
        this.pressColor = colorCreator.colorByBrightness(60);
        this.name = new Text(this, this.canvas);
        this.name.color = "white";
        this.name.text = file.name;
        this.fileType = new Text(this, this.canvas);
        this.fileType.fixedOffset.x = 100;
        this.fileType.color = "white";
        this.fileType.text = file.type;
        this.source = file.src;
        this.file = file;
        this.onCLick = (type, pos, isTopMost) => {
            if (this.file.type == FileTypes.BlockEditor) {
                editor.addViewGeneric(BlockEditor, "BlockEditor");
            }
        };
    }
    onMouseHoverBegin(type, pos) {
        if (this.contentBrowser.isInFileSelector == false) {
            super.onMouseHoverBegin(type, pos);
        }
    }
    onMouseDown(type, pos, isTopMost) {
        if (this.contentBrowser.isInFileSelector === false) {
            super.onMouseDown(type, pos, isTopMost);
        }
    }
}
