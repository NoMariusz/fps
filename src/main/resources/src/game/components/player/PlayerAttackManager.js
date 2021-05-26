import Config from "../controls/Config";

export default class PlayerAttackManager{
    constructor(player){
        this.root = player
        this.isRootAttacking = false;
    }

    update(){
        if (this.root.getContainer()) {
            // change root status if value changed
            if (Config.isAttacking != this.isRootAttacking){
                this.isRootAttacking = Config.isAttacking;

                if (this.isRootAttacking){
                    this.root.startAttacking()
                } else {
                    this.root.stopAttacking()
                }
            }
        }
    }
}