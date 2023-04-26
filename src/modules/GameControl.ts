import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器：《控制所有类》
class GameControl {
//定义三个属性
//    蛇
    snake: Snake;
    //记分牌
    scorePanel: ScorePanel;
    //食物
    food: Food;

    timer: any;

    //创建蛇的移动方向（按键的方向）
    direction: string = '';
    //创建游戏结束的变量
    isLive = true;

    constructor() {
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 5);
        this.snake = new Snake();
        this.init()
    }

    // 游戏的初始化方法
    init() {
        //绑定键盘按下的事件
        document.addEventListener('keydown', e => this.keydownHandler(e));
        // this.keydownHandler.bind(this)//this指向问题
        //    调用run方法
        this.run()
    }

//    创建键盘按下的响应函数
    /*
        ArrowDown
        ArrowLeft
        ArrowUp
        ArrowRight
     */
    keydownHandler(event: KeyboardEvent) {
        // console.log(this);
        //修改direction属性
        //需要检查event.key键是否合法（是否为方向键）？？？？？
        this.direction = event.key
        // console.log(event.key);//返回的字符串

    }

//    创建一个蛇移动的方法
    run() {
        //    根据this.direction来使蛇的位置改变
        //    获取蛇的现在坐标
        let x = this.snake.X
        let y = this.snake.Y
        //    根据按键方向修改left和top值
        switch (this.direction) {
            case "ArrowUp":
            case "Up":
                //向上移动 top减少
                y -= 10;
                break;
            case "ArrowDown":
            case "Down":
                //向下移动 top增加
                y += 10;
                break;
            case "ArrowLeft":
            case "Left":
                //向左边移动 left 减少
                x -= 10;
                break;
            case "ArrowRight":
            case "Right":
                // 向右边移动 left增加
                x += 10;
                break;
        }
//检查蛇是否吃到食物
        this.checkEat(x, y);

//        捕获异常
        try {
            //    修改蛇的X和Y的位置
            this.snake.X = x;
            this.snake.Y = y;
        } catch (e: any) {
            // 游戏结束的提示
            alert(e.message + ',' + "GAME OVER")
            //将isLive设置为false
            this.isLive = false;
            return;
        }
        // 开启一个定时调用
        clearTimeout(this.timer);
        this.timer = this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    //        检查蛇是否吃到食物方法
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            // 食物的位置进行重置
            this.food.change()
            //    分数增加
            this.scorePanel.addScore()
            //    蛇增加一节
            this.snake.addBody()
        }
    }
}

export default GameControl