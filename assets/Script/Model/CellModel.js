import { CELL_TYPE, ANITIME, CELL_STATUS, GRID_HEIGHT } from "./ConstValue";
export default class CellModel {
    constructor() {
        this.type = null;                   //类型
        this.status = CELL_STATUS.COMMON;   //状态
        this.x = 1;                         //位置
        this.y = 1;
        this.startX = 1;                    //其实位置
        this.startY = 1;
        this.cmd = [];                      //移动命令
        this.isDeath = false;               //是否销毁
        this.objecCount = Math.floor(Math.random() * 1000);
    }

    init(type) {
        this.type = type;
    }

    isEmpty() {
        return this.type == CELL_TYPE.EMPTY;
    }

    setEmpty() {
        this.type = CELL_TYPE.EMPTY;
    }
    setXY(x, y) {
        this.x = x;
        this.y = y;
    }

    setStartXY(x, y) {
        this.startX = x;
        this.startY = y;
    }

    setStatus(status) {
        this.status = status;
    }

    //移到后返回
    moveToAndBack(pos) {
        var srcPos = cc.v2(this.x, this.y);
        this.cmd.push({
            action: "moveTo",
            keepTime: ANITIME.TOUCH_MOVE,
            playTime: 0,
            pos: pos
        });
        this.cmd.push({
            action: "moveTo",
            keepTime: ANITIME.TOUCH_MOVE,
            playTime: ANITIME.TOUCH_MOVE,
            pos: srcPos
        });
    }

    //移动
    moveTo(pos, playTime) {
        var srcPos = cc.v2(this.x, this.y); 
        this.cmd.push({
            action: "moveTo",
            keepTime: ANITIME.TOUCH_MOVE,
            playTime: playTime,
            pos: pos
        });
        this.x = pos.x;
        this.y = pos.y;
    }

    //销毁格子
    toDie(playTime) {
        this.cmd.push({
            action: "toDie",
            playTime: playTime,
            keepTime: ANITIME.DIE
        });
        this.isDeath = true;
    }

    //抖动
    toShake(playTime) {
        this.cmd.push({
            action: "toShake",
            playTime: playTime,
            keepTime: ANITIME.DIE_SHAKE
        });
    }

    //格子启用
    setVisible(playTime, isVisible) {
        this.cmd.push({
            action: "setVisible",
            playTime: playTime,
            keepTime: 0,
            isVisible: isVisible
        });
    }

    moveToAndDie(pos) {

    }

    //是小鸟
    isBird() {
        return this.type == CELL_TYPE.G;
    }

}
