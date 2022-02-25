class ColorCreator {
    constructor() {
        this.darkColorDef = this.colorByBrightness(20);
        this.midColorDef = this.colorByBrightness(40);
        this.brightColorDef = this.colorByBrightness(60);
        //private stringToHueColor(str:string) {
        //    var hash = 0;
        //    for (var i = 0; i < str.length; i++) {
        //      hash = str.charCodeAt(i) + ((hash << 5) - hash);
        //    }
        //    
        //    var h = hash % 360;
        //    return h;
        //}
        //
        //public getDampedColor(color:string){
        //    return "hsl(" + this.stringToHueColor(color) + ",100%,50%)";
        //}
    }
    colorByBrightness(brightness) {
        const value = brightness / 100 * 255;
        return "rgb(" + value + "," + value + "," + value + ")";
    }
} //
export const colorCreator = new ColorCreator();
