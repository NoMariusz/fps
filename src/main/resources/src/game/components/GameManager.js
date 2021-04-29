import { Scene, Clock } from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
import Renderer from "./Renderer.js";
import Camera from "./Camera.js";
import Player from "./Player.js";
import LoadingDisplayer from "./LoadingDisplayer.js";
import HelperAxes from "./HelperAxes.js";
import LevelRenderer from "./level/LevelRenderer.js";
import LevelLoader from "./level/LevelLoader.js";
import GUI from "./controls/GUI.js";

export default class Render {
    constructor(container) {
        this.container = container;
        this.init();
    }

    async init() {
        // array subscribed functions to update at render
        this.rendersSubscribers = [];

        this.loadingDisplayer = new LoadingDisplayer(this.container);
        this.loadingDisplayer.showLoading();

        this.scene = new Scene();
        this.renderer = new Renderer(this.scene, this.container);

        this.levelRenderer = new LevelRenderer(
            this.scene,
            this.renderer,
            (fun) => {
                this.subscribeToRender(fun);
            }
        );
        this.levelLoader = new LevelLoader(this.levelRenderer);
        await this.levelLoader.load();
        this.levelSize = this.levelRenderer.size;

        this.clock = new Clock();

        this.player = new Player(
            this.scene,
            this.levelSize,
            () => {
                this.atPlayerLoaded();
            },
            (fun) => {
                this.subscribeToRender(fun);
            }
        );
    }

    render() {
        console.log("Game Manager: render()");

        const delta = this.clock.getDelta();
        this.rendersSubscribers.forEach((callback) => {
            callback(delta);
        });

        this.renderer.render(this.scene, this.camera.threeCamera);
        requestAnimationFrame(this.render.bind(this));
    }

    atPlayerLoaded() {
        this.camera = new Camera(
            this.renderer.threeRenderer,
            this.player,
            this.levelSize
        );
        this.helperAxes = new HelperAxes(this.scene);
        this.gui = new GUI(this.camera, this.levelRenderer);

        // add fps displayer
        this.stats = new Stats();
        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);

        this.render();
        this.loadingDisplayer.hideLoading();
    }

    subscribeToRender(fun) {
        this.rendersSubscribers.push(fun);
    }

    unSubscribeFromRender(fun) {
        const index = this.rendersSubscribers.indexOf(fun);
        if (index > -1) {
            this.rendersSubscribers.splice(index, 1);
        }
    }
}
