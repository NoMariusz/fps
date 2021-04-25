import { Scene } from 'three';
import Renderer from './Renderer.js';
import Camera from './Camera.js';
import LoadingDisplayer from "./LoadingDisplayer.js"
import HelperAxes from "./HelperAxes.js";
import LevelLoader from "./level/LevelLoader.js";

export default class Render {
    constructor(container) {
        this.container = container;

        this.loadingDisplayer = new LoadingDisplayer(this.container);
        this.loadingDisplayer.showLoading();

        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, container);
        this.camera = new Camera(this.renderer.threeRenderer);
        this.helperAxes = new HelperAxes(this.scene);
        this.levelLoader = new LevelLoader(this.scene);

        this.loadLevel();
        this.render();
    }

    render() {
        console.log("Game Manager: render()")

        this.renderer.render(this.scene, this.camera.threeCamera);
        requestAnimationFrame(this.render.bind(this));
    }

    async loadLevel() {
        await this.levelLoader.load();
        this.loadingDisplayer.hideLoading();
    }
}