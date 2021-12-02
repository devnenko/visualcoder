export class MouseState {
    static init() {
        window.addEventListener('click', MouseState.mouseClick.bind(this));
    }
    static mouseClick(e) {
        MouseState.absPos = { x: e.x, y: e.y };
        var obj = MouseState.canvases[0].getOverlapp(e.x, e.y);
        console.log(obj);
        obj.clickE();
    }
}
MouseState.canvases = [];
MouseState.absPos = { x: 0, y: 0 };
