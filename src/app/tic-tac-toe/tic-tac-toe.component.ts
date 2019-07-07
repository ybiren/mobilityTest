import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {


  private readonly NUM_SQUARES = 9;
  private isXTurn = true; // X player always starts the game

  private EMPTY_SQUARE = ' ';
  private X_SQUARE = 'X';
  private O_SQUARE = 'O';

  public board: string[] = []; // Game board
  public endGameMessage = '';

  constructor() { }

  ngOnInit() {
    this.initGame();
  }

  // Initialize board
  public initGame() {
    this.board = [];
    this.endGameMessage = '';
    for (let squareInd = 0; squareInd < this.NUM_SQUARES; squareInd++) {
      this.board.push(this.EMPTY_SQUARE);
    }
  }

  // Conquest square by current player and check if there is winner or draw
  public doMove(pos: number) {
    const currPlayer = this.isXTurn ? this.X_SQUARE : this.O_SQUARE;
    if (this.board[pos] === this.EMPTY_SQUARE) {
      this.board[pos] = currPlayer;
      if (this.isWinner()) {
        this.endGameMessage = `${currPlayer} WON!!!!`;
      } else if (this.isDraw()) {
          this.endGameMessage = 'DRAW';
      }
      this.isXTurn = !this.isXTurn;
    }
  }

  private isWinner() {
    return this.isDiagonalWin() || this.isColumnWinner() || this.isRowWinner();
  }

  // There are no empty squares
  private isDraw() {
    return this.board.filter((item) => {
      return item === this.EMPTY_SQUARE;
    }).length === 0;
  }

  // Check diagonals
  private isDiagonalWin() {
    const leftDownDiag = this.allThree(0, 4, 8);
    const rightUpDiag = this.allThree(2, 4, 6);
    return leftDownDiag || rightUpDiag;
  }

  // Check Columns
  private isColumnWinner() {
    const leftCol = this.allThree(0, 3, 6);
    const middleCol = this.allThree(1, 4, 7);
    const rightCol = this.allThree(2, 5, 8);
    return leftCol || (middleCol || rightCol);
  }

  // Check Rows
  private isRowWinner() {
    const topRow = this.allThree(0, 1, 2);
    const middleRow = this.allThree(3, 4, 5);
    const bottomRow = this.allThree(6, 7, 8);
    return topRow || (middleRow || bottomRow);
  }

  private allThree(firstSquare: number, secondSquare: number, thirdSquare: number) {
    const currPlayer = this.isXTurn ? this.X_SQUARE : this.O_SQUARE;
    return this.board[firstSquare] === this.board[secondSquare]  &&
      this.board[firstSquare] === this.board[thirdSquare] &&
      this.board[firstSquare] === currPlayer;
  }
}
