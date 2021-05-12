import {
    Object3D,
    SpriteMaterial,
    TextureLoader,
    AdditiveBlending,
} from "three";
import fireTex from "../../../assets/particle.png";
import Particle from "./Particle.js";

export default class Fireplace extends Object3D {
    constructor() {
        super();

        this.particles = [];
        // particles count
        this.count = 100;
        // particle material with blending to blend particles
        this.particleMaterial = new SpriteMaterial({
            color: 0xff6000,
            map: new TextureLoader().load(fireTex),
            transparent: true,
            opacity: 0.8,
            depthWrite: false,
            blending: AdditiveBlending,
        });

        this.init();
    }

    init() {
        // in loop make proper count of particles
        while (this.particles.length < this.count) {
            var particle = new Particle(this.particleMaterial);
            this.add(particle);
            this.particles.push(particle);
        }
    }

    update() {
        // update particles
        this.particles.forEach((particle) => {
            particle.update();
        });
    }
}
