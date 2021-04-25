import {
    BoxGeometry,
    MeshPhongMaterial,
    DoubleSide,
    Mesh,
} from "three";
import { CELL_SIZE } from "../constants.js";

export default class Enemy {
    constructor(scene) {
        this.scene = scene;
        this.size = CELL_SIZE / 10;

        this.geometry = new BoxGeometry(this.size, this.size, this.size);
        this.material = new MeshPhongMaterial({
            specular: 0xffcccc,
            color: 0xff8888,
            shininess: 50,
            side: DoubleSide,
            wireframe: true,
        });

        this.mesh = new Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    getContainer() {
        return this.mesh;
    }
}
