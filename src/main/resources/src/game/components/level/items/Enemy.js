import { LoadingManager } from "three";
import { CELL_SIZE } from "../constants.js";
import LevelItem from "./LevelItem.js";
import Model from "../../models/Model.js";
import Animation from "../../models/Animation.js";
import md2model from "../../assets/atst/model.md2";
import texture from "../../assets/atst/texture.png";

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
    }

    getContainer() {
        return this.model.mesh;
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

                resolve(true);
            };

            this.model.load(md2model);
        });
    }

    update() {
        if (this.isAttacking && this.currentAnim == "stand") {
            this.runAnim("crattack");
        } else if (!this.isAttacking && this.currentAnim == "crattack") {
            this.runAnim("stand");
        }
    }

    runAnim(name) {
        this.currentAnim = name;
        this.animation.playAnim(name);
    }

    lookAt(vect){
        this.getContainer().lookAt(vect)
        this.getContainer().rotateY(- Math.PI/2)
    }

    startAttacking(playerPos){
        this.isAttacking = true;
        // to enemy look at player
        this.lookAt(playerPos)
    }
    
    stopAttacking(){
        this.isAttacking = false;
    }
}
