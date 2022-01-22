class ColorCreator {
    colorByBrightness(brightness) {
        const value = brightness / 100 * 255;
        return "rgb(" + value + "," + value + "," + value + ")";
    }
} //
export const colorCreator = new ColorCreator();
