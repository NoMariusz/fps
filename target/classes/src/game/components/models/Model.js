import { MD2Loader } from 'three/examples/jsm/loaders/MD2Loader.js';
import { Mesh, TextureLoader, MeshPhongMaterial } from "three"

export default class Model {
    constructor(scene, manager, texture) {
        this.scene = scene;
        this.mesh = null;
        this.manager = manager;
        this.geometry = null;
        this.texture = texture;
    }

    load(path) {
        // Manager is passed in to loader to determine when loading done in main
        // Load model with FBXLoader
        new MD2Loader(this.manager).load(
            path,
            geometry => {
                this.geometry = geometry;

                this.mesh = new Mesh(geometry, new MeshPhongMaterial({
                    map: new TextureLoader().load(this.texture),
                    morphTargets: true
                }))
                this.mesh.castShadow = true;

                this.scene.add(this.mesh);
                // to show list of model animations
                // console.log(this.geometry.animations)
            },
        );
    }

    unload() {
        this.scene.remove(this.mesh);
    }
}