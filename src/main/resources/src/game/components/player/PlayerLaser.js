import Laser from "../models/Laser";

export default class PlayerLaser extends Laser {
    constructor(startPos, endPos) {
        super(startPos, endPos, 50, 3, 0x21dc5d, 15);
    }
}
