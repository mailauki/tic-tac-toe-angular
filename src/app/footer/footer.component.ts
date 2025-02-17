import { Component, Injectable, Input, Output, EventEmitter, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogComponent } from '../dialog/dialog.component';
import { emptyBoard, emptyTally, TallyType, TokenType } from '../app.const';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-footer',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatButtonToggleModule, MatChipsModule, MatDialogModule, MatTooltipModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() board: TokenType[] = [];
  @Input() token: TokenType = "❌";
  // @Input() player: 1 | 2 = 1;
  @Input() count: number = 0;
  @Input() tally: TallyType = emptyTally;
  @Input() multiplayer: boolean = false;

  @Output() updatedBoard = new EventEmitter<TokenType[]>();
  @Output() updatedToken = new EventEmitter<TokenType>();
  @Output() updatedCount = new EventEmitter<number>();
  @Output() updatedTally = new EventEmitter<TallyType>();
  @Output() updatedPlayers = new EventEmitter<boolean>();

  resetBoard() {
    const newBoard = emptyBoard;
    this.updatedBoard.emit(newBoard);

    this.resetCount();

    this.updatedToken.emit("❌");
  }

  resetCount() {
    this.count = 0;
    this.updatedCount.emit(0);
  }

  resetWins() {
    this.resetBoard();

    const newTally = emptyTally;
    this.updatedTally.emit(newTally);
  }

  onTokenChange(value: TokenType) {
    this.updatedToken.emit(value);
  }

  onPlayersChange() {
    this.updatedPlayers.emit(!this.multiplayer)
  }

  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        resetWins: this.resetWins.bind(this),
        playersChange: this.onPlayersChange.bind(this),
        isMultiplayer: this.multiplayer,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
