import { TEST_RAW_LEVEL } from "../../../constants.js";

export default class LevelLoader {
    constructor(renderer) {
        this.levelRenderer = renderer;
    }

    async load() {
        // const res = await fetch("/editor/load");
        // if (!res.ok) {
        //     return false;
        // }
        // const data = (await res.json()) || { size: 10, items: [] };
        const data = JSON.parse(TEST_RAW_LEVEL);
        console.log("loading level: ", data);
        await this.levelRenderer.render(data);
        return true;
    }
}
