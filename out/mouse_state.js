export class MouseState {
    static init() {
        window.addEventListener('click', MouseState.mouseClick.bind(this));
    }
    static mouseClick(e) {
        console.log("click");
        MouseState.absPos = { x: e.x, y: e.y };
        console.log(MouseState.absPos);
    }
}
MouseState.absPos = { x: 0, y: 0 };
