import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { emptyBoard, TokenType } from '../app.const';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-board',
  imports: [MatGridListModule, MatRippleModule, MatCardModule, MatButtonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  @Input() board: TokenType[] = [];
  @Input() token: TokenType = "❌";
  @Input() count: number = 0;
  @Input() win?: number[] = [];

  @Output() updatedBoard = new EventEmitter<TokenType[]>();
  @Output() incrementCountEvent = new EventEmitter<number>();

  updateTiles(id: number) {
    if (this.board[id] !== "❌" && this.board[id] !== "⭕️") {
      const newBoard = this.board.map((tile, index) => {
        if (tile === " " && index === id) {
          return this.token;
        }
        else return tile;
      });
      this.addTurn();
      this.updatedBoard.emit(newBoard);
    }
  }

  addTurn() {
    this.count++;
    this.incrementCountEvent.emit(this.count);
  }
}
