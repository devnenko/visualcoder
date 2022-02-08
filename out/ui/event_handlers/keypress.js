//add info here
//
export class KeypressHandler {
    static init() {
        document.addEventListener('keydown', this.logKey.bind(this));
    }
    static subscribe(object) {
        this.callBackObjects.push(object);
    }
    static logKey(e) {
        console.log(e);
        for (const obj of this.callBackObjects) {
            obj.onKeyPress(e.key);
        }
    }
}
KeypressHandler.callBackObjects = [];
