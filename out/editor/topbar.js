import { colorCreator } from "../ui/color.js";
import { Rect } from "../ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
import { Level } from "./views/level/level.js";
import { HoverPressButton, ToggleButton } from "../ui_components/button.js";
import { ContentBrowser } from "./views/contentbrowser/content_browser.js";
import { ERectType } from "../ui/shape.js";
import { mapStartFile } from "./views/cb_file.js";
export class TopBarButton extends HoverPressButton {
    constructor(editorTopBar) {
        super();
        this.addConfig({
            constraintX: EConstraintsX.left,
            fixedSizeW: editorTopBar.fixedSizeH,
            parent: editorTopBar,
            snapMargin: 5,
            boxProportion: { x: 50, y: 50 }
        });
    }
}
export class TopBarToggleButton extends ToggleButton {
    constructor(editorTopBar) {
        super();
        this.toggleOnIconSrc = "";
        this.toggleOffIconSrc = "";
        this.addConfig({
            constraintX: EConstraintsX.left,
            fixedSizeW: editorTopBar.fixedSizeH,
            parent: editorTopBar,
            snapMargin: 5,
            boxProportion: { x: 50, y: 50 },
            onToggle: (isOn) => {
                if (isOn) {
                    this.icon?.addConfig({
                        imageSrc: this.toggleOnIconSrc
                    });
                }
                else {
                    this.icon?.addConfig({
                        imageSrc: this.toggleOffIconSrc
                    });
                }
            }
        });
    }
}
export class EditorTopBar extends Rect //will have play button, options for adding views (maybe should be something better)
 {
    //newWin:Window|null=null;
    constructor(editor) {
        super();
        this.children = [];
        this.addConfig({
            rectType: ERectType.HzBox,
            parent: editor,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.top,
            fixedSizeH: 70,
            color: colorCreator.colorByBrightness(5)
        });
        const playButton = new TopBarToggleButton(this);
        playButton.createIcon();
        playButton.icon?.addConfig({ imageSrc: "play.svg" });
        playButton.toggleOffIconSrc = "play.svg";
        playButton.toggleOnIconSrc = "pause.svg";
        playButton.addConfig({
            onPress: () => {
                const sceneView = editor.addViewGeneric(Level, mapStartFile);
            }
        });
        this.playButton = playButton;
        //playButton.title.text="Play"
        //playButton.onPress=()=>{
        //    //const scene=new Scene(boundingShape,this.canvas);
        //    //editor.addViewGeneric(scene,"Scene");
        //    //scene.reload();
        //    //const newWin=window.open("frame1.html", "_blank");
        //    ////parent.addViewGeneric(Scene,"Scene");
        //}
        //
        const contentBrowserButton = new TopBarButton(this);
        contentBrowserButton.createIcon();
        contentBrowserButton.icon?.addConfig({ imageSrc: "folder.svg" });
        contentBrowserButton.addConfig({
            onPress: () => {
                editor.addViewGeneric(ContentBrowser);
            }
        });
        //contentBrowserButton.title.text="Content Browser"
        //contentBrowserButton.onPress=()=>//implement loading script also for drag and drop and multi tab. also implement for click add at best location
        //{
        //    ////parent.addViewGeneric(ContentBrowser,"ContentBrowser");
        //}
        //add last opened file button 
    }
}
