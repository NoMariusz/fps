import { PerspectiveCamera } from "three";
import { CELL_SIZE } from "./level/constants.js";

export default class Camera {
    constructor(renderer, root, levelSize) {
        const width = renderer.domElement.width;
        const height = renderer.domElement.height;
        this.root = root;

        this.levelBoardSize = levelSize * CELL_SIZE;

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
        const rootPos = this.root.getContainer().position;
        this.threeCamera.position.y = rootPos.y;
        this.behindPlayerView()
        this.isAboveView = false;
    }

    aboveView() {
        this.threeCamera.position.y = (this.levelBoardSize * 2) / 3
        this.middleView();
        this.isAboveView = true;
    }

    middleView() {
        this.threeCamera.position.x = this.levelBoardSize / 2;
        this.threeCamera.position.z = this.levelBoardSize / 2;
        this.threeCamera.lookAt(
            this.levelBoardSize / 2,
            0,
            this.levelBoardSize / 2
        );
    }

    behindPlayerView(){
        const rootPos = this.root.getContainer().position;
        this.threeCamera.position.x = rootPos.x;
        this.threeCamera.position.z = rootPos.z + 45;
        this.lookAtPlayer();
    }

    // public camera modifiers

    changeHeight(y) {
        if (this.isAboveView){
            return false;
        }
        this.threeCamera.position.y = y;
        this.lookAtPlayer();
    }

    changeXAngle(angle) {
        this.threeCamera.rotation.x = angle;
    }

    changeYAngle(angle) {
        this.threeCamera.rotation.y = angle;
    }

    changeRootDistance(distance) {
        if (this.isAboveView){
            return false;
        }
        const rootPos = this.root.getContainer().position;
        this.threeCamera.position.z = rootPos.z + distance;
        this.lookAtPlayer();
    }

    changeYAngle(angle) {
        this.threeCamera.rotation.y = angle;
    }

    changeFov(fov) {
        this.threeCamera.fov = fov;
        this.threeCamera.updateProjectionMatrix();
    }

    // utils

    lookAtPlayer() {
        this.threeCamera.lookAt(this.root.getContainer().position);
    }
}
