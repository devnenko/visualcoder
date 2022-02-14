//this script will also be used when running the application
//has all functions that can be run
const json = [{
    "functionName": "LogConsoleTest",
    "inObjs": [
        {
            "name": "TESTMSG",
            "value": "TESTMSGTEXT"
        }
    ]
}]

export function runScript() {
    const objs = json
    for (const val of objs) {
        AllFunctionsCaller(val);
    }

}

export enum AllFunctions {
    LogConsoleTest = "LogConsoleTest"
}

function AllFunctionsCaller(val: any) {
    switch (val.functionName) {
        case AllFunctions.LogConsoleTest:
            LogConsoleTest(val);
            break;
        default:
            console.log("Function not found: "+val)

    }
}

export function LogConsoleTest(val:any) {
    console.log(val.inObjs[0].value) // Filter search name
    console.log("console log called from game file");
}

//drawObj

//eraseArea

//reconstructArea
