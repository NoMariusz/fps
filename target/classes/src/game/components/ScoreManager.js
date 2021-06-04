import { sleep } from "Root/utils.js";

export default class ScoreManager {
    constructor(renderer) {
        this.score = 0;
        this.levelRenderer = renderer;
        this.scoreIntevals = { enemy: [], player: {} };
    }

    async render() {
        const scoreNode = document.getElementById("scoreText");
        scoreNode.innerText = `Score: ${this.score}`;
    }

    prepare() {
        const btn = document.getElementById("saveScore");
        btn.onclick = () => {
            this.saveScore();
        };
    }

    // actions changing score

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
        // start interval decrementing score
        const attackInterval = setInterval(() => {
            this.makeAttack(false);
        }, 500);
        this.scoreIntevals.enemy.push(attackInterval);
    }

    stopEnemyAttacking() {
        // stop interval decrementing score
        let attackInterval = this.scoreIntevals.enemy.pop();
        clearInterval(attackInterval);
    }

    startPlayerAttacking(enemy) {
        // check if is started some interval for that enemy
        let correctInterval =
            this.scoreIntevals.player["e-" + enemy.getContainer().uuid];
        if (correctInterval != null) {
            return;
        }
        // start interval incrementing score
        let attackInterval = setInterval(() => {
            this.makeAttack(true);
        }, 500);
        this.scoreIntevals.player["e-" + enemy.getContainer().uuid] =
            attackInterval;
    }

    stopPlayerAttacking(enemy) {
        // stop interval incrementing score for specified enemy
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

    // saving score

    async saveScore() {
        const res = await fetch("/game/save-score", {
            method: "POST",
            body: JSON.stringify(this.score),
        });
        if (res.ok) {
            console.info("Score saved!");
        } else {
            console.error("Can't save score");
        }
    }
}
