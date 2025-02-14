import { Component, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { emptyBoard, TokenType } from '../app.component';

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
  @Input() board: TokenType[] = [];
  @Input() token: TokenType = "X";

  @Output() updatedBoard = new EventEmitter<TokenType[]>();
  @Output() updatedToken = new EventEmitter<TokenType>();

  resetTiles() {
    const newBoard = emptyBoard;
    this.updatedBoard.emit(newBoard);
  }

  onTokenChange(value: TokenType) {
    this.updatedToken.emit(value);
  }
}
