import { boundingRect } from "../ui/bounding_rect.js";
import { Box, BoxType } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { EConstraintsX, EConstraintsY, Rect } from "../ui/rect.js";
import { SvgRect } from "../ui/svg_rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeHoverPressButton, MakeToggleButton, ToggleButtonGroup } from "../ui_components/button.js";
import { AllSvg } from "../util/allsvg.js";
import { colorCreator } from "../util/color.js";
import { MapView } from "./map_view.js";
import { TextScriptView } from "./text_script_view.js";
import { TextEditView } from "./text_view.js";
import { View } from "./view.js";
import { FileViewController } from "./view_cont.js";
export var FileTypeE;
(function (FileTypeE) {
    FileTypeE["text"] = "text";
    FileTypeE["empty"] = "empty";
    FileTypeE["script"] = "script";
    FileTypeE["map"] = "map";
})(FileTypeE || (FileTypeE = {}));
function availToAdd(type) {
    let views = [];
    //views.push(TextView)
    return views;
}
export const allFiles = [
    { name: "s1", type: FileTypeE.script, source: JSON.stringify([]) }
];
export class FileButton extends MakeHoverPressButton(MakeClickable(Rect)) {
    constructor(contentBrow, file) {
        super();
        this.sParent(contentBrow.vtBox)
            .sFixedSize(70)
            .sHasStroke(true)
            .sStrokeSize(3)
            .sStrokeColor(colorCreator.colorByBrightness(80));
        this.onRelease = () => {
            const view = contentBrow.controller.editor.addView(this.fileCont);
            //view.topBar.sHasStroke(true)
            //            .sStrokeColor(colorCreator.highlightColor)
            //            .sStrokeSize(3)
            //this.sStrokeColor(colorCreator.highlightColor)
            //boundingRect.draw();
        };
        this.title = new TextRect;
        this.title
            .sParent(this)
            .sConstY(EConstraintsY.center)
            .sText(file.name)
            .sFixedOffsetX(5);
        this.type = new TextRect;
        this.type
            .sParent(this)
            .sConstY(EConstraintsY.center)
            .sText(file.type)
            .sFixedOffsetX(200);
        this.delButton = new (MakeHoverPressButton(MakeClickable(SvgRect)));
        this.delButton.sSvg(AllSvg.trash)
            .sParent(this)
            .sConsts(EConstraintsX.right, EConstraintsY.scale)
            .sFixedSizeW(this.gFixedSize().h)
            .sSnapMargin(10)
            .onRelease = () => {
            console.log("rel");
            this.fileCont.views.forEach(el => {
                el.remove();
            });
            allFiles.splice(allFiles.indexOf(file), 1);
            contentBrow.controller.refreshViews();
        };
        this.delButton.idleColor = colorCreator.colorByBrightness(10);
        this.delButton.sColor(this.delButton.idleColor);
        this.fileCont = new FileViewController(contentBrow.controller.editor, file);
        this.fileCont.availableViews.push(TextEditView);
        if (file.type == FileTypeE.script) {
            this.fileCont.availableViews.push(TextScriptView);
        }
        if (file.type == FileTypeE.map) {
            this.fileCont.availableViews.push(MapView);
        }
        this.fileCont.defaultViewIndex = 1;
    }
}
export class FileAddButton extends MakeHoverPressButton(MakeClickable(Rect)) {
    constructor(contentBrow) {
        super();
        this.sParent(contentBrow.vtBox)
            .sFixedSize(70)
            .sHasStroke(true)
            .sStrokeSize(4)
            .sStrokeColor(colorCreator.colorByBrightness(80));
        this.onRelease = () => {
            //allFiles.push({name:"testName3",type:FileTypeE.script,source:"testSource3"})
            //allFiles.push({name:"testName4",type:FileTypeE.map,source:"testSource4"})
            //contentBrow.controller.refreshViews();
            new FileSelector(contentBrow);
        };
        this.title = new TextRect;
        this.title
            .sParent(this)
            .sConstY(EConstraintsY.center)
            .sText("new File")
            .sFixedOffsetX(5);
    }
}
class FileSelectorButton extends (MakeToggleButton(MakeClickable(Rect))) {
    constructor(type) {
        super();
        this.type = type;
    }
}
class FileSelector extends MakeClickable(Rect) {
    constructor(contBrow) {
        super();
        this.sParent(contBrow.contentArea)
            .sFillSpace()
            .sSnapMargin(25)
            .sColor("black");
        this.fileTypeBox = new Box(BoxType.hz);
        this.fileTypeBox.sParent(this)
            .sIsVisible(false);
        const tbGroup = new ToggleButtonGroup;
        for (const type in FileTypeE) {
            const b = new FileSelectorButton(type);
            b.sParent(this.fileTypeBox);
            b.sSnapMargin(6);
            tbGroup.addButton(b);
            tbGroup.setCurrentToggled(b);
            //b[type]=type 
            const t = b.addText();
            t.sText(type);
        }
        tbGroup.setCurrentToggled(tbGroup.buttons[0]);
        const createButton = new (MakeHoverPressButton(MakeClickable(Rect)));
        createButton.sParent(this)
            .sFixedSizeW(200)
            .setFixedSizeH(100)
            .sSnapMargin(6)
            .sConsts(EConstraintsX.right, EConstraintsY.bottom)
            .onPress = () => {
            allFiles.push({ name: "untitled", type: tbGroup.currentToggled.type, source: JSON.stringify([]) });
            contBrow.controller.refreshViews();
            this.destroy();
            boundingRect.draw();
        };
        createButton.addText()
            .sText("create");
        const cancelButton = new (MakeHoverPressButton(MakeClickable(Rect)));
        cancelButton.sParent(this)
            .sFixedSizeW(200)
            .setFixedSizeH(100)
            .sFixedOffsetX(200)
            .sSnapMargin(6)
            .sConsts(EConstraintsX.right, EConstraintsY.bottom)
            .onPress = () => {
            this.destroy();
            boundingRect.draw();
        };
        cancelButton.addText()
            .sText("cancel");
    }
}
export class ContentBrowser1 extends View {
    constructor(controller) {
        super(controller);
        this.title = "contentbrowser";
        this.changeTitle();
        this.vtBox = new Box(BoxType.vt);
        this.vtBox
            .sParent(this.contentArea)
            .sFillSpace()
            .sIsVisible(false);
        this.refresh();
    }
    changeTitle() {
        this.topBar.title.sText(this.title);
        boundingRect.draw();
    }
    addFile() {
    }
    refresh() {
        this.vtBox.destroyChildren();
        allFiles.forEach(el => {
            new FileButton(this, el);
        });
        new FileAddButton(this);
        boundingRect.draw();
    }
}
