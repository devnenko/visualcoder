import { GeScript } from "./ge_interface";

class Compiler{
    compile(script:GeScript){
        //returns js compatible string from script
        let str="";
        for(const f of script.functions){
            str.concat(f.jsEquiv)
        }
        return str;
    }
    createAndRunScript(src:string){
        var script = document.createElement("script");
        var inlineScript = document.createTextNode(src);
        script.appendChild(inlineScript); 
        document.head.appendChild(script);
    }
    createNewPage(){
        //add boilerplate code for default behaviour and webgpu setup
    }
}

export const compiler=new Compiler;