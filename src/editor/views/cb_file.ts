export enum FileTypes{
    image="image",
    script="script",
    level="level"
}

export class CBFile{
    name:string;
    type:FileTypes;
    src:string;
    linkedObjects:CBFile[]=[];
    onChangeSrc:()=>void;
    constructor(name:string,type:FileTypes,source:string){
        this.name=name;
        this.type=type;
        this.src=source;
        this.onChangeSrc=()=>{console.log("scr changed")};
    }
    public static getStartLevel(){

    }
    destroy(){
        this.linkedObjects.forEach removeref
        

    }
}

export let allFiles:CBFile[]=[];
export let mapStartFile:CBFile=new CBFile("Entry",FileTypes.level,"");
export function setMapStartFile(file:CBFile){
    mapStartFile=file;
}
allFiles.push(mapStartFile)