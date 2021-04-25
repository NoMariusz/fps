import {
    Mesh,
    PlaneGeometry,
    TextureLoader,
    MeshPhongMaterial,
    DoubleSide,
} from "three";
import image from "../../../gfx/materials/rocks_hexagons_base.jpg";

const TEXTURE = image;

export default class Floor {
    constructor(scene, size, margins=true) {
        this.scene = scene;
        this.size = margins ? size * 1.5 : size;

        this.geometry = new PlaneGeometry(this.size, this.size, 10, 10);
        this.material = new MeshPhongMaterial({
            shininess: 50,
            side: DoubleSide,
            map: new TextureLoader().load(TEXTURE),
        });
        this.geometry.rotateX(Math.PI / 2);

        this.mesh = new Mesh(this.geometry, this.material);
        this.mesh.position.x = this.size / 2;
        this.mesh.position.z = this.size / 2;
        // center floor with margins
        if (margins){
            this.mesh.position.x /= 1.5;
            this.mesh.position.z /= 1.5;
        }
        this.scene.add(this.mesh);
    }

    getContainer() {
        return this.mesh;
    }
}