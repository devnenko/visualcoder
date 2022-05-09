import { boundingRect } from "../ui/bounding_rect.js";
import { Box, BoxType } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { EConstraintsX, EConstraintsY, Rect } from "../ui/rect.js";
import { SvgObj, SvgRect } from "../ui/svg_rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeHoverPressButton } from "../ui_components/button.js";
import { AllSvg } from "../util/allsvg.js";
import { colorCreator } from "../util/color.js";
import { MapView } from "./map_view.js";
import { ScriptView } from "./script_view.js";
import { TextEditView, TextView } from "./text_view.js";
import { View } from "./view.js";
import { FileViewController, ViewController } from "./view_cont.js";

export enum FileTypeE{
    text="text",
    empty="empty",
    script="script",
    map="map"
}

function availToAdd(type:FileTypeE){
    let views:Array<(new(controller:ViewController)=>TextView)>=[];
    //views.push(TextView)
    return views;
}

export interface CbFile{
    name:string,
    type:FileTypeE,
    source:string
}

export const allFiles:CbFile[]=[
    {name:"testName1",type:FileTypeE.text,source:"testSource1"},
    {name:"testName2",type:FileTypeE.empty,source:"testSource2"},
]

export class FileButton extends MakeHoverPressButton(MakeClickable(Rect)) {
    title;
    type;
    delButton;
    fileCont:FileViewController;
    constructor(contentBrow: ContentBrowser1, file: CbFile) {
        super()
        this.sParent(contentBrow.vtBox)
            .sFixedSize(70)
            .sHasStroke(true)
            .sStrokeSize(3)
            .sStrokeColor(colorCreator.colorByBrightness(80))
        this.onRelease=()=>{
            const view=contentBrow.controller.editor.addView(this.fileCont)
            

            //view.topBar.sHasStroke(true)
            //            .sStrokeColor(colorCreator.highlightColor)
            //            .sStrokeSize(3)
            //this.sStrokeColor(colorCreator.highlightColor)
            //boundingRect.draw();
        }

        this.title = new TextRect
        this.title
            .sParent(this)
            .sConstY(EConstraintsY.center)
            .sText(file.name)
            .sFixedOffsetX(5)

        this.type = new TextRect
        this.type
            .sParent(this)
            .sConstY(EConstraintsY.center)
            .sText(file.type)
            .sFixedOffsetX(200)

        this.delButton=new (MakeHoverPressButton(MakeClickable(SvgRect)))
        this.delButton.sSvg(AllSvg.trash)
                    .sParent(this)
                    .sConsts(EConstraintsX.right,EConstraintsY.scale)
                    .sFixedSizeW(this.gFixedSize().h)
                    .sSnapMargin(10)
                    .onRelease=()=>{
                        console.log("rel")
                        allFiles.splice(allFiles.indexOf(file),1);
                        contentBrow.controller.refreshViews();
                    }
        this.delButton.idleColor=colorCreator.colorByBrightness(10)
        this.delButton.sColor(this.delButton.idleColor);

        this.fileCont=new FileViewController(contentBrow.controller.editor,file)
        this.fileCont.availableViews.push(TextEditView as new(controller:ViewController)=>TextEditView);
        if(file.type==FileTypeE.script){
            this.fileCont.availableViews.push(ScriptView as new(controller:ViewController)=>TextEditView);
        }
        if(file.type==FileTypeE.map){
            this.fileCont.availableViews.push(MapView as new(controller:ViewController)=>TextEditView);
        }
    }
}

export class FileAddButton extends MakeHoverPressButton(MakeClickable(Rect)) {
    title;
    constructor(contentBrow: ContentBrowser1) {
        super()
        this.sParent(contentBrow.vtBox)
            .sFixedSize(70)
            .sHasStroke(true)
            .sStrokeSize(4)
            .sStrokeColor(colorCreator.colorByBrightness(80))
        this.onRelease=()=>{
            allFiles.push({name:"testName3",type:FileTypeE.script,source:"testSource3"})
            allFiles.push({name:"testName4",type:FileTypeE.map,source:"testSource4"})
            contentBrow.controller.refreshViews();
        }

        this.title = new TextRect
        this.title
            .sParent(this)
            .sConstY(EConstraintsY.center)
            .sText("new File")
            .sFixedOffsetX(5)


    }
}

export class ContentBrowser1 extends View {
    title = "contentbrowser";
    vtBox;
    constructor(controller: ViewController) {
        super(controller)
        this.changeTitle();
        this.vtBox = new Box(BoxType.vt)
        this.vtBox
            .sParent(this.contentArea)
            .sFillSpace()
            .sIsVisible(false)


        this.refresh();


    }
    changeTitle() {
        this.topBar.title.sText(this.title);
        boundingRect.draw();
    }

    addFile(){

    }
    refresh(){
        this.vtBox.destroyChildren();
        allFiles.forEach(el => {
            new FileButton(this, el);
        })

        new FileAddButton(this)
        boundingRect.draw();
    }
}