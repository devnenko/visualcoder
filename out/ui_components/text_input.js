import { MouseHandler, KeypressHandler } from "../ui/event_handlers/event_handlers.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/types.js";
import { ToggleButton } from "./button.js";
export class TextInput extends ToggleButton {
    constructor(config) {
        super();
        this.onToggle = (isOn) => {
            if (isOn) {
                KeypressHandler.subscribe(this);
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    console.log(document.getElementById("keyboardHack"));
                    document.getElementById("keyboardHack")?.focus();
                }
                MouseHandler.actifInputField = this;
            }
            else {
                KeypressHandler.unsubscribe(this);
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    console.log(document.getElementById("keyboardHack"));
                    document.getElementById("keyboardHack")?.blur();
                }
                MouseHandler.actifInputField = null;
            }
        };
        this.createTitle();
        this.addConfig({
            constraintX: EConstraintsX.left,
            constraintY: EConstraintsY.top,
            fixedSizeH: 35,
            fixedSizeW: 200,
            canClickToggleOf: false
        });
        this.title?.addConfig({
            constraintX: EConstraintsX.left,
            text: "untitled"
        });
        this.setConfigAttrs(config);
    }
    addConfig(config) {
        super.addConfig(config);
    }
    onKeyPress(key) {
        console.log(key);
        if (this.title) {
            let text = this.title.text;
        }
        else {
            console.error("no title on text input");
        }
        let text = this.title.text;
        if (key === "Backspace") {
            text = text.slice(0, -1);
        }
        else {
            text = text.concat(key);
        }
        this.title?.setText(text);
    }
}
