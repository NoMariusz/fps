import Floor from "./items/Floor.js";
import { CELL_SIZE, ITEMS_MAP } from "./constants.js";
import Ceilling from "./items/Ceilling.js";

export default class LevelRenderer {
    constructor(scene, renderer, subscriberToRender) {
        this.items = [];
        this.size = 0;
        this.scene = scene;
        this.renderer = renderer;
        this.subscriberToRender = subscriberToRender;
    }

    //rendering level stuff

    async render(data) {
        this.size = data.size;
        // renders level items
        for (const item of data.items){
            await this.createItem(item);
        }
        // make level floor and celling
        this.loadFloor();
        this.loadCeilling();
    }

    async createItem(itemData) {
        let itemClass = ITEMS_MAP[itemData.type];
        if (!itemClass) return false;
        // make item
        let item = new itemClass(this.scene, this.subscriberToRender);
        this.items.push(item);
        // set type to intem do identify them later
        item.type = itemData.type;
        await item.load();
        // set proper position to item, after loading
        const itemContainer = item.getContainer();
        itemContainer.position.y = item.getYOffset();
        itemContainer.position.x = CELL_SIZE * itemData.x + CELL_SIZE / 2;
        itemContainer.position.z = CELL_SIZE * itemData.z + CELL_SIZE / 2;
    }

    loadFloor() {
        const floorSize = CELL_SIZE * this.size;
        this.floor = new Floor(this.scene, floorSize);
    }

    loadCeilling() {
        const size = CELL_SIZE * this.size;
        this.ceilling = new Ceilling(this.scene, size);
    }

    // public level modifiers

    changeLightsIntensity(value) {
        this.items.forEach((item) => {
            if (item.type == "light") {
                item.changeIntensity(value);
            }
        });
    }

    changeShaddows(value) {
        this.items.forEach((item) => {
            switch (item.type) {
                case "light":
                    item.changeCastShaddows(value);
            }
        });
        this.renderer.changeShaddows(value);
    }

    hideCeilling() {
        this.ceilling.getContainer().visible = false;
    }

    showCeilling() {
        this.ceilling.getContainer().visible = true;
    }

    changeFireSize(value){
        this.items.forEach((item) => {
            if (item.type == "light") {
                item.scaleFireSize(value);
            }
        });
    }

    changeFireWidthX(value){
        this.items.forEach((item) => {
            if (item.type == "light") {
                item.scaleFireWidthX(value);
            }
        });
    }

    changeFireWidthZ(value){
        this.items.forEach((item) => {
            if (item.type == "light") {
                item.scaleFireWidthZ(value);
            }
        });
    }
}
