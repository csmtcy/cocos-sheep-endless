cc.Class({
    extends: cc.Component,

    properties: {
        maxY: 0, // 620
        groundY: 0, // -352, this is the default position when sheep is running 
        gravity: 0, // 980
        initJumpSpeed: 0, // 600
    },

    changeState(state) {
        this.state = state;
        this.anim.stop();
        this.anim.play(state);
    },

    jump() {
        this.changeState("Jump");
        this.currentSpeed = this.initJumpSpeed;
    },

    run() { // animation callback method
        this.changeState("Run");
    },

    stopRun() {
        this.changeState("Dead");
        cc.eventManager.pauseTarget(this.node);
    },

    landed() {
        this.changeState("Landed");
    },

    onCollisionEnter(other, self) {
        var group = cc.game.groupList[other.node.groupIndex];
        if (group == 'pipe') {
            Global.gameManager.gameOver();
        } else if (group = 'score') {
            Global.gameManager.gainScore();
        }
    },

    onLoad() {
        Global.sheep = this;
        this.currentSpeed = 0;
        this.anim = this.node.getComponent(cc.Animation);
    },

    startRun () {
        this.changeState('Run');
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                this.jump();
                return true;
            }.bind(this)
        }, this.node);
    },

    update (dt) {
        switch (this.state) {
            case 'Jump': 
                if (this.currentSpeed < 0) {
                    this.changeState('Drop');
                }
                break;
            case 'Drop':
                if (this.node.y < this.groundY) {
                    this.node.y = this.groundY;
                    // this.changeState('Run');
                    this.landed();
                }
                break;
            case 'Dead':
                return;
        }
        if (this.node.y > this.maxY) { // when the sheep reach the top of the screen the fallback
            this.node.y = this.maxY;
            this.changeState('Drop');
        }
        var flying = this.state === 'Jump' || this.node.y > this.groundY;
        if (flying) {
            this.currentSpeed -= dt * this.gravity;
            this.node.y += dt * this.currentSpeed;
        }
    },

});
