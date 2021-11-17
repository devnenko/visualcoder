export class MouseState{
    public static absPos={x:0,y:0};
    public static init(){
        window.addEventListener('click', MouseState.mouseClick.bind(this));
    }
    private static mouseClick(e:MouseEvent) {
        console.log("click")
        MouseState.absPos={x:e.x,y:e.y}
        console.log(MouseState.absPos);
    }
}