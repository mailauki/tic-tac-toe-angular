import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { TokenType } from '../app.const';
import {MatCardModule} from '@angular/material/card';
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
  @Input() over: boolean = false;

  @Output() updatedBoard = new EventEmitter<TokenType[]>();
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
