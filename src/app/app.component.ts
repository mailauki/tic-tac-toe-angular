import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BoardComponent } from "./board/board.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

export type TokenType = "X" | "O" | " "
export const emptyBoard: TokenType[] = [
  " ", " ", " ",
  " ", " ", " ",
  " ", " ", " ",
];

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, BoardComponent, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tic-tac-toe-angular';

  boardTiles = emptyBoard;
  onBoardUpdate(newBoard: TokenType[]) {
    this.boardTiles = newBoard;
    this.updateTokenOnTurn();
  }

  playerToken: TokenType = "X";
  onTokenUpdate(newToken: TokenType) {
    this.playerToken = newToken;
  }

  turnCount = 0;
  onTurnUpdate(turn: number) {
    this.turnCount = turn;
  }

  player: 1 | 2 = 1;
  updateTokenOnTurn() {
    this.player = this.turnCount % 2 === 0 ? 1 : 2;

    if (this.player === 1 && this.playerToken === "X") {
      this.playerToken = "O"
    }
    else if (this.player === 1 && this.playerToken === "O") {
      this.playerToken = "X"
    }
    else if (this.player === 2 && this.playerToken === "X") {
      this.playerToken = "O"
    }
    else if (this.player === 2 && this.playerToken === "O") {
      this.playerToken = "X"
    }
  }
}
