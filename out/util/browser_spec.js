import { colorCreator } from "./color.js";
export class BrowserSpec {
    static initDocBody() {
        window.addEventListener("contextmenu", e => e.preventDefault());
        document.body.style.margin = "0px";
        document.body.style.position = "fixed";
        document.body.style.overflow = "hidden";
        document.body.style.width = "100%";
        document.body.style.height = "100%";
        document.body.style.backgroundColor = colorCreator.colorByBrightness(30);
    }
}
BrowserSpec.isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
