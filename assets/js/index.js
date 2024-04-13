let COLS = 10;
let ROWS = 20;
let BLOCK_SIZE = 30;
let COLOR_MAPPING = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "indigo",
  "violet",
  "white",
];
let DEFAULT_COLOR = 8;
let ACtions = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  DOWN: "ArrowDown",
  ROTATE: "ArrowUp",
};
let BRICK_LAYOUT = [
  [
    [
      [1, 8, 8],
      [1, 1, 1],
      [8, 8, 8],
    ],
    [
      [8, 1, 1],
      [8, 1, 8],
      [8, 1, 8],
    ],
    [
      [8, 8, 8],
      [1, 1, 1],
      [8, 8, 1],
    ],
    [
      [8, 1, 8],
      [8, 1, 8],
      [1, 1, 8],
    ],
  ],
  [
    [
      [8, 1, 8],
      [8, 1, 8],
      [8, 1, 1],
    ],
    [
      [8, 8, 8],
      [1, 1, 1],
      [1, 8, 8],
    ],
    [
      [1, 1, 8],
      [8, 1, 8],
      [8, 1, 8],
    ],
    [
      [8, 8, 1],
      [1, 1, 1],
      [8, 8, 8],
    ],
  ],
  [
    [
      [1, 8, 8],
      [1, 1, 8],
      [8, 1, 8],
    ],
    [
      [8, 1, 1],
      [1, 1, 8],
      [8, 8, 8],
    ],
    [
      [8, 1, 8],
      [8, 1, 1],
      [8, 8, 1],
    ],
    [
      [8, 8, 8],
      [8, 1, 1],
      [1, 1, 8],
    ],
  ],
  [
    [
      [8, 1, 8],
      [1, 1, 8],
      [1, 8, 8],
    ],
    [
      [1, 1, 8],
      [8, 1, 1],
      [8, 8, 8],
    ],
    [
      [8, 8, 1],
      [8, 1, 1],
      [8, 1, 8],
    ],
    [
      [8, 8, 8],
      [1, 1, 8],
      [8, 1, 1],
    ],
  ],
  [
    [
      [8, 8, 8, 8],
      [1, 1, 1, 1],
      [8, 8, 8, 8],
      [8, 8, 8, 8],
    ],
    [
      [8, 8, 1, 8],
      [8, 8, 1, 8],
      [8, 8, 1, 8],
      [8, 8, 1, 8],
    ],
    [
      [8, 8, 8, 8],
      [8, 8, 8, 8],
      [1, 1, 1, 1],
      [8, 8, 8, 8],
    ],
    [
      [8, 1, 8, 8],
      [8, 1, 8, 8],
      [8, 1, 8, 8],
      [8, 1, 8, 8],
    ],
  ],
  [
    [
      [8, 8, 8, 8],
      [8, 1, 1, 8],
      [8, 1, 1, 8],
      [8, 8, 8, 8],
    ],
    [
      [8, 8, 8, 8],
      [8, 1, 1, 8],
      [8, 1, 1, 8],
      [8, 8, 8, 8],
    ],
    [
      [8, 8, 8, 8],
      [8, 1, 1, 8],
      [8, 1, 1, 8],
      [8, 8, 8, 8],
    ],
    [
      [8, 8, 8, 8],
      [8, 1, 1, 8],
      [8, 1, 1, 8],
      [8, 8, 8, 8],
    ],
  ],
  [
    [
      [8, 1, 8],
      [1, 1, 1],
      [8, 8, 8],
    ],
    [
      [8, 1, 8],
      [8, 1, 1],
      [8, 1, 8],
    ],
    [
      [8, 8, 8],
      [1, 1, 1],
      [8, 1, 8],
    ],
    [
      [8, 1, 8],
      [1, 1, 8],
      [8, 1, 8],
    ],
  ],
];
let canvas = document.getElementById("Root");
let ctx = canvas.getContext("2d");

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.Generate();
    this.score = 0;
    this.GameOver = false
    this.Playing = false
  }
  Reset(){
    this.score = 0
    this.grid = this.Generate()
    this.GameOver = false
    this.DrawBoard()
  }
  Generate() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(DEFAULT_COLOR));
  }
  DrawCell(xAsix, yAsix, ColorID) {
    this.ctx.fillStyle = COLOR_MAPPING[ColorID] || DEFAULT_COLOR;
    this.ctx.fillRect(
      xAsix * BLOCK_SIZE,
      yAsix * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
    this.ctx.strokeRect(
      xAsix * BLOCK_SIZE,
      yAsix * BLOCK_SIZE,
      BLOCK_SIZE,
      BLOCK_SIZE
    );
  }
  DrawBoard() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[0].length; col++) {
        this.DrawCell(col, row, this.grid[row][col]);
      }
    }
  }
  handCompleteRow(){
    let latesGrid = board.grid.filter((row) => {
      return row.some(col => col === DEFAULT_COLOR)
    })
    let newScoce = ROWS - latesGrid.length
    let newRow = Array.from({ length: newScoce}, () => Array(COLS).fill(DEFAULT_COLOR));
    if(newScoce){
      board.grid = [...newRow,...latesGrid]
      this.handlScore(newScoce * 10)
    }
  }
  handlScore(newScoce){
    this.score += newScoce
    document.querySelector('.point').innerHTML = this.score 
  }
  HandlGameOver() {
    this.GameOver = true
    alert("Game Over")
    this.Playing = false
  }
}
class Brick {
  constructor(id) {
    this.id = id;
    this.layout = BRICK_LAYOUT[id];
    this.activeIndex = 0;
    this.ColPos = 3;
    this.RowPos = -1;
  }

  draw() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== DEFAULT_COLOR) {
          board.DrawCell(col + this.ColPos, row + this.RowPos, this.id);
        }
      }
    }
  }
  CLear() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== DEFAULT_COLOR) {
          board.DrawCell(col + this.ColPos, row + this.RowPos, DEFAULT_COLOR);
        }
      }
    }
  }
  MoveLeft() {
    if (
      !this.checkCollide(
        this.RowPos,
        this.ColPos - 1,
        this.layout[this.activeIndex]
      )
    ){
      this.CLear();
      this.ColPos--;
      this.draw();
    }
  }
  MoveRight() {
    if (
      !this.checkCollide(
        this.RowPos,
        this.ColPos + 1,
        this.layout[this.activeIndex])
      ){
      this.CLear();
      this.ColPos++;
      this.draw();
      }
  }
  MoveDown() {
    if (
      !this.checkCollide(
        this.RowPos + 1,
        this.ColPos,
        this.layout[this.activeIndex]) 
    ){
      this.CLear();
      this.RowPos++;
      this.draw();
      return;
    }
    this.HandlLanded()
    if(!board.GameOver){
      GenerateNewBrick()
    }
  }
  Rotare() {
    if (
      !this.checkCollide(
        this.RowPos,
        this.ColPos,
        this.layout[(this.activeIndex + 1) % 4]) 
    ) {
      this.CLear();
      this.activeIndex = (this.activeIndex + 1) % 4;
      this.draw();
    }
  }
  checkCollide(NextRow, NextCol, nextLayout) {
    // if(NextCol < 0 ) return true
    for (let row = 0; row < nextLayout.length; row++) {
      for (let col = 0; col < nextLayout[row].length; col++) {
        if (nextLayout[row][col] !== DEFAULT_COLOR && NextRow >= 0) {
          if (
            col + NextCol < 0 ||
            col + NextCol >= COLS ||
            row + NextRow >= ROWS ||
            board.grid[row + NextRow][col + NextCol] !== DEFAULT_COLOR
          )
            return true;
        }
      }
    }
    return false;
  }
  HandlLanded() {
    if(this.RowPos <= 0 ){
      board.HandlGameOver();
      return;
    }
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== DEFAULT_COLOR) {
          board.grid[row + this.RowPos][col + this.ColPos] = this.id;
        }
      }
    }
    board.handCompleteRow()
    board.DrawBoard();
  }
}
function GenerateNewBrick() {
  brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length);
}
let board = new Board(ctx);
board.DrawBoard();

document.addEventListener("keydown", function (e) {
  if(!board.GameOver){
    switch (e.code) {
      case "ArrowLeft":
        brick.MoveLeft();
        break;
      case "ArrowRight":
        brick.MoveRight();
        break;
      case "ArrowDown":
        brick.MoveDown();
        break;
      case "ArrowUp":
        brick.Rotare();
        break;
      default:
        break;
    }
  }   
});
document.getElementById('Play').addEventListener('click',()=>{
  board.Playing = true
  board.Reset()
  GenerateNewBrick();
  setInterval(() =>{
    if(!board.GameOver){
      brick.MoveDown()
    }else{
      clearInterval(refesh)
    }
  },1000)
})
// brick.draw();
