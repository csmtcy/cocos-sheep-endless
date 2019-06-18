// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0, 
        resetX: 0
    },

    onLoad () {
        Global.scroller = this;
        this.isScroll = false;
    },

    startScroll() {
        this.isScroll = true;
    },

    stopScroll() {
        this.isScroll = false;
    },

    update (dt) {
        if (this.isScroll) {
            var x = this.node.x;
            x += this.speed * dt;
            if (x <= this.resetX) {
                x -= this.resetX;
            }
            this.node.x = x;
        }
    },
});
