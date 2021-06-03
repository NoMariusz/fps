import { Raycaster, Ray, Vector3 } from "three";

const PLAYER_ROTATION_OFFSET = Math.PI / 2

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

        playerVect.applyAxisAngle(axis, PLAYER_ROTATION_OFFSET);
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

        playerVect.applyAxisAngle(axis, PLAYER_ROTATION_OFFSET + Math.PI);
        return this.getFrontElementDistance(
            player.getContainer().position,
            playerVect
        );
    }

    getPlayerEnemyDistance(player, enemy) {
        const pPos = player.getContainer().position
        // direction targeting to up from enemy pos (to target head of standing enemy)
        const dir1 = this.getPlayerEnemyDir(player, enemy, 15);
        // direction to target middel of enemy (to target head of enemy when sit)
        const dir2 = this.getPlayerEnemyDir(player, enemy, -5);

        // get and return distance1 if target enemy
        const distance1 = this.getFrontElementDistance(
            pPos,
            dir1
        );
        if (distance1){
            return distance1
        }

        // if distance 1 is bad, get and return distance 2
        const distance2 = this.getFrontElementDistance(
            pPos,
            dir2
        );
        return distance2
    }

    getPlayerEnemyDir(player, enemy, offset){
        const playerPos = new Vector3().copy(player.getContainer().position);

        const enemyToPlayer = new Vector3().copy(enemy.getContainer().position)
        enemyToPlayer.y += offset // to to target in head of enemy
        enemyToPlayer.sub(playerPos);
        enemyToPlayer.normalize();

        return enemyToPlayer
    }
}
