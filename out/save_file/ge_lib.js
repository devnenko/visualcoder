//this script will also be used when running the application
//has all functions that can be run
const json = {
    "functions": [
        {
            "functionName": "CreateString",
            "inObjs": [
                {
                    "val": "heyo"
                }
            ],
            "outObjs": [
                {
                    "ref": "TESTMSG"
                }
            ]
        },
        {
            "functionName": "LogConsoleTest",
            "inObjs": [
                {
                    "ref": "TESTMSG"
                }
            ],
            "outObjs": [
                {}
            ]
        }
    ]
};
const jsonNew = {
    "functions": [
        {
            "functionName": "CreateString",
            "args": [
                {
                    "ref": "TESTMSG",
                    "val": "heyo"
                }
            ]
        },
        {
            "functionName": "LogConsoleTest",
            "args": [
                {
                    "ref": "TESTMSG",
                }
            ]
        }
    ]
};
export function runScript() {
    const objs = json.functions;
    let jsCode = '(async () => {const module = await import("./save_file/ge_lib.js");';
    jsCode = jsCode.concat("\n \n");
    for (const val of objs) {
        console.log(AllFunctionsCaller(val));
        jsCode = jsCode.concat(AllFunctionsCaller(val) + "\n");
    }
    jsCode = jsCode.concat("\n");
    jsCode = jsCode.concat("})();");
    console.log(jsCode);
    var script = document.createElement("script");
    script.type = "module";
    var inlineScript = document.createTextNode(jsCode);
    script.appendChild(inlineScript);
    document.body.appendChild(script);
}
export var AllFunctions;
(function (AllFunctions) {
    AllFunctions["CreateString"] = "CreateString";
    AllFunctions["LogConsoleTest"] = "LogConsoleTest";
    AllFunctions["ChangeString"] = "ChangeString";
})(AllFunctions || (AllFunctions = {}));
function AllFunctionsCaller(val) {
    switch (val.functionName) {
        case AllFunctions.CreateString:
            return 'let ' + val.outObjs[0].ref + ' = "' + val.inObjs[0].val + '";';
            //CreateString(val);
            break;
        case AllFunctions.LogConsoleTest:
            return 'console.log("you2");';
            //LogConsoleTest(val);
            break;
        default:
            console.log("Function not found: " + val);
            return "";
    }
}
let registry = [];
class StringObj {
    constructor(ref, val) {
        this.ref = ref;
        this.val = val;
    }
}
export function customCode() {
    console.log("custom code execute");
}
export function CreateString(val) {
    registry.push(new StringObj(val.outObjs[0].ref, val.inObjs[0].val));
    //next step is to create a js module file with this that runs faster because already translated
    //now its working more like a virtual machine, which will result in worse performance
}
export function LogConsoleTest(val) {
    for (const obj of registry) {
        if (obj.ref == val.inObjs[0].ref) {
            console.log(obj.val);
        }
    }
}
//drawObj
//eraseArea
//reconstructArea
