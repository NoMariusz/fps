import { LoadingManager, Vector3 } from "three";
import { CELL_SIZE } from "./level/constants.js";
import Model from "./models/Model.js";
import Animation from "./models/Animation.js";
import RaycastHelper from "./RaycastHelper.js";

import vaderMD2 from "./assets/vader/model.md2";
import texture from "./assets/vader/texture.png";

export default class Player {
    constructor(
        scene,
        levelSize,
        onLoadCallback,
        subscriberToRender,
        levelItems
    ) {
        this.scene = scene;

        this.subscriberToRender = subscriberToRender;

        this.levelSize = levelSize;
        this.startPos = [
            CELL_SIZE * (this.levelSize - 1),
            25,
            CELL_SIZE * (this.levelSize - 1),
        ];

        this.manager = new LoadingManager();

        this.model = new Model(this.scene, this.manager, texture);

        this.animation = null;

        this.manager.onLoad = () => {
            this.model.mesh.position.set(...this.startPos);

            this.animation = new Animation(this.model.mesh);
            this.animation.playAnim("Stand");

            this.subscriberToRender((delta) => {
                this.animation.update(delta);
                this.update();
            });
            onLoadCallback();
        };

        this.model.load(vaderMD2);

        const collideItems = levelItems
            .filter((e) => e.type == "wall")
            .map((e) => e.getContainer());
        this.collideHelper = new RaycastHelper(collideItems);

        this.enemies = levelItems.filter((e) => e.type == "enemy");
    }

    getContainer() {
        return this.model.mesh;
    }

    update() {
        this.updateEnemiesStatus();
    }

    // moving

    updateMovingStatus(isMoving) {
        if (isMoving) {
            this.animation.playAnim("CrWalk");
        } else {
            this.animation.playAnim("Stand");
        }
    }

    moveForward() {
        let frontElementDistance =
            this.collideHelper.getFrontDistanceForPlayer(this);
        if (frontElementDistance == null || frontElementDistance >= 25) {
            this.model.mesh.translateX(3);
        } else {
            this.model.mesh.translateX(frontElementDistance - 25);
        }
    }

    moveBackward() {
        let backElementDistance =
            this.collideHelper.getBackDistanceForPlayer(this);
        if (backElementDistance == null || backElementDistance >= 25) {
            this.model.mesh.translateX(-3);
        } else {
            this.model.mesh.translateX(25 - backElementDistance);
        }
    }

    // detecting enemy

    updateEnemiesStatus() {
        this.enemies.forEach((enemy) => {
            const distHelper = new RaycastHelper([enemy.getContainer()]);
            const distance = distHelper.getPlayerEnemyDistance(this, enemy);
            if (distance <= 100) {
                enemy.startAttacking(this.model.mesh.position)
            } else {
                enemy.stopAttacking(this.model.mesh.position)
            }

            enemy.update();
        });
    }

    getDistanceTo(enemy) {
        return this.model.mesh.position.distanceTo(
            enemy.getContainer().position
        );
    }
}
