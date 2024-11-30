//场景：广场 宽度系数 高度系数
var XLEN = 30;
var YLEN = 30;

//方块 宽高
var SQUAREWIDTH = 20;

//广场位置
var BASE_X_POINT = 200;
var BASE_Y_POINT = 100;

//定义基类
function Square(x, y, width, height, viewCount) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.viewCount = viewCount || document.createElement("div");
}
Square.prototype.touch = function () {
  console.log("touch");
};
Square.prototype.update = function (x, y) {
  this.x = x;
  this.y = y;
  this.viewCount.style.left = x * SQUAREWIDTH + "px";
  this.viewCount.style.top = y * SQUAREWIDTH + "px";
};

//定义子类

//地板
var Floor = tool.extends(Square);
//围墙
var Stone = tool.extends(Square);
//食物
var Food = tool.single(Square);
//蛇头
var SnakeHead = tool.single(Square);
//蛇身
var SnakeBody = tool.extends(Square);

var Snake = tool.single();

var Ground = tool.single(Square);

var Game = tool.single();

function Food() {}
tool.inherit(Food, Square);

var STRATEGYENUM = {
  move: "MOVE",
  eat: "EAT",
  die: "DIE",
};
