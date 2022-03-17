import { boundingRect, BoundingRect } from "./bounding_rect.js";
import { Canvas } from "./canvas.js";



export interface IShapeConfig {
    parent?: Shape | BoundingRect,
    canvas?: Canvas,
    zIndex?: number
}


export abstract class Shape<Config = IShapeConfig> {
    
    protected parent: Shape | BoundingRect = boundingRect;
    public children: Shape[] = [];
    protected canvas: Canvas = boundingRect.canvas;
    public zIndex = 0;

    constructor() {
        boundingRect.allShapes.push(this);
        this.setParent(this.parent);
        this.setZIndex(this.zIndex);
    }

    public addConfig(config: IShapeConfig) {
        this.setConfigAttrs(config);
        boundingRect.draw();
    }

    protected setConfigAttrs(config: any) {
        if (config) {
            for (const opt in config) {
                this.setAttr(opt, config[opt])
            }
        }
    }

    protected setAttr(key: any, value: any) {
        if (key === "parent") {
            this.setParent(value);
        }
        else if (key === "zIndex") {
            this.setZIndex(value);
        }

        // @ts-ignore: to ignore next line in ts
        this[key] = value;
    }

    public getAttr(key: string) {

        // @ts-ignore: to ignore next line in ts
        return this[key];
    }

    private setZIndex(index: number) {
        this.zIndex = index;
        for (const child of this.children) {
            child.addConfig({
                zIndex: this.zIndex
            })
        }
    }

    private setParent(parent: Shape | BoundingRect) {
        if (this.parent.children.indexOf(this) != -1) {
            this.parent.children.splice(this.parent.children.indexOf(this), 1)
        }
        parent.children.push(this);
    }

    public assignChildrenToNew(newParent: Shape | BoundingRect){
        for(const child of this.children){
            child.addConfig({
                parent:newParent
            })
        }
    }
    public replace(newObj: Shape){
        console.log("rep")
        console.log(this.children.length)
        console.log(this.children)
        const childrenLenght=this.children.length;
        for(var i=0;i<childrenLenght;i++){
            console.log("do")
            const obj=this.children[0]
            obj.addConfig({
                parent:newObj
            })
        }
        this.destroy();
    }

    public setIndexInParent(index: number) {
        this.parent.children.splice(this.parent.children.indexOf(this), 1)
        this.parent.children.splice(index, 0, this);
        console.log("yeeehhh")
        console.log(this)
    }

    public resize() {
        for (const child of this.children) {
            child.resize();
        }
    }

    public draw() {
    }

    public destroy() {

        this.destroyChildrenOnly();
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        boundingRect.allShapes.splice(boundingRect.allShapes.indexOf(this), 1)
        boundingRect.draw();
    }

    public destroyChildrenOnly() {
        const childLength = this.children.length

        for (let i = 0; i < childLength; i++) {
            this.children[0].destroy();
        }
    }
}