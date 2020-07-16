import GameModel from "../Model/GameModel";

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        grid:{
            default: null,
            type: cc.Node
        },

        //结束节点
        layFinish:{
            default: null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.gameModel = new GameModel();
        this.gameModel.init(4);
        var gridScript = this.grid.getComponent("GridView");
        gridScript.setController(this);
        gridScript.initWithCellModels(this.gameModel.getCells());
    },

    selectCell: function(pos){
        let arrCell = this.gameModel.selectCell(pos);

        //this.scheduleOnce(this.endGame.bind(this), 1);
        this.tryEndGame();
        
        return arrCell;
    },
    cleanCmd: function(){
        this.gameModel.cleanCmd();
    },
    //尝试提前结束游戏
    tryEndGame()
    {
        if (this.gameModel.isGameEnd())
        {
            this.layFinish.active = true;//节点可见
        }
    },

    //重新开始游戏
    restartGame()
    {
        this.layFinish.active = false;//节点不可见
        //this.gameModel = null;
        this.gameModel = new GameModel();
        this.gameModel.init(4);
        var gridScript = this.grid.getComponent("GridView");
        gridScript.setController(this);
        gridScript.initWithCellModels(this.gameModel.getCells());
    },

    // //返回手动提前结束游戏，需要数据
    // getEndGameArr()
    // {
    //     this.layFinish.active = false;//节点不可见
    //     this.selectCell(cc.v2(1,1));        
    //     return this.gameModel.getEndGameArr();//强制结束游戏
    // }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // }, 
});
