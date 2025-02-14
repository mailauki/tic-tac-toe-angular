import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { TokenType } from '../app.component';
import {MatCardModule} from '@angular/material/card';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-board',
  imports: [MatGridListModule, MatRippleModule, MatCardModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  @Input() board: TokenType[] = [];
  @Input() token: TokenType = "X";
  @Input() count: number = 0;

  @Output() updatedBoard = new EventEmitter<TokenType[]>();
  // @Output() updatedToken = new EventEmitter<TokenType>();
  @Output() incrementCountEvent = new EventEmitter<number>();

  updateTiles(id: number) {
    const newBoard = this.board.map((tile, index) => {
      if (index === id) {
        return this.token;
      }
      else return tile;
    });
    this.updatedBoard.emit(newBoard);
    this.addTurn();
  }

  addTurn() {
    this.count++;
    this.incrementCountEvent.emit(this.count);
  }
}
