import Floor from "./items/Floor.js";
import { CELL_SIZE, ITEMS_MAP } from "./constants.js";

export default class LevelRenderer {
    constructor(scene, renderer) {
        this.items = [];
        this.size = 0;
        this.scene = scene;
        this.renderer = renderer;
    }

    //rendering level stuff

    async render(data) {
        this.size = data.size;
        // renders level items
        data.items.forEach((item) => {
            this.createItem(item);
        });
        // make level floor
        this.loadFloor();
    }

    createItem(itemData) {
        let itemClass = ITEMS_MAP[itemData.type];
        if (!itemClass) return false;
        // make item
        let item = new itemClass(this.scene);
        this.items.push(item);
        // set type to intem do identify them later
        item.type = itemData.type;
        // set proper position to item
        const itemContainer = item.getContainer();
        itemContainer.position.y = CELL_SIZE / 2;
        itemContainer.position.x = CELL_SIZE * itemData.x + CELL_SIZE / 2;
        itemContainer.position.z = CELL_SIZE * itemData.z + CELL_SIZE / 2;
    }

    loadFloor() {
        const floorSize = CELL_SIZE * this.size;
        this.floor = new Floor(this.scene, floorSize);
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
                default:
                    item.getContainer().receiveShadow = value;
            }
        });
        this.floor.getContainer().receiveShadow = value;
        this.renderer.changeShaddows(value);
    }
}
