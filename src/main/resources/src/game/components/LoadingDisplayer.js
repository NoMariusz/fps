import $ from "../../libs/jquery-3.6.0.min.js";

const LOADING_BLOCK = $("#loading")

export default class LoadingDisplayer{
    constructor(mainBlock){
        this.mainBlock = mainBlock
    }

    showLoading(){
        $(this.mainBlock).addClass("hidden");
        LOADING_BLOCK.removeClass("hidden");
    }

    hideLoading(){
        $(this.mainBlock).removeClass("hidden");
        LOADING_BLOCK.addClass("hidden");
    }

}