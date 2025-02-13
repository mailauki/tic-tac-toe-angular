import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { BoardComponent } from "./board/board.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, BoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tic-tac-toe-angular';
}
