import LevelRenderer from "./LevelRenderer.js";

const TEST_RAW_LEVEL =
'{"size":10,"items":[{"id":2,"x":6,"y":0,"z":0,"type":"wall"},{"id":3,"x":6,"y":0,"z":1,"type":"wall"},{"id":4,"x":6,"y":0,"z":2,"type":"wall"},{"id":5,"x":6,"y":0,"z":3,"type":"wall"},{"id":6,"x":6,"y":0,"z":4,"type":"wall"},{"id":7,"x":6,"y":0,"z":5,"type":"wall"},{"id":8,"x":7,"y":0,"z":5,"type":"wall"},{"id":9,"x":8,"y":0,"z":5,"type":"wall"},{"id":10,"x":7,"y":0,"z":8,"type":"wall"},{"id":11,"x":5,"y":0,"z":5,"type":"wall"},{"id":12,"x":3,"y":0,"z":5,"type":"wall"},{"id":14,"x":1,"y":0,"z":5,"type":"wall"},{"id":15,"x":0,"y":0,"z":5,"type":"wall"},{"id":16,"x":4,"y":0,"z":8,"type":"wall"},{"id":17,"x":1,"y":0,"z":8,"type":"wall"},{"id":25,"x":7,"y":0,"z":4,"type":"light"},{"id":26,"x":8,"y":0,"z":2,"type":"wall"},{"id":27,"x":1,"y":0,"z":1,"type":"enemy"},{"id":28,"x":1,"y":0,"z":3,"type":"enemy"},{"id":29,"x":4,"y":0,"z":1,"type":"enemy"},{"id":30,"x":4,"y":0,"z":3,"type":"enemy"},{"id":31,"x":2,"y":0,"z":2,"type":"treasure"},{"id":32,"x":3,"y":0,"z":2,"type":"treasure"},{"id":33,"x":1,"y":0,"z":7,"type":"enemy"},{"id":34,"x":4,"y":0,"z":7,"type":"enemy"},{"id":35,"x":7,"y":0,"z":7,"type":"enemy"},{"id":36,"x":5,"y":0,"z":0,"type":"wall"},{"id":37,"x":4,"y":0,"z":0,"type":"wall"},{"id":38,"x":3,"y":0,"z":0,"type":"wall"},{"id":39,"x":2,"y":0,"z":0,"type":"wall"},{"id":40,"x":1,"y":0,"z":0,"type":"wall"},{"id":41,"x":0,"y":0,"z":0,"type":"wall"},{"id":42,"x":0,"y":0,"z":1,"type":"wall"},{"id":43,"x":0,"y":0,"z":2,"type":"wall"},{"id":44,"x":0,"y":0,"z":3,"type":"wall"},{"id":45,"x":0,"y":0,"z":4,"type":"wall"},{"id":61,"x":0,"y":0,"z":9,"type":"light"},{"id":62,"x":2,"y":0,"z":9,"type":"light"},{"id":63,"x":3,"y":0,"z":9,"type":"light"},{"id":64,"x":5,"y":0,"z":9,"type":"light"},{"id":65,"x":6,"y":0,"z":9,"type":"light"},{"id":66,"x":8,"y":0,"z":9,"type":"light"},{"id":67,"x":9,"y":0,"z":9,"type":"light"},{"id":68,"x":1,"y":0,"z":4,"type":"light"},{"id":69,"x":5,"y":0,"z":4,"type":"light"}]}';


export default class LevelLoader {
    constructor(scene) {
        this.levelRenderer = new LevelRenderer(scene);
    }

    async load() {
        const res = await fetch("/editor/load");
        if (!res.ok) {
            return false;
        }
        const data = await res.json() || {size: 10, items: []};
        // const data = JSON.parse(TEST_RAW_LEVEL);
        console.log("loading level: ", data);
        await this.levelRenderer.render(data);
        return true;
    }
}
