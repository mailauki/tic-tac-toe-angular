import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatButtonToggleModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() board: string[] = [];

  @Output() tiles = new EventEmitter<string[]>();

  resetTiles() {
    const newBoard = [
      " ", " ", " ",
      " ", " ", " ",
      " ", " ", " ",
    ];
    this.tiles.emit(newBoard);
  }
}
