import '../style.css';
import './style.css';

import $ from "../libs/jquery-3.6.0.min.js";

import GameManager from "./components/GameManager.js";

const main = () => {
    new GameManager($("#root")[0]);
}

main();
