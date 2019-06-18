cc.Class({
    extends: cc.Component,

    properties: {
        pipePrefab: cc.Prefab,
        pipeLayer: cc.Node,
        initPipeX: 0,
        spawnInterval: 0
    },


    onLoad () {
        Global.pipeManager = this;
        this.pipeGroupPool = new cc.NodePool();
    },

    startSpawn () {
        this.move = true;
        this.spawnPipe();
        this.schedule(this.spawnPipe, this.spawnInterval); // spawnInterval in seconds
    },

    stopSpawn() {
        this.move = false;
        this.stop();
    },

    spawnPipe() {
        let pipeGroup = null;

        if (this.pipeGroupPool.size() > 0) {
            pipeGroup = this.pipeGroupPool.get();
        } else {
            pipeGroup = cc.instantiate(this.pipePrefab);
        }

        this.pipeLayer.addChild(pipeGroup);
        pipeGroup.active = true;
        pipeGroup.x = this.initPipeX;
    },
   
    destroyPipe(pipe) {
        pipe.active = false;
        this.pipeGroupPool.put(pipe);
    },

    stop() {
        this.unschedule(this.spawnPipe);
    }

});
