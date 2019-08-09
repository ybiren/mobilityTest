import { Component, OnInit } from '@angular/core';
import { Howl } from 'howler';
import { TttService } from '../ttt.service';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent implements OnInit {


  private isBoardDisabled = false;
  public endGameMessage = '';
  public board: string[] = []; // Game board
  
  constructor(private ttt: TttService) { }

  ngOnInit() {
    this.initGame();
     
    const sound = new Howl({src:['assets/20.mp3']});
    sound.play();
    //alert(sound.play);
  }

  // Initialize board
  public initGame() {
    this.board = this.ttt.InitGame();
    this.endGameMessage = '';
    this.isBoardDisabled = false;
  }

  // Conquest square by current player and check if there is winner or draw
  public doMove(pos: number) {
    const gameState = this.ttt.DoMove(pos);
    this.isBoardDisabled = gameState.isBoardDisabled;
    this.board = gameState.board;
    if(gameState.endGameMessage) {
      setTimeout(() => this.endGameMessage = gameState.endGameMessage, 500);
    }
  }

}
