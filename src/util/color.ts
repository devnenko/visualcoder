class ColorCreator{
    darkColorDef=this.colorByBrightness(5);
    midColorDef=this.colorByBrightness(14);
    brightColorDef=this.colorByBrightness(22);

    highlightColor="lightblue";
    selectColor="orange";
    textColor="white";

    colorByBrightness(brightness:number){//number between 0 and 100
        const value=brightness/100*255;
        return "rgb("+value+","+value+","+value+")";
    }
}

export const colorCreator=new ColorCreator;