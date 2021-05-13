import { Object3D, PointLight } from "three";

import LevelItem from "../LevelItem.js";
import Fireplace from "./Fireplace.js";

export default class Light extends LevelItem {
    constructor(scene, subscriberToRender) {
        super();
        this.scene = scene;
        this.container = new Object3D();

        this.subscriberToRender = subscriberToRender;

        this.init();
        this.scene.add(this.container);
    }

    init() {
        // init light
        this.light = new PointLight(0xcf4f30, 0.2, 0, 2);
        this.light.position.set(0, 0, 0); // pos in container

        this.container.add(this.light);

        // init fire particles
        this.fire = new Fireplace();
        this.fire.position.set(0, 0, 0);

        this.container.add(this.fire);

        this.subscriberToRender(() => {
            this.fire.update();
        });
    }

    getContainer() {
        return this.container;
    }

    changeIntensity(value) {
        this.light.intensity = value;
    }

    changeCastShaddows(value) {
        this.light.castShadow = value;
    }

    scaleFireSize(value) {
        this.fire.scaleSize(value);
    }

    scaleFireWidthX(value) {
        this.fire.scaleParticlesX(value);
    }

    scaleFireWidthZ(value) {
        this.fire.scaleParticlesZ(value);
    }
}
