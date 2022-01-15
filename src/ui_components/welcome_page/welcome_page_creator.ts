import { RectType } from "../../ui/rect.js";
import { EMouseType } from "../../ui/types/mouse.js";
import {BoundingRect,Button,Canvas,HorizontalBox,Line,Rect,Text,VerticalBox,EConstraintsX,EConstraintsY} from "../../ui/ui.js";
import { NewButton } from "./newbutton.js";


function colorByBrightness(value:number){
    return "rgb("+value+","+value+","+value+")";
}

class WelcomeButton extends NewButton{
    public onClick:()=>void;
    constructor(parent:RectType,canvas:Canvas,text:string,onClick:()=>void){
        super(parent,canvas)
        this.setConstraints(EConstraintsX.scale,EConstraintsY.center)
        this.fixedSize.h=100;
        this.color=colorByBrightness(100);
        this.hoverColor=colorByBrightness(120);
        this.pressColor=colorByBrightness(166);
        //this.browseButton.margin=10;
        this.text.text=text;
        this.text.size=50;
        this.text.color=colorByBrightness(300);
        this.onClick=onClick;
    }

    onMouseUp(type: EMouseType): void {
        super.onMouseUp(type);
        this.onClick();
    }
}

export class WelcomePage{
    public static windowBox:HorizontalBox;
    public static sideBox:VerticalBox;
    public static contentArea:Rect;

    public static browseButton:NewButton;
    public static libraryButton:NewButton;
    public static engineButton:NewButton;
    static init(canvas:Canvas){
        this.windowBox=new HorizontalBox(BoundingRect,canvas);
        this.windowBox.setConstraints(EConstraintsX.scale,EConstraintsY.scale)
        this.windowBox.color=colorByBrightness(80);

        this.sideBox=new VerticalBox(this.windowBox,canvas);
        this.sideBox.setConstraints(EConstraintsX.left,EConstraintsY.scale)
        this.sideBox.fixedSize.w=250;
        this.sideBox.color=colorByBrightness(40);

        this.contentArea=new Rect(this.windowBox,canvas);
        this.contentArea.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.contentArea.color=colorByBrightness(80);

        this.browseButton=new WelcomeButton(this.sideBox,canvas,"Browse",()=>{console.log("browse")});
        //this.libraryButton=new WelcomeButton(this.sideBox,canvas,"Library",()=>{console.log("library")});
        //const distRect2=new Rect(this.sideBox,canvas);
        //distRect2.fixedSize.h=100;
        //distRect2.isVisible=false;
        this.engineButton=new WelcomeButton(this.sideBox,canvas,"Engine",()=>{
            console.log("engine");
            window.history.pushState('data to be passed', '', '/test');
        });

        window.addEventListener('popstate', (event) => {
            console.log(event.state)
        });

    }
}