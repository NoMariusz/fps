import {
    BoxGeometry,
    MeshPhongMaterial,
    TextureLoader,
    DoubleSide,
    Mesh,
} from "three";
import image from "../../../gfx/materials/wall_base.jpg";
import { CELL_SIZE } from "../constants.js";
import LevelItem from "./LevelItem.js"

const TEXTURE = image;

export default class Wall extends LevelItem {
    constructor(scene) {
        super();
        this.scene = scene;
        this.size = CELL_SIZE;

        this.geometry = new BoxGeometry(this.size, this.size, this.size);
        this.material = new MeshPhongMaterial({
            shininess: 50,
            side: DoubleSide,
            map: new TextureLoader().load(TEXTURE),
        });

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);
    }

    getContainer() {
        return this.mesh;
    }
}
