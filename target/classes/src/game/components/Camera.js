import { PerspectiveCamera, Vector3 } from "three";
import { CELL_SIZE } from "./level/constants.js";

export default class Camera {
    constructor(renderer, root, levelSize) {
        const width = renderer.domElement.width;
        const height = renderer.domElement.height;
        this.root = root;

        this.levelBoardSize = levelSize * CELL_SIZE;

        this.camVect = new Vector3(-200, 50, 0);
        this.targetOffset = new Vector3(0, 0, 0);

        this.threeCamera = new PerspectiveCamera(
            75,
            width / height,
            0.1,
            10000
        );
        this.normalView();

        this.updateSize(renderer);

        window.addEventListener(
            "resize",
            () => this.updateSize(renderer),
            false
        );
        this.isAboveView = false;
    }

    updateSize(renderer) {
        this.threeCamera.aspect =
            renderer.domElement.width / renderer.domElement.height;
        this.threeCamera.updateProjectionMatrix();
    }

    getPos(){
        return this.threeCamera.position
    }

    // changing views

    normalView() {
        // prepare position behind player, at player y level
        this.camVect = new Vector3(-200, 50, 0);
        this.isAboveView = false;
    }

    aboveView() {
        this.camVect.y =  500;
        this.isAboveView = true;
    }

    middleView() {
        this.camVect.x = 0;
        this.camVect.z = 0;
    }

    behindPlayerView(){
        this.camVect.x = -200;
        this.camVect.z = 0;
        this.dependOnPlayer();
    }

    // public camera modifiers

    changeHeight(y) {
        if (this.isAboveView){
            return false;
        }
        this.camVect.y = y;
        this.dependOnPlayer();
    }

    changeXAngle(angle) {
        this.targetOffset.y = angle;
    }

    changeRootDistance(distance) {
        if (this.isAboveView){
            return false;
        }
        this.camVect.x = distance;
        this.dependOnPlayer();
    }

    changeYAngle(angle) {
        this.targetOffset.z = angle;
    }

    changeFov(fov) {
        this.threeCamera.fov = fov;
        this.threeCamera.updateProjectionMatrix();
    }

    // utils

    dependOnPlayer() {
        // make temp vector with value of main camera vector
        const tempCamVect = new Vector3(0, 0, 0);
        tempCamVect.copy(this.camVect);
        
        const camPos = tempCamVect.applyMatrix4(this.root.getContainer().matrixWorld);
        this.threeCamera.position.x = camPos.x;
        this.threeCamera.position.y = camPos.y;
        this.threeCamera.position.z = camPos.z;
        this.threeCamera.lookAt(this.getTargetPos());
    }

    getTargetPos(){
        const tempVect = new Vector3(0, 0, 0);
        tempVect.copy(this.targetOffset);

        return tempVect.applyMatrix4(this.root.getContainer().matrixWorld);
    }
}
