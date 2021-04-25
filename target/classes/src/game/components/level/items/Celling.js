import {
    Mesh,
    PlaneGeometry,
    TextureLoader,
    MeshPhongMaterial,
    DoubleSide,
    RepeatWrapping,
} from "three";
import image from "../../../gfx/materials/rock_base.jpg";
import { CELL_SIZE } from "../constants.js";

const TEXTURE = image;

export default class Celling {
    constructor(scene, size, margins = true) {
        this.scene = scene;
        this.size = margins ? size * 1.5 : size;

        this.geometry = new PlaneGeometry(this.size, this.size, 10, 10);

        const texture = new TextureLoader().load( TEXTURE );
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set( 5, 5 );

        this.material = new MeshPhongMaterial({
            shininess: 50,
            side: DoubleSide,
            map: texture,
        });
        this.geometry.rotateX(Math.PI / 2);

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.receiveShadow = true;

        this.mesh.position.y = CELL_SIZE;

        // center celling
        this.mesh.position.x = this.size / 2;
        this.mesh.position.z = this.size / 2;
        if (margins) {
            this.mesh.position.x /= 1.5;
            this.mesh.position.z /= 1.5;
        }
        this.scene.add(this.mesh);
    }

    getContainer() {
        return this.mesh;
    }
}
