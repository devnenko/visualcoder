class ColorCreator {
    constructor() {
        this.darkColorDef = this.colorByBrightness(5);
        this.midColorDef = this.colorByBrightness(14);
        this.brightColorDef = this.colorByBrightness(22);
        this.highlightColor = "lightblue";
        this.selectColor = "orange";
        this.textColor = "white";
    }
    colorByBrightness(brightness) {
        const value = brightness / 100 * 255;
        return "rgb(" + value + "," + value + "," + value + ")";
    }
}
export const colorCreator = new ColorCreator;
