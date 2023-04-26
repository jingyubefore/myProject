//定义表示记分牌的类
class ScorePanel {
    //score和level记录分数和等级
    score = 0;
    level = 1;
    //分数和等级的元素
    scoreEle: HTMLElement;
    levelEle: HTMLElement;
    //设置变量限制等级
    maxLevel: number;
    //设置变量表示多少分升级
    upScore: number;

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.scoreEle = document.querySelector('.score')as HTMLElement;
        this.levelEle = document.querySelector('.level')as HTMLElement;
        this.maxLevel = maxLevel
        this.upScore = upScore
    }

    //设置加分的方法
    addScore() {
        //是分数自增
        this.scoreEle.innerHTML = ++this.score + '';
        //    判断分数是多少
        if (this.score % this.upScore === 0) this.levelUp()
    }

//    提升等级的方法
    levelUp() {
        this.level < this.maxLevel ? this.levelEle.innerHTML = ++this.level + '' : alert('贝贝，已经满级了捏！！！');
    }
}

export default ScorePanel;