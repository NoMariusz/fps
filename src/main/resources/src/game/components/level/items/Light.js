import {
    Object3D,
    PointLight,
    SphereGeometry,
    MeshBasicMaterial,
    DoubleSide,
    Mesh,
} from "three";

export default class Light {
    constructor(scene, castShadow = false) {
        this.scene = scene;
        this.container = new Object3D();
        this.castShadow = castShadow;

        this.init();
        this.scene.add(this.container);
    }

    init() {
        this.light = new PointLight(0xfdffff, 0.2, 0, 2);
        this.light.castShadow = this.castShadow;
        this.light.position.set(0, 0, 0); // pos in container

        this.container.add(this.light);

        let geometry = new SphereGeometry(5, 3, 3);
        var material = new MeshBasicMaterial({
            color: 0xffff88,
            side: DoubleSide,
            wireframe: true,
        });
        this.mesh = new Mesh(geometry, material);

        this.container.add(this.mesh);
    }

    getContainer() {
        return this.container;
    }
}
