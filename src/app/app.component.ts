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
  opponentToken: TokenType = "⭕️";
  turnCount = 0;
  currentPlayer: 1 | 2 = 1;
  currentToken: TokenType = this.playerToken;
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

    if (!this.multiPlayer && this.turnCount > 0 && !this.isOver) this.computerOpponentMove();
    else this.alternateTurn();

    this.updateWinBoards();
    this.findWinByCombo();

    this.isWin = this.isXWin || this.isOWin;
    this.isFull = this.turnCount === 9;
    this.isOver = Boolean(this.isWin) || this.isFull;

    if (this.isOver && this.boardTiles !== emptyBoard) {
      this.tallyWins();
    }
  }

  // handles updating the initial token on toggle choice
  // also updates based on turn
  onTokenUpdate(newToken: TokenType) {
    this.currentToken = newToken;
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
    this.currentToken = this.currentPlayer === 1 ? this.playerToken : this.opponentToken;
  }

  alternateTurn() {
    this.currentPlayer = this.turnCount % 2 === 0 ? 1 : 2;
    this.currentToken = this.currentPlayer === 1 ? this.playerToken : this.opponentToken;
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
  }

  // handles updating the tally counters
  tallyWins() {
    if (this.isXWin) this.xWins++;
    if (this.isOWin) this.oWins++;
    if (!this.isXWin && !this.isOWin && this.isFull) this.draws++;

    this.winsTally = { x: this.xWins, o: this.oWins, draw: this.draws };
  }

  computerOpponentMove() {
    const remainingEmptyTiles = this.boardTiles.flatMap((tile, index) => {
      if (tile !== "❌" && tile !== "⭕️") return index;
      else return [];
    });

    const randomMove = remainingEmptyTiles[Math.floor(Math.random()*remainingEmptyTiles.length)];

    const hasConsecutive = winCombos.flatMap((combo) => {
      const isXConsecutive = combo.map((index) => this.xBoard.includes(index)).filter((isX) => isX).length === 2;
      const isOConsecutive = combo.map((index) => this.oBoard.includes(index)).filter((isO) => isO).length === 2;

      if (isXConsecutive === true || isOConsecutive === true) return combo;
      else return [];
    })

    const consecutiveMove = hasConsecutive.flatMap((index) => {
      if(remainingEmptyTiles.includes(index)) return index;
      else return [];
    });

    const nextMove = consecutiveMove.length > 0 ? consecutiveMove[0] : randomMove;

    // place token and update board for computer opponent
    this.boardTiles = this.boardTiles.map((tile, index) => {
      // this.turnCount = this.turnCount + 1;
      if (index === nextMove) return this.opponentToken;
      else return tile;
    });

    // updates turn count
    this.turnCount++;

    // updates token toggle based on turn
    this.alternateTurn();
  }
}
