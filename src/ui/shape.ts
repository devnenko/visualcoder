import { boundingShape ,Canvas} from "./ui.js";

export enum EObjectType {
    Normal = 0,
    HzBox = 1,
    VtBox = 2
}

export interface IShapeOpts {
    parent?: IShape,
    canvas?: Canvas
}


export interface IShape {
    canvas?: Canvas,
    parent?: IShape;
    children: IShape[],//only children is passed (no parent)
    draw: (parent: IShape) => void, //draws shape and all children 
    //overlappHierarchy(pos:IPos): Button[]
    destroy: () => void
}


export abstract class Shape<Opts extends IShapeOpts = IShapeOpts> implements IShape {
    public parent: IShape = boundingShape;
    public canvas: Canvas = boundingShape.canvas;
    public children: IShape[] = [];
    constructor() {
        this.parent.children.push(this);

    }
    public createConfig(opts:IShapeOpts){
        this.addConfig(opts)
    }

    protected addConfig(opts: any) {
        for (const opt in opts) {
            if (Object.prototype.hasOwnProperty.call(opts, opt)) {
                this.setConfigAttr(opt as keyof Opts, opts[opt])
            }
        }
        //boundingShape.draw();
    }

    public setConfigAttr(key: keyof Opts, val: any) {

        if (val === undefined || val === null) {
            delete this[key as keyof IShapeOpts];
        } else if (key==="parent") {
            this.setParent(val as IShape);//why val.parent????
        }
        else {
            this[key as keyof IShapeOpts] = val;
        }
    }

    private getConfigAttr(key: keyof IShapeOpts) {
        return this[key];
    }

    protected setParent(parent:IShape){
        this.parent.children.splice(this.parent.children.indexOf(this),1)
        parent.children.push(this);
        this.parent=parent;
    }

    public draw(parent: IShape) {
        for (const child of this.children) {
            child.draw(this);
        }
    }

    public destroy() {

        const len = this.children.length

        for (let i = 0; i < len; i++) {
            this.children[0].destroy();
        }
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }
}