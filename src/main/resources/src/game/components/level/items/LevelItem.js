export default class LevelItem {
    constructor() {
        this.type = "default";

        this.levelItemToOffset = {
            wall: 50,
            enemy: 30,
            treasure: 10,
            light: 90
        }
    }

    async load() {
        // function for items to indicite if model is loaded, to enable parent
        // to make operations when model end loading
        return true;
    }

    getYOffset(){
        return this.levelItemToOffset[this.type]
    }
}
