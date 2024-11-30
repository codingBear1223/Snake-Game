var game = new Game();

game.score = 0;
game.timer = null;
game.speed = 400;

game.init = function () {
  ground.init();
  snake.init(ground);
  //绑定事件，监控
  document.onkeydown = function (e) {
    //e.which 37=>left 38=>top 39=>right 4=>down
    if (e.key === 37 && snake.direction !== DIRECTIONENUM.RIGHT) {
      snake.direction = DIRECTIONENUM.LEFT;
    } else if (e.key === 38 && snake.direction !== DIRECTIONENUM.DOWN) {
      snake.direction = DIRECTIONENUM.UP;
    } else if (e.key === 39 && snake.direction !== DIRECTIONENUM.LEFT) {
      snake.direction = DIRECTIONENUM.RIGHT;
    } else if (e.key === 40 && snake.direction !== DIRECTIONENUM.UP) {
      snake.direction = DIRECTIONENUM.DOWN;
    }
  };
};
