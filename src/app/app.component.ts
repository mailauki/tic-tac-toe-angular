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
  }

  playerToken: TokenType = "X";
  onTokenUpdate(newToken: TokenType) {
    this.playerToken = newToken;
  }

}
