import { Component } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRippleModule} from '@angular/material/core';

interface Tile {
  value: string,
  index: number,
}

@Component({
  selector: 'app-board',
  imports: [MatGridListModule, MatRippleModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  grid: Tile[] = Array.from(Array(9)).map((_, index) => Object.assign({ value: " ", index: index }))

  handleAddToken(index: number, newValue: string) {
    console.log(index)
    this.grid = this.grid.map((tile) => {
      if (tile.index === index) {
        return { ...tile, value: newValue };
      }
      return tile;
    });
  }
}
