//Ge = GameEngine

export class GeScript{
    functions:GeFunction[]=[];

}
export class GeFunction{
    inObjs:GeObject[]=[];
    outObjs:GeObject[]=[];
    functionName:string='console.log("ge function running")'//handle this in lib
}
export class GeObject{
    name:string;
    value:any;
    constructor(name:string){
        this.name=name;
    }
}


/*const obj=new GeObject()

const GeFConsoleLog=new GeFunction();
GeFConsoleLog.functionName="function to use in lib by name"
GeFConsoleLog.inObjs.push(new GeObject())*/
