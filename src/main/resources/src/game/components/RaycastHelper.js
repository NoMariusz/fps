import { Raycaster, Ray, Vector3 } from "three";

export default class RaycastHelper {
    constructor(elements) {
        this.raycaster = new Raycaster();
        // elements to check if collide
        this.elements = elements;
    }

    // main utils

    getFrontElementDistance(origin, direction) {
        let ray = new Ray(origin, direction);
        this.raycaster.ray = ray;

        let intersects = this.raycaster.intersectObjects(this.elements);
        if (intersects.length == 0) {
            return null;
        }

        // console.log(JSON.stringify(intersects[0].object));
        return intersects[0].distance;
    }

    // public helpers

    getFrontDistanceForPlayer(player) {
        // calc distance between player and element that is closest to him
        const axis = new Vector3(0, 1, 0);
        const playerVect = new Vector3();
        player.getContainer().getWorldDirection(playerVect);

        playerVect.applyAxisAngle(axis, Math.PI / 4);
        return this.getFrontElementDistance(
            player.getContainer().position,
            playerVect
        );
    }

    getBackDistanceForPlayer(player) {
        // calc distance between player and element that is closest to him backs
        const axis = new Vector3(0, 1, 0);
        const playerVect = new Vector3();
        player.getContainer().getWorldDirection(playerVect);

        playerVect.applyAxisAngle(axis, (Math.PI / 4) * 3);
        return this.getFrontElementDistance(
            player.getContainer().position,
            playerVect
        );
    }
}
