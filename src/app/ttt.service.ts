import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TttService {

  private readonly NUM_SQUARES = 9;
  private readonly EMPTY_SQUARE = ' ';
  private readonly X_SQUARE = 'X';
  private readonly O_SQUARE = 'O';
  private isBoardDisabled = false;
  private endGameMessage = '';
  private board: string[] = []; // Game board
  private isXTurn: boolean;
  

  constructor() { }

  public InitGame(): string[] {

    this.board = [];
    for (let squareInd = 0; squareInd < this.NUM_SQUARES; squareInd++) {
      this.board.push(this.EMPTY_SQUARE);
    }
    this.endGameMessage = '';
    this.isXTurn = true;
    this.isBoardDisabled = false;
    return this.board;
  }    

  public DoMove(pos: number): any {

    const currPlayer = this.isXTurn ? this.X_SQUARE : this.O_SQUARE;
    if (this.board[pos] === this.EMPTY_SQUARE && !this.isBoardDisabled) {
      this.board[pos] = currPlayer;
      if (this.isWinner()) {
        this.isBoardDisabled = true;
        this.endGameMessage = `${currPlayer} WON!!!!`;
        //setTimeout(() => this.endGameMessage = `${currPlayer} WON!!!!`, 500);
      } else if (this.isDraw()) {
        this.isBoardDisabled = true;
        this.endGameMessage = 'DRAW';
        //setTimeout(() => this.endGameMessage = 'DRAW', 500);
      }
      this.isXTurn = !this.isXTurn;
    }
    return {'board': this.board ,'isBoardDisabled': this.isBoardDisabled , 'endGameMessage': this.endGameMessage};
  }

  // Check rows,columns,diagonals
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

