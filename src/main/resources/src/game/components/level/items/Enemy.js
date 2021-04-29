import {
    LoadingManager
} from "three";
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
    }

    getContainer() {
        return this.model.mesh;
    }

    load(){
        return new Promise((resolve) => {
            this.manager.onLoad = () => {
                this.animation = new Animation(this.model.mesh);
                this.animation.playAnim("stand")
                this.subscriberToRender((delta) => {this.animation.update(delta)})
                resolve(true)
            }
    
            this.model.load(md2model);
        })
    }
}
