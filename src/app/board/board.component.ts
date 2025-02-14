import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-board',
  imports: [MatGridListModule, MatRippleModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  @Input() board: string[] = [];

  @Output() tiles = new EventEmitter<string[]>();

  updateTiles(id: number) {
    const newBoard = this.board.map((tile, index) => {
      if (index === id) {
        return "X";
      }
      else return tile;
    });
    this.tiles.emit(newBoard);
  }
}
