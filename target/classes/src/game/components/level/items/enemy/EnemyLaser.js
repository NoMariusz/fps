import Laser from "Game/models/Laser";

export default class EnemyLaser extends Laser {
    constructor(startPos, endPos) {
        super(startPos, endPos, 10, 3, 0xdc3151, 15);
    }

    // custom overrite methods to change behaviour of laser

    generateVerticlesArray() {
        // to all laser points starts in that same place
        for (let i = 0; i < this.particlesCount * 3; i += 3) {
            this.verticesArray[i] = this.startPos.x;
            this.verticesArray[i + 1] = this.startPos.y;
            this.verticesArray[i + 2] = this.startPos.z;
        }
    }

    update() {
        // to make wave effect
        super.update();
        // to move laser particles
        for (let i = 0; i < this.pointsPos.length; i += 3) {
            this.pointsPos[i] = this.pointsPos[i] - this.stepV.x / 2;
            this.pointsPos[i + 1] = this.pointsPos[i + 1] - this.stepV.y / 2;
            this.pointsPos[i + 2] = this.pointsPos[i + 2] - this.stepV.z / 2;

            // to reset if fly too long
            if (
                this.pointsPos[i] >= this.endPos.x ||
                this.pointsPos[i] <= this.startPos.x
            ) {
                this.moveParticlesToStart();
                break;
            }
        }
        this.particlesGeometry.attributes.position.needsUpdate = true;
    }

    moveParticlesToStart() {
        for (let i = 0; i < this.pointsPos.length; i += 3) {
            this.pointsPos[i] = this.startPos.x + i / this.particlesCount * 5;
            this.pointsPos[i + 1] = this.startPos.y;
            this.pointsPos[i + 2] = this.startPos.z;
        }
    }
}
