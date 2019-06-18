cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,
        scoreLabelMain: cc.Label,
        gameOverNode: cc.Node
    },

    onLoad() {
        Global.gameManager = this;
        cc.director.getCollisionManager().enabled = true; // enable the collision
        this.gameOverNode.active = false;
        this.score = 0;
        this.scoreLabel.string = this.score;
    },

    start() {
        Global.pipeManager.startSpawn();
        Global.sheep.startRun();
        Global.scroller.startScroll();
    },

    restart() {
        cc.director.loadScene('Game');
    },

    gainScore() {
        this.score++;
        this.scoreLabel.string = this.score;
    },

    gameOver() {
        Global.pipeManager.stopSpawn();
        Global.sheep.stopRun();
        Global.scroller.stopScroll();
        
        this.gameOverNode.active = true;
        // update score
        this.scoreLabelMain.string = this.score;
    },

});
