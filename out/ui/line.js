export class Line {
    constructor(drawParent, canvas) {
        this.discriminator1 = 'IShape';
        this.children = [];
        this.fixedPos1 = { x: 0, y: 0 };
        this.fixedPos2 = { x: 0, y: 0 };
        this.obj1 = null;
        this.obj2 = null;
        //additional display options 
        this.isVisible = true;
        this.color = "pink";
        drawParent.children.push(this); //set this as a child of parent to create an object tree
        this.parent = drawParent;
        this.canvas = canvas;
    }
    //overlappHierarchy(pos:IPos): Button[] {
    //    return [];
    //}
    destroy() {
        //this.parent.children.splice(this.parent.children.indexOf(this),1);
        //console.log("dest")
        const len = this.children.length;
        for (let i = 0; i < len; i++) {
            this.children[0].destroy();
        }
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        //this.parent.children.splice(this.parent.children.indexOf(this),1);
    }
    draw() {
        if (this.isVisible == true) {
            this.canvas.ctx.beginPath();
            this.canvas.ctx.lineWidth = 10;
            this.canvas.ctx.strokeStyle = this.color;
            if (this.obj1 == null) {
                this.canvas.ctx.moveTo(this.fixedPos1.x, this.fixedPos1.y);
            }
            else {
                this.canvas.ctx.moveTo(this.obj1.absEdges.left + (this.obj1.absEdges.right - this.obj1.absEdges.left) / 2, this.obj1.absEdges.top + (this.obj1.absEdges.bottom - this.obj1.absEdges.top) / 2);
            }
            if (this.obj2 == null) {
                this.canvas.ctx.lineTo(this.fixedPos2.x, this.fixedPos2.y);
            }
            else {
                this.canvas.ctx.lineTo(this.obj2.absEdges.left + (this.obj2.absEdges.right - this.obj2.absEdges.left) / 2, this.obj2.absEdges.top + (this.obj2.absEdges.bottom - this.obj2.absEdges.top) / 2);
            }
            this.canvas.ctx.stroke();
        }
    }
    drawHierarchy(parent) {
        this.draw();
    }
}
