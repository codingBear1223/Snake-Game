var snake = new Snake();
snake.head = null;
snake.tail = null;
var DIRECTIONENUM = {
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
};
snake.init = function (ground) {
  //创建蛇身、蛇头，渲染出来
  var snakeHead = SquareFactory.create("SnakeHead", 3, 1, "red");
  var snakeBody1 = SquareFactory.create("SnakeBody", 2, 1, "blue");
  var snakeBody2 = SquareFactory.create("SnakeBody", 1, 1, "blue");

  //蛇头与蛇身的关联关系用链表表示
  snakeHead.next = snakeBody1;
  snakeHead.last = null;
  snakeBody1.next = snakeBody2;
  snakeBody1.last = snakeHead;
  snakeBody2.next = null;
  snakeBody2.last = snakeBody1;
  this.head = snakeHead;
  this.tail = snakeBody2;
  var iterate = snakeHead;
  while (iterate) {
    ground.remove(iterate.x, iterate.y);
    ground.append(iterate);
    iterate = iterate.next;
  }
  snake.direction = DIRECTIONENUM.RIGHT;
};
// snake.init(ground);

//引入策略处理
snake.strategies = {
  MOVE: function (snake, square, ground) {
    //实现 move 第一步：头变成第一截身子
    var newSnakeBody = SquareFactory.create(
      "SnakeBody",
      snake.head.x,
      snake.head.y,
      "blue"
    );
    newSnakeBody.next = snake.head.next;
    newSnakeBody.next.last = newSnakeBody;
    newSnakeBody.last = snake.head.last;
    ground.remove(snake.head.x, snake.head.y);
    ground.append(newSnakeBody);

    //实现 move 第二步：新建蛇头
    //蛇头的构造函数是单例模式，不能直接修改蛇头实例的坐标，要在子类工厂手动修改
    var newSnakeHead = SquareFactory.create(
      "SnakeHead",
      square.x,
      square.y,
      "red"
    );
    newSnakeHead.next = newSnakeBody;
    newSnakeHead.last = null;
    newSnakeBody.last = newSnakeHead;
    ground.remove(newSnakeHead.x, newSnakeHead.y);
    ground.append(newSnakeHead);
    snake.head = newSnakeHead;

    //实现 move 第三步：删除蛇尾
    var floor = SquareFactory.create(
      "Floor",
      snake.tail.x,
      snake.tail.y,
      "orange"
    );
    ground.remove(snake.tail.x, snake.tail.y);
    ground.append(floor);
    snake.tail = snake.tail.last;
  },
  EAT: function () {},
  DIE: function () {
    console.log("you die");
  },
};

//对蛇的运动做预判
snake.move = function (ground) {
  var square =
    ground.SquareTable[this.head.y + this.direction.y][
      [this.head.x + this.direction.x]
    ];
  if (typeof square.touch == "function") {
    this.strategies[square.touch()](this, square, ground);
  }
};
