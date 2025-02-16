import { Component, Injectable, Input, Output, EventEmitter, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { emptyBoard, emptyTally, TallyType, TokenType } from '../app.const';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatButtonToggleModule, MatChipsModule, MatDialogModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() board: TokenType[] = [];
  @Input() token: TokenType = "❌";
  @Input() count: number = 0;
  @Input() tally: TallyType = emptyTally;

  @Output() updatedBoard = new EventEmitter<TokenType[]>();
  @Output() updatedToken = new EventEmitter<TokenType>();
  @Output() updatedCount = new EventEmitter<number>();
  @Output() updatedTally = new EventEmitter<TallyType>();

  resetTiles() {
    const newBoard = emptyBoard;
    this.updatedBoard.emit(newBoard);
    this.resetCount();
  }

  resetCount() {
    this.count = 0;
    this.updatedCount.emit(0);
  }

  resetWins() {
    this.resetTiles();

    const newTally = emptyTally;
    this.updatedTally.emit(newTally);
  }

  onTokenChange(value: TokenType) {
    this.updatedToken.emit(value);
  }

  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        resetWins: this.resetWins.bind(this),
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
