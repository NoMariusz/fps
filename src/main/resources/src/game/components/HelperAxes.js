import { AxesHelper } from 'three';

export default class HelperAxes{
    constructor(scene){
        this.scene = scene;
        this.axes = new AxesHelper(1000);
        this.scene.add(this.axes);
    }
}