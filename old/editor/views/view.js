import { Rect, TextBox, colorCreator } from "../../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/types.js";
import { TwoViewRect } from "../editor.js";
import { ERectType } from "../../../src/ui/shape.js";
import { Clickable } from "../../../src/ui/clickable_rect.js";
import { HoverPressButton } from "../../../src/ui_components/button.js";
class ViewTopBar extends Rect {
    constructor(viewOutline) {
        super();
        this.addConfig({
            parent: viewOutline,
            color: colorCreator.colorByBrightness(25),
            fixedSizeH: 50,
        });
        this.title = new TextBox();
        this.title.addConfig({
            constraintY: EConstraintsY.center,
            parent: this,
            text: "View name not specified",
            size: 24,
            color: "white"
        });
        this.title.zIndex = 4;
        this.deleteButton = new HoverPressButton();
        this.deleteButton.addConfig({
            parent: this,
            constraintX: EConstraintsX.right,
            constraintY: EConstraintsY.scale,
            fixedSizeW: 50,
            onPress: () => {
                //destroyScript();
                viewOutline.destroy();
            }
        });
        this.deleteButton.createIcon();
        this.deleteButton.icon?.addConfig({
            imageSrc: "xmark.svg",
        });
        this.deleteButton.zIndex = 4;
    }
}
//should view classes extend view maybe rather than be part of
export class ViewOutline extends Rect {
    constructor(ContentAreaInstance, editor, file) {
        super();
        this.editor = editor;
        this.addConfig({
            rectType: ERectType.VtBox,
            parent: editor.contentArea,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            isVisible: false,
        });
        this.topBar = new ViewTopBar(this);
        this.view = new ContentAreaInstance(this);
        if (file) {
            this.topBar.title.addConfig({
                text: this.view.viewName.concat(file?.name)
            });
        }
        else {
            this.topBar.title.addConfig({
                text: this.view.viewName.concat("nofile")
            });
        }
        //contentArea.setParent(this);
    }
    destroy() {
        //this.editor.removeView(this);
        if (this.parent instanceof TwoViewRect) {
            const twoViewRect = this.parent;
            this.parent.removeSideBar();
            this.parent.removeSelf();
        }
        super.destroy();
    }
}
export class View extends Clickable {
    constructor(view) {
        super();
        this.viewName = "Default View";
        this.viewOutline = view;
        this.viewOutline.editor.views.push(this);
        this.addConfig({
            parent: view,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            color: colorCreator.midColorDef
        });
    }
    destroy() {
        //this.viewOutline.editor.removeView(this);
        this.viewOutline.editor.views.splice(this.viewOutline.editor.views.indexOf(this), 1);
        super.destroy();
    }
}
