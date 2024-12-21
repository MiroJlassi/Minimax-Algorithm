import { Component } from '@angular/core';
import { GameManagerService } from "../app/game-manager.service"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  board: string[] = Array(9).fill('');
  currentPlayer: string = '❌';
  gameOver: boolean = false;
  winner: string | null = null;
  xWins: number = 0; 
  oWins: number = 0;
  constructor(private gameManager: GameManagerService) { }
  ngOnInit() {
    this.oWins = this.gameManager.y;
    this.xWins = this.gameManager.x;
  }
  makeMove(index: number): void {
    if (this.board[index] === '' && !this.gameOver) {
      this.board[index] = this.currentPlayer;
      this.checkGameStatus();
      this.currentPlayer = this.currentPlayer === '❌' ? '⭕' : '❌';

      if (!this.gameOver && this.currentPlayer === '⭕') {
        this.aiMove();
      }
    }
  }

  aiMove(): void {
    const bestMove = this.minimax(this.board, '⭕');
    this.board[bestMove.index] = '⭕';
    this.checkGameStatus();
    this.currentPlayer = '❌';
  }

  minimax(board: string[], player: string): any {
    const availableMoves = this.getAvailableMoves(board);

    if (this.checkWinner(board, '❌')) return { score: -10 };
    if (this.checkWinner(board, '⭕')) return { score: 10 };
    if (availableMoves.length === 0) return { score: 0 };

    const moves = [];
    for (let i = 0; i < availableMoves.length; i++) {
      const move = availableMoves[i];
      board[move] = player;

      const result = this.minimax(board, player === '⭕' ? '❌' : '⭕');
      moves.push({ index: move, score: result.score });

      board[move] = ''; 
    }

    let bestMove;
    if (player === '⭕') {
      let bestScore = -Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
      }
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = moves[i];
        }
      }
    }

    return bestMove;
  }

  getAvailableMoves(board: string[]): number[] {
    return board.map((cell, index) => (cell === '' ? index : -1)).filter((index) => index !== -1);
  }

  checkGameStatus(): void {
    if (this.checkWinner(this.board, '❌')) {
      this.gameOver = true;
      this.winner = '❌';
    } else if (this.checkWinner(this.board, '⭕')) {
      this.gameOver = true;
      this.winner = '⭕';
    } else if (this.board.every((cell) => cell !== '')) {
      this.gameOver = true;
      this.winner = null;
    }
  }

  checkWinner(board: string[], player: string): boolean {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winningCombinations.some(
      ([a, b, c]) => board[a] === player && board[b] === player && board[c] === player
    );
  }

  resetGame(): void {
    this.updateWinCount();
    this.board = Array(9).fill('');
    this.gameOver = false;
    this.winner = null;
    this.currentPlayer = '❌';
  }
  updateWinCount(): void {
    if (this.winner === '❌') {
      this.xWins += 1; 
      this.gameManager.x = this.xWins;
    } else if (this.winner === '⭕') {
      this.oWins += 1; 
      this.gameManager.y = this.oWins;
    }
  }


}
