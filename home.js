const gameStartAudio = new Audio('assets/Bloxorz - Menu Theme.mp3');
const startButton = document.getElementById('startbutton');

// Play the game start audio when the page loads
gameStartAudio.loop = true;
gameStartAudio.play().catch(error => {
  console.error('Failed to play game start audio:', error);
});

// Event listener for the "Start Game" button click
startButton.addEventListener('click', () => {
  // Pause the game start audio
  if (!gameStartAudio.paused) {
    gameStartAudio.pause();
    gameStartAudio.currentTime = 0; // Rewind the audio to the beginning
  }
  // Redirect to the game.html page
  window.location.href = 'level-1.html';
});

