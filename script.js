document.addEventListener('DOMContentLoaded', () => {
  const block = document.getElementById('block');
  const gameBoard = document.getElementById('game-board');
  const vertical = 60; // Size of each block in pixels
  const horizontal = 50;
  let topPosition = 0;
  let leftPosition = 0;


// Function to generate the game board with tiles arranged to form a shape
function generateGameBoard() {
  const gameBoard = document.getElementById('game-board');
  
  // Define the shape of the game board as a 2D array of 0s and 1s (0: empty, 1: tile)
  const shape = [
    [1, 1, 1, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 2, 1],
    [1, 1, 1, 0, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 0, 1],
    [0, 1, 0, 0, 0, 1, 1, 1],
  ];
  
  // Generate the game board with tiles based on the shape
  for (let row = 0; row < shape.length; row++) {
    for (let col = 0; col < shape[row].length; col++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      if (shape[row][col] === 1) {
        tile.classList.add('movable-tile'); // Add class for movable tiles
      }
      else if(shape[row][col] === 0) {
        tile.classList.add('death-tile'); // Add class for movable tiles
      }
      else if(shape[row][col] === 2) {
        tile.classList.add('hole-tile'); // Add class for movable tiles
      }
      gameBoard.appendChild(tile);
    }
  }
}

// Call the function to generate the game board
generateGameBoard();


function moveBlock(dx, dy) {
  const newTopPosition = topPosition + dy * vertical;
  const newLeftPosition = leftPosition + dx * horizontal;

  // Check if the new position is within the game board boundaries
  if (
    newTopPosition >= 0 &&
    newTopPosition <= gameBoard.clientHeight - vertical &&
    newLeftPosition >= 0 &&
    newLeftPosition <= gameBoard.clientWidth - horizontal
  ) {
    topPosition = newTopPosition;
    leftPosition = newLeftPosition;
    block.style.top = topPosition + 'px';
    block.style.left = leftPosition + 'px';

    // Check if the block lands on region 2 (win condition)
    if (gameBoard.children[topPosition / vertical * numCols + leftPosition / horizontal].classList.contains('goal-tile')) {
      console.log('Congratulations! You won!');
      // Add visual feedback for winning
      block.style.backgroundColor = '#00FF00'; // Change block color to green
      // You can add more actions here
    }

    // Check if the block lands on region 0 (lose condition)
    if (gameBoard.children[topPosition / vertical * numCols + leftPosition / horizontal].classList.contains('death-tile')) {
      console.log('Oops! You lost!');
      // Add visual feedback for losing
      block.style.backgroundColor = '#FF0000'; // Change block color to red
      // You can add more actions here
    }
  } else {
    console.log('Block cannot move in that direction.');
  }
}

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      moveBlock(0, -1);
      break;
    case 'ArrowDown':
      moveBlock(0, 1);
      break;
    case 'ArrowLeft':
      moveBlock(-1, 0);
      break;
    case 'ArrowRight':
      moveBlock(1, 0);
      break;
  }
});
});