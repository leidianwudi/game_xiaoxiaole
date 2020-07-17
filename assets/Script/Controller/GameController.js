import GameModel from "../Model/GameModel";
import { CELL_TYPE, CELL_BASENUM, CELL_STATUS, GRID_WIDTH, GRID_HEIGHT, ANITIME } from "../Model/ConstValue";

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
        },

        //进度条
        bar:{
            default: null,
            type: cc.ProgressBar
        },

        //进度条文字
        labTip:{
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.gameModel = new GameModel();
        this.gameModel.init(4);
        var gridScript = this.grid.getComponent("GridView");
        gridScript.setController(this);
        gridScript.initWithCellModels(this.gameModel.getCells());

        this.bar.progress = 0;
        this.labTip.string = "0/100";
    },

    selectCell: function(pos){
        let arrCell = this.gameModel.selectCell(pos);

        //this.scheduleOnce(this.endGame.bind(this), 1);
        this.tryEndGame();
        this.updatePress();//更新进度条
        
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

    //更新进度条
    updatePress()
    {
        let arr = this.gameModel.getLiveCells();
        let sum = GRID_WIDTH * GRID_HEIGHT;//格子总数
        let num = sum - arr.length;        //已经消除的格子
        let per = parseInt((num * 100) / sum);       //百分之多少 90%
        this.bar.progress = (per / 100.0);   //进度条长度
        this.labTip.string = per.toString() + "/100";
    },

    //重新开始游戏
    restartGame()
    {
        this.bar.progress = 0;
        this.labTip.string = "0/100";
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
