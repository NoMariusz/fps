import "../style.css";
import "./style.css";
import $ from "../libs/jquery-3.6.0.min.js";

const SIZE = 10;
const ACTIONS = ["wall", "enemy", "treasure", "light", "clear"];
const ACTION_TO_COLOR = {
    wall: "darkgreen",
    enemy: "red",
    treasure: "dodgerblue",
    light: "yellow",
    clear: "lightgray",
};

let selectedAction = "clear";
let levelData = [];
let idCounter = 0;

const main = () => {
    preapreBoard();
    connectActionsButtons();
};

// board stuff

const preapreBoard = () => {
    const parent = $("#board");
    for (let row = 0; row < SIZE; row++) {
        for (let column = 0; column < SIZE; column++) {
            makeCell(row, column, parent);
        }
    }
};

const makeCell = (row, column, parent) => {
    const cell = $("<div class='cell'></div>");
    $(cell).css("width", 100 / SIZE + "%");
    $(cell).css("height", 100 / SIZE + "%");

    $(parent).append(cell);
    cell.on("click", (e) => {
        cellClick(row, column, e.target);
    });
    return cell;
};

const cellClick = (row, column, cell) => {
    // clear clicked cell cell
    clearCell(row, column);

    if (selectedAction != "clear") {
        // add new element ot lvl
        const levelElem = makeElementObj(row, column);
        levelData.push(levelElem);
    }
    updateJsonDisplayer();
    // color cell
    $(cell).css("background-color", ACTION_TO_COLOR[selectedAction]);
};

const makeElementObj = (row, column) => {
    idCounter++;
    return {
        id: idCounter,
        y: 0,
        x: row,
        z: column,
        type: selectedAction,
    };
};

const clearCell = (row, column) => {
    const foundIdx = levelData.findIndex((el) => el.x == row && el.z == column);
    if (foundIdx == -1) {
        return false;
    }
    levelData.splice(foundIdx, 1);
    return true;
};

const loadLevelToBoard = () => {
    const parent = $("#board");
    parent.empty();
    for (let row = 0; row < SIZE; row++) {
        for (let column = 0; column < SIZE; column++) {
            const cell = makeCell(row, column, parent);
            const foundCell = levelData.find(
                (el) => el.x == row && el.z == column
            );
            if (foundCell) {
                $(cell).css(
                    "background-color",
                    ACTION_TO_COLOR[foundCell.type]
                );
            }
        }
    }
};

// actions stuff

const connectActionsButtons = () => {
    // load save buttons
    $("#saveLevelBtn").on("click", saveLevel);
    $("#loadLevelBtn").on("click", loadLevel);
    // connect changing element buttons
    ACTIONS.forEach((action) => {
        $(`#${action}`).on("click", () => {
            selectedAction = action;
        });
        $(`#${action}`).css("backgroundColor", ACTION_TO_COLOR[action]);
    });
};

const saveLevel = async () => {
    const reqOptions = {
        method: "POST",
        body: JSON.stringify(makeLevelObj()),
    };
    console.log("Level ob to save: ", makeLevelObj());
    const res = await fetch("/editor/add", reqOptions);
    if (res.ok) {
        alert("Level saved");
    }
};

const loadLevel = async () => {
    const res = await fetch("/editor/load");
    if (!res.ok) {
        return false;
    }
    const data = await res.json();
    console.log("loading level: ", data);
    loadLevelToPage(data.items);
    return true;
};

const makeLevelObj = () => {
    return {
        size: SIZE,
        items: levelData,
    };
};

const loadLevelToPage = (items) => {
    // set level data
    levelData = items;
    updateJsonDisplayer();
    // set id
    const ids = levelData.map((e) => e.id);
    const lastId = Math.max(...ids);
    idCounter = lastId;
    // load level to board
    loadLevelToBoard();
};

// jsonDisplayer

const updateJsonDisplayer = () => {
    $("#jsonData").text(JSON.stringify(levelData, null, 4));
};

main();
