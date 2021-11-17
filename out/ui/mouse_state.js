export class MouseState {
    init() {
        window.addEventListener('click', this.mouseClick.bind(this));
    }
    mouseClick() {
        console.log("click");
    }
}
