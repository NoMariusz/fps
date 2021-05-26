import { LoadingManager, Object3D, Vector3 } from "three";
import { CELL_SIZE } from "../../constants.js";
import LevelItem from "../LevelItem.js";
import Model from "Game/models/Model.js";
import Animation from "Game/models/Animation.js";
import md2model from "Game/assets/atst/model.md2";
import texture from "Game/assets/atst/texture.png";
import Laser from "./EnemyLaser.js";

export default class Enemy extends LevelItem {
    constructor(scene, subscriberToRender) {
        super();
        this.scene = scene;
        this.size = CELL_SIZE / 10;

        this.subscriberToRender = subscriberToRender;

        this.manager = new LoadingManager();
        this.model = new Model(this.scene, this.manager, texture);

        this.animation = null;
        this.currentAnim = "stand";

        this.isAttacking = false;

        this.container = new Object3D();
    }

    
    load() {
        return new Promise((resolve) => {
            this.manager.onLoad = () => {
                this.animation = new Animation(this.model.mesh);
                this.runAnim("stand");
                // console.log(this.model.geometry.animations);
                this.subscriberToRender((delta) => {
                    this.animation.update(delta);
                });

                this.initLaser();

                this.container.add(this.model.mesh);
                this.scene.add(this.container);
                
                resolve(true);
            };
            
            this.model.load(md2model);
        });
    }

    initLaser(){
        this.laser = new Laser(new Vector3(0, 0, 0), new Vector3(90, 0, 0))
        this.container.add(this.laser.mesh)
        this.laser.mesh.visible = false;
    }

    // overall

    getContainer() {
        return this.container
    }

    update() {
        if (this.isAttacking && this.currentAnim == "stand") {
            this.runAnim("crattack");
        } else if (!this.isAttacking && this.currentAnim == "crattack") {
            this.runAnim("stand");
        }
        this.laser.update();
    }

    // anims

    runAnim(name) {
        this.currentAnim = name;
        this.animation.playAnim(name);
    }

    // attacking
    
    startAttacking(playerPos){
        this.isAttacking = true;
        // to enemy look at player
        this.lookAt(playerPos)
        this.laser.mesh.visible = true;
    }
    
    stopAttacking(){
        this.isAttacking = false;
        this.laser.mesh.visible = false;
    }

    lookAt(vect){
        this.getContainer().lookAt(vect)
        this.getContainer().rotateY(- Math.PI/2)
    }
}
