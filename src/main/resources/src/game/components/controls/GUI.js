import $ from "../../../libs/jquery-3.6.0.min.js";

export default class GUI {
    constructor(camera, levelRenderer, player) {
        this.camera = camera;
        this.container = $("#guiRoot");
        this.levelRenderer = levelRenderer;
        this.player = player;
        this.initControls();
    }

    // initialize controls

    initControls() {
        this.container = $("#row1");
        this.initCameraHeight();
        this.initCameraYAngle();
        this.initCameraXAngle();
        this.initChangeRootDistance();
        this.initchangeFov();
        
        this.initchangeLightIntensity();

        this.container = $("#row2");
        this.initFireHeight();
        this.initFireWidthX();
        this.initFireWidthZ();
        this.initChangeShaddows();

        this.initBehindPlayerView();
        this.initAboveView();

        this.container = $("#row3");
        this.initLaserDist();
        this.initLaserSize();
    }

    initCameraHeight() {
        this.makeGuiRangeControl(
            "camera height",
            (e) => {
                this.camera.changeHeight(e.target.value);
            },
            0,
            80,
            50
        );
    }

    initCameraXAngle() {
        this.makeGuiRangeControl(
            "camera X angle",
            (e) => {
                this.camera.changeXAngle(e.target.value);
            },
            -100,
            100,
            0
        );
    }

    initChangeRootDistance() {
        this.makeGuiRangeControl(
            "camera distance from player",
            (e) => {
                this.camera.changeRootDistance(parseFloat(e.target.value));
            },
            -400,
            200,
            -200
        );
    }

    initCameraYAngle() {
        this.makeGuiRangeControl(
            "camera y angle",
            (e) => {
                this.camera.changeYAngle(e.target.value);
            },
            -100,
            100,
            0
        );
    }

    initchangeFov() {
        this.makeGuiRangeControl(
            "camera fov",
            (e) => {
                this.camera.changeFov(e.target.value);
            },
            30,
            90,
            50
        );
    }

    initchangeLightIntensity() {
        this.makeGuiRangeControl(
            "lights intensity",
            (e) => {
                this.levelRenderer.changeLightsIntensity(e.target.value);
            },
            0.1,
            2.5,
            0.2
        );
    }

    initChangeShaddows() {
        this.makeGuiCheckControl("shaddows", (e) => {
            this.levelRenderer.changeShaddows(e.target.checked);
        });
    }

    initAboveView() {
        this.makeGuiCheckControl("view from above", (e) => {
            if (e.target.checked) {
                this.camera.aboveView();
                this.levelRenderer.hideCeilling();
            } else {
                this.camera.normalView();
                this.levelRenderer.showCeilling();
            }
        });
    }

    initBehindPlayerView() {
        this.makeGuiCheckControl("view behind player", (e) => {
            if (e.target.checked) {
                this.camera.behindPlayerView();
            } else {
                this.camera.middleView();
            }
        });
    }

    initFireHeight(){
        this.makeGuiRangeControl(
            "fire size",
            (e) => {
                this.levelRenderer.changeFireSize(e.target.value);
            },
            0.7,
            1.5,
            1
        );
    }

    initFireWidthX(){
        this.makeGuiRangeControl(
            "fire width x",
            (e) => {
                this.levelRenderer.changeFireWidthX(e.target.value);
            },
            1,
            50,
            10
        );
    }

    initFireWidthZ(){
        this.makeGuiRangeControl(
            "fire width z",
            (e) => {
                this.levelRenderer.changeFireWidthZ(e.target.value);
            },
            1,
            50,
            10
        );
    }

    initLaserDist() {
        this.makeGuiRangeControl(
            "laser distortion",
            (e) => {
                this.player.laser.changeDispersion(e.target.value);
            },
            0,
            5,
            3
        );
    }

    initLaserSize() {
        this.makeGuiRangeControl(
            "laser size",
            (e) => {
                this.player.laser.changeSize(e.target.value);
            },
            1,
            50,
            15
        );
    }

    // helpers making gui

    makeGiuBlock() {
        let block = $("<div class='control'></div>");
        this.container.append(block);
        return block;
    }

    makeGuiRangeControl(text, event, min, max, startVal) {
        let block = this.makeGiuBlock();

        let range = $(
            `<input type='range' min="${min}" max="${max}" value="${startVal}" step="0.05"/>`
        );
        block.append(range);
        range.on("input", event);

        let textBlock = $("<p></p>");
        textBlock.text(text);
        block.append(textBlock);
    }

    makeGuiCheckControl(text, event) {
        let block = this.makeGiuBlock();

        let range = $(`<input type='checkbox'/>`);
        block.append(range);
        range.on("change", event);

        let textBlock = $("<p></p>");
        textBlock.text(text);
        block.append(textBlock);
    }
}
