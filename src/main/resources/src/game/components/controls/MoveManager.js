import Config from "./Config";
import Keyboard from "./Keyboard";

export default class MoveManager{
    constructor(root, camera){
        this.root = root
        this.camera = camera
        this.keyboard = new Keyboard(window);
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
                this.root.getContainer().translateX(3);
            }

            // set camera depend of pleyr pos
            this.camera.dependOnPlayer();
        }
    }
}