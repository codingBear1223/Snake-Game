var ground = new Ground(
  BASE_X_POINT,
  BASE_Y_POINT,
  XLEN * SQUAREWIDTH,
  YLEN * SQUAREWIDTH
);

ground.init = function () {
  this.viewCount.style.position = "absolute";
  this.viewCount.style.backgroundColor = "#0ff";
  this.viewCount.style.left = this.x + "px";
  this.viewCount.style.top = this.y + "px";
  this.viewCount.style.width = this.width + "px";
  this.viewCount.style.height = this.height + "px";
  document.body.appendChild(this.viewCount);

  //存储管理广场中所有方块对象
  this.SquareTable = [];
  for (let i = 0; i < YLEN; i++) {
    this.SquareTable[i] = new Array(XLEN);
    for (let j = 0; j < XLEN; j++) {
      if (i === 0 || j === 0 || j === XLEN - 1 || i === YLEN - 1) {
        //创建石头
        var newSquare = SquareFactory.create("Stone", j, i, "black");
      } else {
        //创建地板
        var newSquare = SquareFactory.create("Floor", j, i, "orange");
      }
      this.SquareTable[i][j] = newSquare;
      this.viewCount.appendChild(newSquare.viewCount);
    }
  }
};
// ground.init();

//拆方法
ground.remove = function (x, y) {
  //根据坐标找到需要定位的方块
  const square = this.SquareTable[y][x];
  //从视觉上抹去
  this.viewCount.removeChild(square.viewCount);
  //从数据结构上抹去
  this.SquareTable[y][x] = null;
};
//增加方法
ground.append = function (square) {
  //从视觉上增加新的元素
  this.viewCount.appendChild(square.viewCount);
  //从数据结构上增加新的元素
  this.SquareTable[square.y][square.x] = square;
};
