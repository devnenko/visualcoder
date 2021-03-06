//this script will also be used when running the application
//has all functions that can be run


//find better structure for these files and implementations (esp where which code is, and how it works) and start making coding frontend 
//to test out if stuff works as expected and see where to implement typechecking later

export interface IFn{
    functionName:string,
    args:{in:PinVal[],out:PinVal[]}
}
export interface IScript{
    functions:IFn[]
}

export enum FunctionNames {
    CreateVar = "CreateVar",
    LogConsoleTest = "LogConsoleTest",
    ChangeString = "ChangeString",
    CreateCanvas = "CreateCanvas",
    CreateObject = "CreateObject",
    MouseMoveCallback = "CreateObject",
    IsOnline="IsOnline"
}

export interface PinVal{
    pinType:PinType;
    value?:any;
}
export enum PinType{
    exec="exec",
    string="string",
    bool="bool"

}

//maybe do deffinition as interface for better structure
//and then dont need to put in default values
//default values should be definef by PinType
export const FunctionNames2:IFn[]=[
    {functionName:"Start",args:{in:[],
        out:[{pinType:PinType.exec}]}},

    {functionName:"CreateVar",args:{
        in:[{pinType:PinType.exec},{pinType:PinType.string,value:"this is a string"}],
        out:[{pinType:PinType.exec},{pinType:PinType.string,value:"varRef"}]}},

    {functionName:"LogConsoleTest",args:{
        in:[{pinType:PinType.exec},{pinType:PinType.string,value:"varRef"}],
        out:[{pinType:PinType.exec}]}},

    {functionName:"IsOnline",args:{
        in:[{pinType:PinType.exec}],
        out:[{pinType:PinType.exec},{pinType:PinType.bool,value:true}]}}
]

function ConvertFnToJs(val: IFn) {
    switch (val.functionName) {
        case FunctionNames.CreateVar:
            return 'let ' + val.args.out.find(el=>el.pinType==PinType.string)?.value + ' = "' + val.args.in.find(el=>el.pinType==PinType.string)?.value + '";';
            //CreateString(val);
            break;
        case FunctionNames.LogConsoleTest:
            return 'console.log(' +val.args.in.find(el=>el.pinType==PinType.string)?.value + ');';
            //LogConsoleTest(val);
            //module.functionOfModule also works
            break;
        case FunctionNames.CreateCanvas:
            return ''
            //LogConsoleTest(val);
            //module.functionOfModule also works
            break;
        case FunctionNames.CreateObject:
            return 'new module.Object({pos:{x:0,y:0},size:{w:100,h:100}});'
            //LogConsoleTest(val);
            //module.functionOfModule also works
            break;
        case FunctionNames.IsOnline:
            return 'window.navigator.onLine'
            //LogConsoleTest(val);
            //module.functionOfModule also works
            break;
        default:
            console.log("Function not found: " + val)
            return ""

    }
}


export function createAndRunScript() {
    if(document.getElementById("dest2")==null){

        //window.localStorage.setItem("hi",'{"functions":[]}'); //sets script to nothing for debugging purposes

        const js=window.localStorage.getItem("hi");
        console.log("loading")
        console.log(js)
        if(js){
            const sc =JSON.parse(js).functions as IFn[]
            console.log(sc)


            let jsCode: string = '(async () => {const module = await import("./compiler/lib.js"); module.init();';
            jsCode = jsCode.concat("\n \n");
            for (const func of sc) {
                jsCode = jsCode.concat(ConvertFnToJs(func) + "\n");
            }
            jsCode = jsCode.concat("\n");
            jsCode = jsCode.concat("})();");
            console.log(jsCode)
        
            //create script file and append to site
            var script = document.createElement("script");
            script.id="dest2"
            
            script.type = "module"
            var inlineScript = document.createTextNode(jsCode);
            script.appendChild(inlineScript);
            document.body.appendChild(script);
        }

    }
    else{
        console.log("game already running")
    }

}

export function destroyScript(){
    while(document.getElementById("dest")!=null){
        document.getElementById("dest")?.remove();
    }
    document.getElementById("dest2")?.remove();
}