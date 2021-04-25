import { Scene } from 'three';
import Renderer from './Renderer.js';
import Camera from './Camera.js';
import Player from "./Player.js";
import LoadingDisplayer from "./LoadingDisplayer.js"
import HelperAxes from "./HelperAxes.js";
import LevelRenderer from "./level/LevelRenderer.js";
import LevelLoader from "./level/LevelLoader.js";
import GUI from './GUI.js';

export default class Render {
    constructor(container) {
        this.container = container;
        this.init();
    }

    async init(){
        this.loadingDisplayer = new LoadingDisplayer(this.container);
        this.loadingDisplayer.showLoading();

        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, this.container);

        this.levelRenderer = new LevelRenderer(this.scene, this.renderer);
        this.levelLoader = new LevelLoader(this.levelRenderer);
        await this.levelLoader.load();
        this.levelSize = this.levelRenderer.size;

        this.player = new Player(this.scene, this.levelSize);
        this.camera = new Camera(this.renderer.threeRenderer, this.player, this.levelSize);
        this.helperAxes = new HelperAxes(this.scene);
        this.gui = new GUI(this.camera, this.levelRenderer);

        this.render();
        this.loadingDisplayer.hideLoading();
    }

    render() {
        console.log("Game Manager: render()")

        this.renderer.render(this.scene, this.camera.threeCamera);
        requestAnimationFrame(this.render.bind(this));
    }
}