import { IGameState } from "../types/GameState"
import { drawObject } from "./draw-object";
const moveSnake = (dx: number, dy: number, direction: string, gameState: IGameState) => {
  let newSnake = [...gameState.snake];

  newSnake = [{
    x: gameState.snake[0].x + dx,
    y: gameState.snake[0].y + dy,
  }, ...newSnake];
  newSnake.pop();
  console.log({
    ...gameState, 
    snake: newSnake
  })
  //new function: drawUpdate -> handles new snake
  return {
    ...gameState, 
    snake: newSnake
  }
}
export const handleInput = (gameState: IGameState) => {
  const handleKeyEvents = (event: KeyboardEvent) => {
    console.log(event)
    switch(event.key) {
      case 'w': 
        moveSnake(0, -20, 'UP', gameState);
    }
  }

  window.addEventListener('keypress', handleKeyEvents)
}

