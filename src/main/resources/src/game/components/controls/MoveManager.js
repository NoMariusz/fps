import Config from "./Config";
import Keyboard from "./Keyboard";

export default class MoveManager{
    constructor(root, camera){
        this.root = root
        this.camera = camera
        this.keyboard = new Keyboard(window);
        this.isRootMoving = false;
    }

    update(){
        if (this.root.getContainer()) {
            //
            if (Config.rotateLeft) {
                this.root.getContainer().rotation.y += 0.05;
            }
            if (Config.rotateRight) {
                this.root.getContainer().rotation.y -= 0.05;
            }
            if (Config.moveForward) {
                this.root.moveForward();
            }

            // set camera depend of pleyr pos
            this.camera.dependOnPlayer();

            // change root status if value changed
            if (Config.moveForward != this.isRootMoving){
                this.isRootMoving = Config.moveForward;
                this.root.updateMovingStatus(this.isRootMoving);
            }
        }
    }
}