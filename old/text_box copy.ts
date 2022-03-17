
import { Shape } from "../src/ui/shape.js";
import { IRectConfig, Rect} from "../src/ui/rect.js";



export interface ITextBoxConfig extends IRectConfig{
    text?:string,
    size?:number,
    useWOrH?:boolean
}

export class TextBox<Config extends ITextBoxConfig = ITextBoxConfig> extends Rect<Config>{
    //use texture atlas in future

    public text:string="Empty Text"
    public size:number=20;
    public useWOrH:boolean=false;


    constructor(config?:Config){
        super()
        this.addConfig({color:"white"})
        this.setConfigAttrs(config);
    }

    addConfig(config: Config): void {
        super.addConfig(config)
    }

    setText(text:string){
        this.text=text;
        boundingShape.draw();
    }

    public draw(parent:IShape){
        if(parent instanceof Rect||parent instanceof BoundingShape){
            this.resizeRect(parent);
            this.drawRect();
    
            for (const child of this.children){
                child.draw(this);
            }
        }
        else{
            console.warn("a rect is a child of a shape and doesnt know what to do");
            for (const child of this.children){
                child.draw(this);
            }
        }
    }

    public resizeRect(parent: Rect | BoundingShape){
        this.canvas.ctx.font = this.size+"px Sans-Serif";
        const measure=this.canvas.ctx.measureText(this.text)
        this.fixedSizeW=measure.width;
        this.fixedSizeH=measure.fontBoundingBoxAscent+measure.fontBoundingBoxDescent;
        //console.log(textBounds)

        if(parent.rectType==EObjectType.Normal){
            const parentSize=parent.absEdges;
            if(this.constraintX==EConstraintsX.left){
                this.absEdges.left=parentSize.left+this.snapOffset.left+this.fixedOffsetX;
                this.absEdges.right=this.absEdges.left+this.fixedSizeW;
            }
            else if(this.constraintX==EConstraintsX.right){
                this.absEdges.right=parentSize.right-this.snapOffset.right+this.fixedOffsetX+this.fixedOffsetX;
                this.absEdges.left=this.absEdges.right-this.fixedSizeW;
            }
            else if(this.constraintX==EConstraintsX.center){
                this.absEdges.left=parentSize.left+(parentSize.right-parentSize.left)/2-this.fixedSizeW/2+this.fixedOffsetX;
                this.absEdges.right=parentSize.left+(parentSize.right-parentSize.left)/2+this.fixedSizeW/2+this.fixedOffsetX;
            }
            else if(this.constraintX==EConstraintsX.scale){
                console.error("cannot scale text component")
            }

            if(this.constraintY==EConstraintsY.top){
                this.absEdges.top=parentSize.top+this.snapOffset.top+this.fixedOffsetY;
                this.absEdges.bottom=this.absEdges.top+this.fixedSizeH;
            }
            else if(this.constraintY==EConstraintsY.bottom){
                this.absEdges.bottom=parentSize.bottom-this.snapOffset.bottom+this.fixedOffsetY;
                this.absEdges.top=this.absEdges.bottom-this.fixedSizeH;
            }
            else if(this.constraintY==EConstraintsY.center){
                this.absEdges.top=parentSize.top+(parentSize.bottom-parentSize.top)/2-this.fixedSizeH/2+this.fixedOffsetY;
                this.absEdges.bottom=parentSize.top+(parentSize.bottom-parentSize.top)/2+this.fixedSizeH/2+this.fixedOffsetY;
            }
            else if(this.constraintY==EConstraintsY.scale){
                console.error("cannot scale text component")
            }

        }


    }

    public drawRect(){
        if(this.isVisible==true){
            const transform=this.edgesToDrawdimensions(this.absEdges);

            this.canvas.ctx.textAlign = "start";
            this.canvas.ctx.fillStyle=this.color;
            this.canvas.ctx.font = this.size+"px Sans-Serif";
            this.canvas.ctx.fillText(this.text, transform.pos.x+this.fixedOffsetX, transform.pos.y+this.size+this.fixedOffsetY);
        }
    }
}