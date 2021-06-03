import { sleep } from "Root/utils.js";

export default class LevelLoader {
    constructor(renderer) {
        this.score = 0;
        this.levelRenderer = renderer;
        this.scoreIntevals = { enemy: [], player: {} };
    }

    async render() {
        const scoreNode = document.getElementById("scoreText");
        scoreNode.innerText = `Score: ${this.score}`;
    }

    onPlayerHit() {
        this.score--;
        this.render();
    }

    onEnemyHit() {
        this.score++;
        this.render();
    }

    // enemy attacking detection

    startEnemyAttacking() {
        const attackInterval = setInterval(() => {
            this.makeAttack(false);
        }, 500);
        this.scoreIntevals.enemy.push(attackInterval);
    }

    stopEnemyAttacking() {
        let attackInterval = this.scoreIntevals.enemy.pop();
        clearInterval(attackInterval);
    }

    startPlayerAttacking(enemy) {
        let correctInterval =
            this.scoreIntevals.player["e-" + enemy.getContainer().uuid];
        // check if is started some interval
        if (correctInterval != null) {
            return;
        }
        let attackInterval = setInterval(() => {
            this.makeAttack(true);
        }, 500);
        this.scoreIntevals.player["e-" + enemy.getContainer().uuid] = attackInterval;
        console.log(
            "Start player attacking, inters",
            JSON.stringify(this.scoreIntevals.player)
        );
    }

    stopPlayerAttacking(enemy) {
        let attackInterval =
            this.scoreIntevals.player["e-" + enemy.getContainer().uuid];
        clearInterval(attackInterval);
        this.scoreIntevals.player["e-" + enemy.getContainer().uuid] = null;
    }

    makeAttack(isPlayerAttack) {
        if (isPlayerAttack) {
            this.onEnemyHit();
        } else {
            this.onPlayerHit();
        }
    }
}
