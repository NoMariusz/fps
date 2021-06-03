import { LoadingManager, Vector3 } from "three";
import { CELL_SIZE } from "../level/constants.js";
import Model from "../models/Model.js";
import Animation from "../models/Animation.js";
import RaycastHelper from "../RaycastHelper.js";

import vaderMD2 from "../assets/vader/model.md2";
import texture from "../assets/vader/texture.png";
import Laser from "./PlayerLaser.js";

const PLAYER_LASER_DISTANCE = 200;

export default class Player {
    constructor(
        scene,
        levelSize,
        onLoadCallback,
        subscriberToRender,
        levelItems,
        scoreManager,
    ) {
        this.scene = scene;

        this.subscriberToRender = subscriberToRender;

        this.scoreManager = scoreManager

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

            this.initLaser();

            onLoadCallback();
        };

        this.model.load(vaderMD2);

        const collideItems = levelItems
            .filter((e) => e.type == "wall")
            .map((e) => e.getContainer());
        this.collideHelper = new RaycastHelper(collideItems);

        this.enemies = levelItems.filter((e) => e.type == "enemy");

        this.actualAnim = "Stand";
        this.isAttacking = false;
    }

    initLaser() {
        this.laser = new Laser(new Vector3(0, 0, 0), new Vector3(-PLAYER_LASER_DISTANCE, 0, 0));
        this.model.mesh.add(this.laser.mesh);
        this.laser.mesh.visible = false;
    }

    getContainer() {
        return this.model.mesh;
    }

    update() {
        this.updateEnemiesStatus();
        this.laser.update();
        this.updatePlayerAttack();
    }

    // moving

    updateMovingStatus(isMoving) {
        this.isMoving = isMoving;

        if (this.isAttacking) {
            this.playAnim("Attack");
            return;
        }

        if (isMoving) {
            this.playAnim("CrWalk");
        } else {
            this.playAnim("Stand");
        }
    }

    playAnim(name) {
        // to not restart actual anims
        if (this.actualAnim != name){
            this.actualAnim = name;
            this.animation.playAnim(name);
        }
    }

    moveForward() {
        let frontElementDistance =
            this.collideHelper.getFrontDistanceForPlayer(this);
        if (frontElementDistance == null || frontElementDistance > 25) {
            this.model.mesh.translateX(3);
        } else {
            this.model.mesh.translateX(frontElementDistance - 25);
        }
    }

    moveBackward() {
        let backElementDistance =
            this.collideHelper.getBackDistanceForPlayer(this);
        if (backElementDistance == null || backElementDistance > 25) {
            this.model.mesh.translateX(-3);
        } else {
            this.model.mesh.translateX(25 - backElementDistance);
        }
    }

    // detecting enemy

    updateEnemiesStatus() {
        this.enemies.forEach((enemy) => {
            const distHelper = new RaycastHelper([enemy.model.mesh]);
            const distance = distHelper.getPlayerEnemyDistance(this, enemy);
            if (distance && distance <= 100) {
                if (!enemy.isAttacking){
                    enemy.startAttacking(this.model.mesh.position);
                    this.scoreManager.startEnemyAttacking()
                }
            } else {
                if (enemy.isAttacking){
                    enemy.stopAttacking(this.model.mesh.position);
                    this.scoreManager.stopEnemyAttacking()
                }
            }

            enemy.update();
        });
    }

    getDistanceTo(enemy) {
        return this.model.mesh.position.distanceTo(
            enemy.getContainer().position
        );
    }

    // player attack

    startAttacking() {
        this.isAttacking = true;
        this.playAnim("Attack");
        this.laser.mesh.visible = true;
    }

    stopAttacking() {
        this.isAttacking = false;
        this.updateMovingStatus(this.isMoving);
        this.laser.mesh.visible = false;

        this.enemies.forEach(enemy => {
            this.scoreManager.stopPlayerAttacking(enemy)
        })
    }

    updatePlayerAttack(){
        if (!this.isAttacking){
            return
        }
        // check if player hit enemy, and change score
        this.enemies.forEach((enemy) => {
            const distance = this.getPlayerHitEnemyDistance(enemy);
            if(distance != null && distance <= PLAYER_LASER_DISTANCE){
                this.scoreManager.startPlayerAttacking(enemy)
            } else {
                this.scoreManager.stopPlayerAttacking(enemy)
            }
        })
    }

    getPlayerHitEnemyDistance(enemy){
        const helper = new RaycastHelper([enemy.model.mesh])
        return helper.getFrontDistanceForPlayer(this);
    }
}
