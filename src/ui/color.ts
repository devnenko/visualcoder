class ColorCreator{
    public darkColorDef=this.colorByBrightness(20);
    public midColorDef=this.colorByBrightness(40);
    public brightColorDef=this.colorByBrightness(60);
    public colorByBrightness(brightness:number){//number between 0 and 100
        const value=brightness/100*255;
        return "rgb("+value+","+value+","+value+")";
    }

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
}//

export const colorCreator=new ColorCreator();
