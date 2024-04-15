const shape = 
[
    [1, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 2, 1],
    [1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1],
    [0, 1, 0, 0, 0, 1, 1, 1],
    [0, 1 ,1, 1, 1, 1, 1, 0],
   ]
 
 document.addEventListener('DOMContentLoaded', () => {
  const block = document.getElementById('block');
  const vertical = 60; // Size of each block in pixels
  const horizontal = 50;
  let topPosition = 0;
  let leftPosition = 0;
  let direction = 'right'; // Initial direction
  let startTime = 0; // Variable to store the start time of the game


  // Function to generate the game board with tiles arranged to form a shape
  function generateGameBoard() {
    const gameBoard = document.getElementById('game-board');

    // Generate the game board with tiles based on the shape
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        if (shape[row][col] === 1) {
          tile.classList.add('movable-tile'); // Add class for movable tiles
        } else if (shape[row][col] === 0) {
          tile.classList.add('death-tile'); // Add class for death tiles
        } else if (shape[row][col] === 2) {
          tile.classList.add('hole-tile'); // Add class for hole tiles
        }
        gameBoard.appendChild(tile);
      }
    }
  }

  // Call the function to generate the game board
  generateGameBoard();

  // Function to move the block
  function moveBlock() {
    let newTopPosition = topPosition;
    let newLeftPosition = leftPosition;

    // Calculate new position based on direction
    switch (direction) {
      case 'up':
        newTopPosition -= vertical;
        break;
      case 'down':
        newTopPosition += vertical;
        break;
      case 'left':
        newLeftPosition -= horizontal;
        break;
      case 'right':
        newLeftPosition += horizontal;
        break;
    }

    {
      topPosition = newTopPosition;
      leftPosition = newLeftPosition;
      block.style.top = topPosition + 'px';
      block.style.left = leftPosition + 'px';

// Calculate new indices based on the new position
  const rowIndex = Math.floor(newTopPosition / vertical);
  const colIndex = Math.floor(newLeftPosition / horizontal);

  // Check if the next position is within the game board boundaries
  if (
    rowIndex >= 0 && rowIndex < shape.length &&
    colIndex >= 0 && colIndex < shape[0].length // Assuming all rows have the same number of columns
  ) {
    // Check if the next position is a hole tile
    if (shape[rowIndex][colIndex] === 2) {
      clearInterval(intervalId); // Stop the block movement
      const restartButton = document.createElement('button');
      restartButton.textContent = 'Next Level';
      restartButton.addEventListener('click', function() {
        window.location.href = 'level-3.html';
      });

      displayGameEndModal('Congratulations! You won the game! Yipeee',restartButton);
      return; 
    }

    // Check if the next position is a death tile
    if (shape[rowIndex][colIndex] === 0) {
      clearInterval(intervalId); // Stop the block movement
      const restartButton = document.createElement('button');
      restartButton.textContent = 'Play Again';
      restartButton.addEventListener('click', function() {
        location.reload();
      });
      displayGameEndModal('Game Over! You reached a death tile.',restartButton);
      return; // Stop execution of further code
    }

    // Update block position
    topPosition = newTopPosition;
    leftPosition = newLeftPosition;
    block.style.top = topPosition + 'px';
    block.style.left = leftPosition + 'px';
  } else {
    // Stop the block movement if it's out of bounds
    clearInterval(intervalId);
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Play Again';
    restartButton.addEventListener('click', function() {
      location.reload();
    });
    displayGameEndModal('Game Over! You reached out of the board.',restartButton);

  }
 }
}
  // Function to update the direction of the block
  function changeDirection(newDirection) {
    direction = newDirection;
  }

  // Set interval to continuously move the block in the current direction
  const intervalId = setInterval(moveBlock, 200); // Change speed as needed

  // Event listener for arrow key presses to change direction
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        changeDirection('up');
        break;
      case 'ArrowDown':
        changeDirection('down');
        break;
      case 'ArrowLeft':
        changeDirection('left');
        break;
      case 'ArrowRight':
        changeDirection('right');
        break;
    }
  });
});

// Function to display the game end message
function displayGameEndModal(message,restartButton) {
  const modal = document.getElementById('game-end-modal');
  const modalMessage = document.getElementById('game-end-message');
  modalMessage.textContent = message;
  modal.style.display = 'block';
        
  restartButton.style.padding = '10px 20px';
  restartButton.style.backgroundColor = 'RED';
  restartButton.style.color = 'white';
  restartButton.style.border = 'none';
  restartButton.style.borderRadius = '5px';
  restartButton.style.cursor = 'pointer';
  restartButton.style.marginTop = '15px';
  modalMessage.appendChild(restartButton);


}

// Function to hide the game end message
function hideGameEndModal() {
  const modal = document.getElementById('game-end-modal');
  modal.style.display = 'none';
}

// Event listener for close button of the modal
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('close')) {
    hideGameEndModal();
  }
});