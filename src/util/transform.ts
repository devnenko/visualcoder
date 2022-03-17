export interface IPos{
    x:number;
    y:number;
}

export interface ISize{
    w:number;
    h:number;
}

export interface ITransform {
    pos:IPos;
    size:ISize;
}


export interface IEdges {
    left: number;
    right: number;
    top: number;
    bottom: number;
}

export abstract class TransformConversions{
    static edgesToPosAndSize(edges:IEdges){
        //convert absolute edges to position and size
        let res:ITransform={pos:{x:0,y:0},size:{w:0,h:0}}
        res.pos.x=edges.left;
        res.pos.y=edges.top;
        res.size.w=edges.right-edges.left;
        res.size.h=edges.bottom-edges.top;
        return res;
    }
    static average(var1:number,var2:number){
        return (var1+var2)/2;
    }
}