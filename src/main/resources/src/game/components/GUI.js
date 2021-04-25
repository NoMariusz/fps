import $ from "../../libs/jquery-3.6.0.min.js";

export default class GUI {
    constructor(camera, levelRenderer) {
        this.camera = camera;
        this.container = $("#guiRoot");
        this.levelRenderer = levelRenderer;
        this.initControls();
    }

    // initialize controls

    initControls() {
        this.initCameraHeight();
        this.initCameraYAngle();
        this.initChangeShaddows();

        this.initCameraXAngle();
        this.initchangeFov();
        this.initAboveView();

        this.initChangeRootDistance();
        this.initchangeLightIntensity();
        this.initBehindPlayerView();
    }

    initCameraHeight() {
        this.makeGuiRangeControl(
            "camera height",
            (e) => {
                this.camera.changeHeight(e.target.value);
            },
            10,
            80,
            this.camera.getPos().y
        );
    }

    initCameraXAngle() {
        this.makeGuiRangeControl(
            "camera X angle",
            (e) => {
                this.camera.changeXAngle(e.target.value);
            },
            -Math.PI / 2,
            Math.PI / 2,
            0
        );
    }

    initChangeRootDistance() {
        this.makeGuiRangeControl(
            "camera distance from player",
            (e) => {
                this.camera.changeRootDistance(parseFloat(e.target.value));
            },
            10,
            50,
            45
        );
    }

    initCameraYAngle() {
        this.makeGuiRangeControl(
            "camera y angle",
            (e) => {
                this.camera.changeYAngle(e.target.value);
            },
            -Math.PI / 2,
            Math.PI / 2,
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
            0.05,
            1.5,
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
