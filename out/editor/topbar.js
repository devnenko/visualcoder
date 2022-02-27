import { colorCreator } from "../ui/color.js";
import { Rect } from "../ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
import { Scene } from "./views/scene/scene.js";
import { HoverPressButton, ToggleButton } from "../ui_components/button.js";
import { ContentBrowser } from "./views/contentbrowser/content_browser.js";
import { ERectType } from "../ui/shape.js";
export class TopBarButton extends HoverPressButton {
    constructor(editorTopBar) {
        super();
        console.log(editorTopBar);
        this.createConfig({
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
        console.log(editorTopBar);
        this.createConfig({
            constraintX: EConstraintsX.left,
            fixedSizeW: editorTopBar.fixedSizeH,
            parent: editorTopBar,
            snapMargin: 5,
            boxProportion: { x: 50, y: 50 },
            onToggle: (isOn) => {
                if (isOn) {
                    this.icon?.createConfig({
                        imageSrc: this.toggleOnIconSrc
                    });
                }
                else {
                    this.icon?.createConfig({
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
        console.log(editor);
        this.createConfig({
            rectType: ERectType.HzBox,
            parent: editor,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.top,
            fixedSizeH: 70,
            color: colorCreator.colorByBrightness(5)
        });
        const playButton = new TopBarToggleButton(this);
        playButton.createIcon();
        playButton.icon?.createConfig({ imageSrc: "play.svg" });
        playButton.toggleOffIconSrc = "play.svg";
        playButton.toggleOnIconSrc = "pause.svg";
        playButton.createConfig({
            onPress: () => {
                const sceneView = editor.addViewGeneric(Scene);
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
        contentBrowserButton.icon?.createConfig({ imageSrc: "folder.svg" });
        contentBrowserButton.createConfig({
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
