class ColorCreator{
    darkColorDef=this.colorByBrightness(20);
    midColorDef=this.colorByBrightness(40);
    brightColorDef=this.colorByBrightness(60);

    darkBackground=this.colorByBrightness(10);
    midUiElements=this.colorByBrightness(30);
    highlight=this.colorByBrightness(65);

    colorByBrightness(brightness:number){//number between 0 and 100
        const value=brightness/100*255;
        return "rgb("+value+","+value+","+value+")";
    }
}

export const colorCreator=new ColorCreator;