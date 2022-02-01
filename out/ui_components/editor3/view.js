import { editor } from "../../main.js";
import { Button } from "../../ui/button.js";
import { colorCreator } from "../../ui/color.js";
import { Rect } from "../../ui/rect.js";
import { Text } from "../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { HoverPressButton } from "./hover_press_button.js";
class TopBar extends Button {
    constructor(parent, canvas, view) {
        super(parent, canvas);
        this.color = colorCreator.colorByBrightness(30);
        this.fixedSize.h = 50;
        this.title = new Text(this, canvas);
        this.title.text = "nothing loaded";
        this.title.color = "white";
        this.deleteButton = new HoverPressButton(this, this.canvas);
        this.deleteButton.setConstraints(EConstraintsX.right, EConstraintsY.scale);
        this.deleteButton.fixedSize.w = 50;
        this.deleteButton.color = colorCreator.colorByBrightness(20);
        this.deleteButton.hoverColor = colorCreator.colorByBrightness(55);
        this.deleteButton.pressColor = colorCreator.colorByBrightness(80);
        this.deleteButton.onMouseUp = (type, pos) => {
            //super.onMouseUp(type,pos);
            view.destroy();
            if (editor.topbar.playButton.isOn == true) {
                editor.topbar.playButton.toggle(false);
            }
        };
    }
    onMouseDown(type, pos) {
    }
}
export class View extends Button {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.isVisible = false;
        this.vtBox = new VerticalBox(this, canvas);
        this.vtBox.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.vtBox.isVisible = false;
        this.topBar = new TopBar(this.vtBox, canvas, this);
        this.contentArea = new Rect(this.vtBox, canvas);
        this.contentArea.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.contentArea.color = colorCreator.colorByBrightness(55);
        this.source = new Text(this.contentArea, canvas);
        this.source.text = "no source found";
        this.source.color = "white";
    }
    load(item) {
        item.setParent(this.contentArea);
    }
}
