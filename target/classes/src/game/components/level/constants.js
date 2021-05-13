import Wall from "./items/Wall.js";
import Light from "./items/light/Light.js";
import Treasure from "./items/Treasure.js";
import Enemy from "./items/Enemy.js";

export const CELL_SIZE = 100;
export const ITEMS_MAP = {
    wall: Wall,
    light: Light,
    treasure: Treasure,
    enemy: Enemy,
};
