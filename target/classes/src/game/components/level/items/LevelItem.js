export default class LevelItem {
    constructor() {
        this.type = "default";
    }

    async load() {
        // function for items to indicite if model is loaded, to enable parent
        // to make operations when model end loading
        return true;
    }
}
