import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BoardComponent } from "./board/board.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { emptyBoard, emptyTally, TallyType, TokenType, winCombos } from './app.const';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, BoardComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tic-tac-toe-angular';
  boardTiles = emptyBoard;
  playerToken: TokenType = "❌";
  turnCount = 0;
  player: 1 | 2 = 1;
  multiPlayer: boolean = false;
  xBoard: number[] = [];
  oBoard: number[] = [];
  isXWin?: number[] = undefined;
  isOWin?: number[] = undefined;
  isWin?: number[] = undefined;
  isFull = false;
  isOver = false;
  xWins = 0;
  oWins = 0;
  draws = 0;
  winsTally: TallyType = emptyTally;

  // handles updating board on turn
  // also updates win combo and tally
  onBoardUpdate(newBoard: TokenType[]) {
    this.boardTiles = newBoard;
    this.updateTokenOnTurn();
    this.updateWinBoards();
    this.findWinByCombo();
    if (this.isOver && this.boardTiles !== emptyBoard) {
      this.tallyWins();
    }
  }

  // handles updating the initial token on toggle choice
  onTokenUpdate(newToken: TokenType) {
    this.playerToken = newToken;
  }

  // handles updating the turn count
  onTurnUpdate(turn: number) {
    this.turnCount = turn;
  }

  // handles updating tally for reset
  onTallyUpdate(newTally: TallyType) {
    this.xWins = newTally.x;
    this.oWins = newTally.o;
    this.draws = newTally.draw;
    this.winsTally = newTally;
  };

  // handles enabling multiplayer option
  onPlayersUpdate(isMultiplayer: boolean) {
    this.multiPlayer = isMultiplayer;
  }

  // handles token toggle from turn change based on initial token choice
  updateTokenOnTurn() {
    this.player = this.turnCount % 2 === 0 ? 1 : 2;

    const playerX = this.player === 1 && this.playerToken === "❌";
    const opponentX = this.player === 2 && this.playerToken === "❌";
    const playerO = this.player === 1 && this.playerToken === "⭕️";
    const opponentO = this.player === 2 && this.playerToken === "⭕️";

    if (this.turnCount > 0) {
      if (playerX || opponentX) {
        this.playerToken = "⭕️";
      }
      else if (playerO || opponentO) {
        this.playerToken = "❌";
      }
    }
  }

  // handles win combo based on token for each
  updateWinBoards() {
    this.xBoard = this.boardTiles.map((tile, index) => tile === "❌" ? index : null).filter((index) => index !== null);
    this.oBoard = this.boardTiles.map((tile, index) => tile === "⭕️" ? index : null).filter((index) => index !== null);
  }

  // handles finding winning token based on win combos
  // also handles updating game over variables
  findWinByCombo() {
    this.isXWin = winCombos.find((combo) => combo.map((index) => this.xBoard.includes(index)).every((item) => item === true));
    this.isOWin = winCombos.find((combo) => combo.map((index) => this.oBoard.includes(index)).every((item) => item === true));

    this.isWin = this.isXWin || this.isOWin;
    this.isFull = this.turnCount === 9;
    this.isOver = Boolean(this.isWin) || this.isFull;
  }

  // handles updating the tally counters
  tallyWins() {
    if (this.isXWin) this.xWins++;
    if (this.isOWin) this.oWins++;
    if (!this.isXWin && !this.isOWin && this.isFull) this.draws++;

    this.winsTally = { x: this.xWins, o: this.oWins, draw: this.draws };
  }
}
