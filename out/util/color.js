class ColorCreator {
    constructor() {
        this.darkColorDef = this.colorByBrightness(20);
        this.midColorDef = this.colorByBrightness(40);
        this.brightColorDef = this.colorByBrightness(60);
        this.darkBackground = this.colorByBrightness(10);
        this.midUiElements = this.colorByBrightness(30);
        this.highlight = this.colorByBrightness(65);
    }
    colorByBrightness(brightness) {
        const value = brightness / 100 * 255;
        return "rgb(" + value + "," + value + "," + value + ")";
    }
}
export const colorCreator = new ColorCreator;
