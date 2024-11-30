function SquareFactory() {}

SquareFactory.create = function (type, x, y, color) {
  if (typeof SquareFactory.prototype[type] == undefined) {
    throw "no this type";
  }
  if (
    SquareFactory.prototype[type].prototype.__proto__ !==
    SquareFactory.prototype
  ) {
    SquareFactory.prototype[type].prototype = new SquareFactory();
  }
  var newSquare = new SquareFactory.prototype[type](x, y, color);
  return newSquare;
};
SquareFactory.prototype.init = function (square, color, message) {
  square.viewCount.style.position = "absolute";
  square.viewCount.style.backgroundColor = color;
  square.viewCount.style.left = square.x * SQUAREWIDTH + "px";
  square.viewCount.style.top = square.y * SQUAREWIDTH + "px";
  square.viewCount.style.width = square.width + "px";
  square.viewCount.style.height = square.height + "px";
  square.touch = function () {
    return message;
  };
};

SquareFactory.prototype.Floor = function (x, y, color) {
  var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(floor, color, STRATEGYENUM.move);
  return floor;
};

SquareFactory.prototype.Stone = function (x, y, color) {
  var stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(stone, color, STRATEGYENUM.die);
  return stone;
};

SquareFactory.prototype.Food = function (x, y, color) {
  var food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(food, color, STRATEGYENUM.eat);
  return food;
};

SquareFactory.prototype.SnakeHead = function (x, y, color) {
  var head = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(head, color, STRATEGYENUM.die);
  head.update(x, y);

  return head;
};

SquareFactory.prototype.SnakeBody = function (x, y, color) {
  var body = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
  this.init(body, color, STRATEGYENUM.die);

  return body;
};
