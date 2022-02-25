// @ts-ignore


import { HoverPressButton,ToggleButton } from "../../../ui_components/ui_components.js";
import {Rect,Canvas,VerticalBox,HorizontalBox,TextBox, colorCreator,boundingShape} from "../../../ui/ui.js";
import {EConstraintsX,EConstraintsY,EMouseType,IPos} from "../../../ui/types/types.js";
import { View, ViewContentArea } from "../view.js";
import { allFiles, CBFile, FileTypes } from "../cb_file.js";
import { ITextBoxOpts } from "../../../ui/text_box.js";
import { TextInput } from "../../../ui_components/text_input.js";




export class ContentBrowser extends ViewContentArea{
    vtBox;
    isInFileSelector:boolean=false;
    constructor(view:View){
        super(view)
        this.viewName="ContentBrowser"

        //this.color=colorCreator.colorByBrightness(20);
        this.vtBox=new VerticalBox();
        this.vtBox.createConfig({
            parent:this,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.scale,
            isVisible:false
        })
        //this.vtBox.isVisible=false;

        this.refresh();
    }
    refresh(){
        const length=this.vtBox.children.length;
        for(var i =0;i<length;i++){
            this.vtBox.children[0].destroy();
        }
        for(const file of allFiles){
            const b1=new CBButton(file,this)
        }
        new FileAddButton(this)
    }
}

export class FileAddButton extends HoverPressButton{
    previewRect:Rect|null=null;
    contentBrowser:ContentBrowser;

    constructor(contentBrowser:ContentBrowser){
        super()
        this.contentBrowser=contentBrowser;
        this.createConfig({
            parent:contentBrowser.vtBox,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.top,
            snapMargin:5,
            fixedSizeH:70,
            onPress:()=>{
                this.color=this.notPressedColor;
                boundingShape.draw()
                new FileSelector(contentBrowser);
            }
        })
        this.title.createConfig({
            text:"Create File"
        })

    }
    public onMouseHoverBegin: (type: EMouseType, pos: IPos, isTopMost: boolean) => void=(type: EMouseType, pos: IPos, isTopMost: boolean)=>{
        if(this.contentBrowser.isInFileSelector==false){
            super.onMouseHoverBegin(type,pos,isTopMost)
        }
    };
    public onMouseDown: (type: EMouseType, pos: IPos, isTopMost: boolean) => void=(type: EMouseType, pos: IPos, isTopMost: boolean)=>{
        if(this.contentBrowser.isInFileSelector==false){
            super.onMouseDown(type,pos,isTopMost)
        }
    };
}

class FileSelector extends Rect{
    contentBrowser;
    //topDragArea;
    fileTypeHzBox;
    fileTypePrevToggle;
    bottomHzBox;
    cancelButton;
    createButton;
    constructor(contentBrowser:ContentBrowser){
        super()
        this.contentBrowser=contentBrowser;
        contentBrowser.isInFileSelector=true;
        this.createConfig({
            parent:contentBrowser,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.scale,
            snapMargin:20,
            color:colorCreator.colorByBrightness(10),
            
        })

        const vtBox=new VerticalBox();
        vtBox.createConfig({
            parent:this,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.scale,
            snapMargin:25,
            isVisible:false
        });

        const titleConfig:ITextBoxOpts={
            parent:vtBox,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.top,
            size:20,
            text:"Title"
        };

        //const t1=new TextBox();
        //t1.createConfig(titleConfig)

        const textInput=new TextInput();
        textInput.createConfig({
            parent:vtBox,
            fixedSizeH:50,
            snapMargin:5,
        })

        this.fileTypeHzBox=new HorizontalBox()
        this.fileTypeHzBox.createConfig({
            parent:vtBox,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.top,
            snapOffset:{left:50,right:50,top:0,bottom:0},
            isVisible:false,
            fixedSizeH:100
        })

        let first=true;

        for(const fileType in FileTypes){
            let button=new ToggleButton();
            button["cBFileType"]=fileType;

            if(first){
                this.fileTypePrevToggle=button;
                button.toggle(true);
                first=false;
            }

            button.createConfig({
                parent:this.fileTypeHzBox,
                canClickToggleOf:false,
                constraintX:EConstraintsX.left,
                fixedSizeW:100, //same as hz box
                snapMargin:8,
                onToggle:()=>{
                    const prevtoggle=this.fileTypePrevToggle;
                    this.fileTypePrevToggle=undefined;
                    prevtoggle?.toggle(false);
                    this.fileTypePrevToggle=button;
                }
            })
            button.title.setText(fileType);
        }



        this.bottomHzBox=new HorizontalBox();
        this.bottomHzBox.createConfig({
            parent:this,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.bottom,
            snapOffset:{left:25,right:25,top:0,bottom:25},
            fixedSizeW:400,
            fixedSizeH:45,
            isVisible:false
        })

        this.cancelButton=new HoverPressButton();
        this.cancelButton.createConfig({
            parent:this.bottomHzBox,
            snapMargin:5,
            boxProportion:{x:50,y:50},
            onPress:()=>{
                contentBrowser.isInFileSelector=false;
                this.destroy();
            }
        })
        this.cancelButton.title.createConfig({
            text:"Cancel"
        })


        this.createButton=new HoverPressButton();
        this.createButton.createConfig({
            parent:this.bottomHzBox,
            snapMargin:5,
            boxProportion:{x:50,y:50},
            onPress:()=>{
                allFiles.push(new CBFile(textInput.title.text,this.fileTypePrevToggle["cBFileType"],""));
                contentBrowser.refresh();
                contentBrowser.isInFileSelector=false;
                this.destroy();
            }
        })
        this.createButton.title.setText("Create");
    }
    
}

export class CBButton extends HoverPressButton{
    previewRect:Rect|null=null;
    file:CBFile;
    contentBrowser:ContentBrowser;
    //type:Text;

    constructor(file:CBFile,contentBrowser:ContentBrowser){
        super()
        this.contentBrowser=contentBrowser;
        this.file=file;
        this.createConfig({
            parent:contentBrowser.vtBox,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.top,
            snapMargin:5,
            fixedSizeH:70,
            onPress:()=>{
                
            }
        })
        this.title.destroy();

        const labelConfig:ITextBoxOpts={
            constraintY:EConstraintsY.center,
            size:24,
            parent:this,
            text:file.type,
            snapOffset:{left:20,right:20,top:0,bottom:0}
        };

        const nameText = new TextBox();
        nameText.createConfig(labelConfig)
        nameText.setText(file.name);


        const typeText=new TextBox();
        typeText.createConfig(labelConfig)
        typeText.createConfig({
            fixedOffsetX:nameText.getAbsSize().w,
            text:file.type
        })

        const deleteButton=new HoverPressButton();
        deleteButton.createConfig({
            parent:this,
            constraintX:EConstraintsX.right,
            constraintY:EConstraintsY.scale,
            fixedSizeW:65,
            onPress:()=>{
                //destroyScript();
                allFiles.splice(allFiles.indexOf(file),1);
                contentBrowser.refresh();
            }
        })


        ///this.fileType.fixedOffset.x=100;
        ///this.fileType.color="white";
        ///this.fileType.text=file.type;

    }
    public onMouseHoverBegin: (type: EMouseType, pos: IPos, isTopMost: boolean) => void=(type: EMouseType, pos: IPos, isTopMost: boolean)=>{
        if(this.contentBrowser.isInFileSelector==false){
            super.onMouseHoverBegin(type,pos,isTopMost)
        }
    };
    public onMouseDown: (type: EMouseType, pos: IPos, isTopMost: boolean) => void=(type: EMouseType, pos: IPos, isTopMost: boolean)=>{
        if(this.contentBrowser.isInFileSelector==false){
            super.onMouseDown(type,pos,isTopMost)
        }
    };
}