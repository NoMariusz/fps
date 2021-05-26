import {
    BufferGeometry,
    PointsMaterial,
    TextureLoader,
    AdditiveBlending,
    BufferAttribute,
    Points,
} from "three";

import fireTex from "../assets/particle.png";

export default class Laser {
    constructor(startPos, endPos, count, disp, color, size) {
        this.startPos = startPos;
        this.endPos = endPos;

        this.particlesCount = count;

        const subV = startPos.clone().sub(endPos.clone());
        this.stepV = subV.divideScalar(this.particlesCount);

        this.verticesArray = new Float32Array(this.particlesCount * 3);

        this.particlesGeometry = new BufferGeometry();

        this.particleMaterial = new PointsMaterial({
            color: color,
            depthWrite: false,
            transparent: true,
            size: size,
            map: new TextureLoader().load(fireTex),
            blending: AdditiveBlending,
        });

        this.dispersion = disp;

        this.generate();
    }

    generate() {
        this.generateVerticlesArray();

        // set points to geometry
        this.particlesGeometry.setAttribute(
            "position",
            new BufferAttribute(this.verticesArray, 3)
        );

        // clone values of start particles positions
        this.pointsPos = [...this.particlesGeometry.attributes.position.array];

        // make mesh from geometry
        this.mesh = new Points(this.particlesGeometry, this.particleMaterial);
    }

    generateVerticlesArray(){
        for (let i = 0; i < this.particlesCount * 3; i += 3) {
            this.verticesArray[i] = (this.stepV.x * i) / 3;
            this.verticesArray[i + 1] = (this.stepV.y * i) / 3;
            this.verticesArray[i + 2] = (this.stepV.z * i) / 3;
        }
    }

    update() {
        let positions = this.particlesGeometry.attributes.position.array;
        // console.log(positions);
        for (let i=0; i< positions.length; i++){
            positions[i] = this.pointsPos[i] + (Math.random() - 0.5) * this.dispersion;
        };
        this.particlesGeometry.attributes.position.needsUpdate = true;
    }
}
