export enum FileTypes{
    image="image",
    script="script"
}

export class CBFile{
    name:string;
    type:FileTypes;
    src:string;
    onChangeSrc:()=>void;
    constructor(name:string,type:FileTypes,source:string){
        this.name=name;
        this.type=type;
        this.src=source;
        this.onChangeSrc=()=>{console.log("scr changed")};
    }
}

export let allFiles:CBFile[]=[];