import {
    BoxGeometry,
    MeshPhongMaterial,
    DoubleSide,
    Mesh,
} from "three";
import { CELL_SIZE } from "../constants.js";
import LevelItem from "./LevelItem.js"

export default class Treasure extends LevelItem {
    constructor(scene) {
        super();
        this.scene = scene;
        this.size = CELL_SIZE / 10;

        this.geometry = new BoxGeometry(this.size, this.size, this.size);
        this.material = new MeshPhongMaterial({
            specular: 0xccccff,
            color: 0x8888ff,
            shininess: 50,
            side: DoubleSide,
            wireframe: true,
        });

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);
    }

    getContainer() {
        return this.mesh;
    }
}
