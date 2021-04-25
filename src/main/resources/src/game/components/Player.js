import { ConeGeometry, MeshPhongMaterial, DoubleSide, Mesh } from "three";
import { CELL_SIZE } from "./level/constants.js";

export default class Enemy {
    constructor(scene, levelSize) {
        this.scene = scene;
        this.size = CELL_SIZE / 10;

        this.levelSize = levelSize;
        this.startPos = [
            CELL_SIZE * (this.levelSize - 1),
            this.size,
            CELL_SIZE * (this.levelSize - 1),
        ];

        this.geometry = new ConeGeometry(this.size, this.size, this.size);
        this.material = new MeshPhongMaterial({
            specular: 0xccffcc,
            color: 0x88ff88,
            shininess: 50,
            side: DoubleSide,
            wireframe: true,
        });

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.set(...this.startPos);
        this.scene.add(this.mesh);
    }

    getContainer() {
        return this.mesh;
    }
}
