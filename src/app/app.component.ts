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
  xBoard: number[] = [];
  oBoard: number[] = [];
  isXWin: number[] | undefined = undefined;
  isOWin: number[] | undefined = undefined;
  isWin: number[] | undefined = [];
  isFull = false;
  isOver = false;
  xWins = 0;
  oWins = 0;
  draws = 0;
  winsTally: TallyType = emptyTally;

  onBoardUpdate(newBoard: TokenType[]) {
    this.boardTiles = newBoard;
    this.updateTokenOnTurn();
    this.updateTokenBoards();
    this.findWinByCombo();
    this.tallyWins();
  }

  onTokenUpdate(newToken: TokenType) {
    this.playerToken = newToken;
  }
  onTurnUpdate(turn: number) {
    this.turnCount = turn;
  }
  updateTokenOnTurn() {
    this.player = this.turnCount % 2 === 0 ? 1 : 2;

    if (this.player === 1 && this.playerToken === "❌") {
      this.playerToken = "⭕️"
    }
    else if (this.player === 1 && this.playerToken === "⭕️") {
      this.playerToken = "❌"
    }
    else if (this.player === 2 && this.playerToken === "❌") {
      this.playerToken = "⭕️"
    }
    else if (this.player === 2 && this.playerToken === "⭕️") {
      this.playerToken = "❌"
    }
  }

  updateTokenBoards() {
    this.xBoard = this.boardTiles.map((tile, index) => tile === "❌" ? index : null).filter((index) => index !== null)
    this.oBoard = this.boardTiles.map((tile, index) => tile === "⭕️" ? index : null).filter((index) => index !== null)
  }

  findWinByCombo() {
    this.isXWin = winCombos.find((combo) => combo.map((index) => this.xBoard.includes(index)).every((item) => item === true));
    this.isOWin = winCombos.find((combo) => combo.map((index) => this.oBoard.includes(index)).every((item) => item === true));

    this.isWin = this.isXWin || this.isOWin;
    this.isFull = this.turnCount === 8;
    this.isOver = Boolean(this.isWin) || this.isFull;
  }
  tallyWins() {
    if (this.isXWin && this.isOver) this.xWins++;
    if (this.isOWin && this.isOver) this.oWins++;
    if (!this.isXWin && !this.isOWin && this.isOver) this.draws++;

    this.winsTally = { x: this.xWins, o: this.oWins, draw: this.draws };
  }
}
