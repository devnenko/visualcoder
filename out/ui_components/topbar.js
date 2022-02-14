import { editor } from "../main.js";
import { colorCreator } from "../ui/color.js";
import { HorizontalBox } from "../ui/horizontal_box.js";
import { boundingShape } from "../ui/shape.js";
import { Text } from "../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
import { HoverPressButton } from "./special_buttons.js";
import { ContentBrowser } from "./views/content_browser.js";
import { AllFunctions, runScript } from "../save_file/ge_lib.js";
class TopBarButton extends HoverPressButton {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.margin = 5;
        this.fixedSize.w = 60;
        this.fixedSize.h = 60;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.fixedProportion.x = 50;
        this.setOrigColor(colorCreator.colorByBrightness(30));
        this.hoverColor = colorCreator.colorByBrightness(45);
        this.pressColor = colorCreator.colorByBrightness(80);
        this.text = new Text(this, this.canvas);
        this.text.color = "white";
    }
}
export class TopBar extends HorizontalBox //will have play button, options for adding views (maybe should be something better)
 {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.newWin = null;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.top);
        this.fixedSize.w = 60;
        this.fixedSize.h = 60;
        this.color = colorCreator.colorByBrightness(10);
        const playButton = new TopBarButton(this, this.canvas);
        playButton.text.text = "Play";
        playButton.onCLick = () => {
            //const scene=new Scene(boundingShape,this.canvas);
            //editor.addViewGeneric(scene,"Scene");
            //scene.reload();
            //const newWin=window.open("frame1.html", "_blank");
            const scriptString = JSON.stringify([AllFunctions.LogConsoleTest]);
            console.log(scriptString);
            window.localStorage.setItem("test", scriptString);
            runScript();
        };
        const contentBrowserButton = new TopBarButton(this, this.canvas);
        contentBrowserButton.text.text = "Content Browser";
        contentBrowserButton.onCLick = () => //implement loading script also for drag and drop and multi tab. also implement for click add at best location
         {
            editor.addViewGeneric(new ContentBrowser(boundingShape, this.canvas), "ContentBrowser");
        };
        //add last opened file button 
    }
}
