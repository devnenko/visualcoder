export class Framework {
    constructor() {
        //create canvas in Dom and set value in class
        var canvas = document.createElement('canvas');
        console.log(canvas);
        document.body.appendChild(canvas);
        this.canvas = canvas;
        //set context in class
        this.ctx = canvas.getContext("2d");
        //initial resize window
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow.bind(this));
    }
    resizeWindow() {
        console.log("test");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    addSquare(posX, posY, sizeX, sizeY) {
        this.ctx.beginPath();
        this.ctx.rect(posX, posY, sizeX, sizeY);
        this.ctx.stroke();
    }
}
