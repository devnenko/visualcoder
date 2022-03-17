export class TransformConversions {
    static edgesToPosAndSize(edges) {
        //convert absolute edges to position and size
        let res = { pos: { x: 0, y: 0 }, size: { w: 0, h: 0 } };
        res.pos.x = edges.left;
        res.pos.y = edges.top;
        res.size.w = edges.right - edges.left;
        res.size.h = edges.bottom - edges.top;
        return res;
    }
    static average(var1, var2) {
        return (var1 + var2) / 2;
    }
}
