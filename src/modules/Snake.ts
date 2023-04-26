class Snake {
//    表示蛇的元素
    head: HTMLElement;
    //蛇的身体包括蛇头
    bodies: HTMLCollectionOf<HTMLElement>
    //获取蛇的容器
    element: HTMLElement

    constructor() {
        this.element = document.querySelector('.snake') as HTMLElement;
        this.head = document.querySelector('.snake>div') as HTMLElement;
        this.bodies = document.querySelector('.snake')!.getElementsByTagName('div');
    }

//获取蛇头的坐标
//     获取蛇的x坐标
    get X() {
        return this.head.offsetLeft
    }

    // 获取蛇的Y坐标
    get Y() {
        return this.head.offsetTop
    }

    //设置蛇头的坐标
    set X(value) {
        //如果新的值(坐标)和旧值相同不需要去修改
        if (this.X === value)
            return;

        //坐标的合法范围
        if (value < 0 || value > 290) {
            //进入判断说明蛇撞墙了
            throw new Error('哎呦，你干嘛，我死了');
        }
        //蛇不能掉头
        if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
            // console.log('蛇不能掉头')
            if (value > this.X) {
                //如果新值value>旧值X，则说明蛇向右边走，继续向右边走
                value = this.X - 10;
            } else {
                value = this.X + 10;
            }
            //重新判断赋值value
            if (value < 0 || value > 290) {
                //进入判断说明蛇撞墙了
                throw new Error('哎呦，你干嘛，我死了');
            }
        }
        //移动身体
        this.moveBody()
        this.head.style.left = value + 'px';
        //    检查有没有撞到自己
        this.checkHeadBody()
    }

    set Y(value) {
        //如果新的值(坐标)和旧值相同不需要去修改
        if (this.Y === value)
            return;

        //Y坐标的合法范围
        if (value < 0 || value > 290) {
            //进入判断说明蛇撞墙了
            //抛出异常
            throw new Error('哎呦，你干嘛，我死了');

        }


        //蛇掉头的函数
        if (this.bodies[1] && this.bodies[1].offsetTop === value) {
            // console.log('蛇不能掉头')
            if (value > this.Y) {
                //如果新值value>旧值Y，则说明蛇向下边走，现在掉头，则还是继续向下边走
                value = this.Y - 10;
            } else {
                value = this.Y + 10;
            }
            //重新判断赋值value
            if (value < 0 || value > 290) {
                //进入判断说明蛇撞墙了
                throw new Error('哎呦，你干嘛，我死了');
            }
        }


        //移动身体
        this.moveBody()

        this.head.style.top = value + 'px';
    //    检查有没有撞到自己
        this.checkHeadBody()
    }

//    设置一个蛇增加身体的方法
    addBody() {
        //像element添加一个div
        this.element.insertAdjacentHTML('beforeend', "<div></div>")
    }

//        添加一个蛇身体移动的方法
    moveBody() {
        console.log(this.bodies.length);
        //    将后面的身体设置为前面身体的位置
        //    遍历获取所有的身体
        for (let i = this.bodies.length - 1; i > 0; i--) {
            // 获取前面身体的位置
            let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
            let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

            //    将这个值设置到当前身体
            (this.bodies[i] as HTMLElement).style.left = X + 'px';
            (this.bodies[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    //检查蛇的坐标是否撞到自己身体方法
    checkHeadBody() {
        //检查蛇的坐标是否撞到自己身体
        for (let i = 1; i < this.bodies.length; i++) {
            if (this.X === (this.bodies[i]).offsetLeft && this.Y === (this.bodies[i]).offsetTop) {
            //        撞到身体游戏结束
                throw new Error("撞到自己了！！")
            }
        }
    }
}

export default Snake;