import { Component, output } from '@angular/core';
import { GameManagerService } from "../app/game-manager.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'minimax';
  gameState: string = "";

  constructor(private gameManager: GameManagerService) { }


  outputResults() {
    if (this.gameManager.validateState(this.gameManager.board) != "") {
      this.gameState = this.gameManager.validateState(this.gameManager.board) + "Won !";
    }
  }
}
