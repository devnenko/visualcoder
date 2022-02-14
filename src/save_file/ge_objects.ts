import { GeObject } from "./ge_interface";




export interface IPos extends GeObject{
    x:number;
    y:number;
}

export interface ISize extends GeObject{
    w:number;
    h:number;
}

export interface GeTransform extends GeObject {
    pos:IPos;
    size:ISize;
}

export interface GeVert extends GeObject {
    vertices:number[],
    indices:number[]
}

export interface GeMat extends GeObject {
    vertShader:string;
    fragShader:string;
}


export class GeShape extends GeObject{
    transform:GeTransform;
    vertices:GeVert;
    material:GeMat;

    constructor(name:string,transform:GeTransform,vertices:GeVert,material:GeMat){
        super(name);
        this.transform=transform;
        this.vertices=vertices;
        this.material=material;
    }
}