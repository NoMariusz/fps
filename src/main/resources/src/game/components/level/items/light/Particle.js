import { Sprite } from "three";

export default class Particle extends Sprite {
    constructor(material) {
        super();

        this.xOffsetMultiplier = 10;
        this.zOffsetMultiplier = 10;

        this.material = material.clone();
        // sprite scale
        this.scale.set(
            Math.random() * 50,
            Math.random() * 100,
            Math.random() * 50
        );
    }

    update() {
        // particle movement, to imitate fire
        if (this.position.y > 0.3) {
            this.position.x = (Math.random() - 0.5) * this.xOffsetMultiplier;
            this.position.z = (Math.random() - 0.5) * this.zOffsetMultiplier;
            this.position.y = 0;
            this.material.opacity = 1;
        }

        this.material.opacity -= 0.1;
        this.position.y += Math.random() * 0.1;
    }

    scaleSize(value) {
        this.scale.set(
            Math.random() * 50 * value,
            Math.random() * 100 * value,
            Math.random() * 50 * value
        );
    }

    scaleX(value) {
        this.xOffsetMultiplier = value;
    }

    scaleZ(value) {
        this.zOffsetMultiplier = value;
    }
}
