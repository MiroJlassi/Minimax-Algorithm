import { Component, Input } from '@angular/core';
import { GameManagerService } from "../../app/game-manager.service"

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.css'
})
export class CellComponent {
  @Input() id: number = 0;
  x: number = 0;
  clicked: boolean = false;
  text: string= "";
  constructor(private gameManager: GameManagerService) { }

  playTurn() {
    if (this.gameManager.validateState(this.gameManager.board) == "") {
      if (!this.clicked) {
        if (this.gameManager.turn % 2 == 0) {
          this.gameManager.turn++;
          this.text = "X";
        } else {
          this.gameManager.turn++;
          this.text = "O";
        }
        this.clicked = true;
        this.gameManager.board[this.id] = this.text;
        console.log(this.gameManager.validateState(this.gameManager.board));
      }
    } else {
      console.log(this.gameManager.validateState(this.gameManager.board));
    }
  }
}
