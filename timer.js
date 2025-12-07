/* ------------------------------------------------------------
 ⏱️ Timer Management: Countdown Timer
---------------------------------------------------------------
📁 File: timer.js
🧩 Description:
  This file contains the countdown timer logic used in the
  Tic-Color & Letter Family Game.

⚙️ Main Responsibilities:
  - Display the countdown timer.
  - Start / reset the timer.
  - Notify when time finishes.

👨‍👩‍👧‍👦 Purpose:
  Provides a visual countdown for game rounds and question timing.

📦 Related Files:
  - game.html → Timer display & start button.
  - main.js    → Game logic integration.

🧠 Developer Notes:
  - Update DOM IDs if HTML changes.
  - Modify `timeLeft` to change round duration.
------------------------------------------------------------- */


/* ------------------------------------------------------------
 🖱️ DOM Elements
------------------------------------------------------------- */
const startBtn = document.getElementById("startTimerBtn");
const stopBtn = document.getElementById("stopTimerBtn");
const display = document.getElementById("timerDisplay");


/* ------------------------------------------------------------
 ⏳ Timer Variables
------------------------------------------------------------- */
let timerInterval = null;
let timeLeft = 60; // Default 60 seconds


/* ------------------------------------------------------------
 🔄 Utility: Update Timer Display
------------------------------------------------------------- */
function updateDisplay(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  display.innerText = `${min}:${sec}`;
  console.log(`${min}:${sec}`);
}


/* ------------------------------------------------------------
 ▶️ Start / Reset Timer
------------------------------------------------------------- */
function startTimer() {
  // Reset if already running
  if (timerInterval) clearInterval(timerInterval);

  timeLeft = 60;            // Reset time
  updateDisplay(timeLeft);  // Initial display

  
  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay(timeLeft);

   if (timeLeft === 50) {
      console.log("لقد مرت 10 ثوانٍ ⏳");
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      display.innerText = "انتهى الوقت ⏰";
    console.log("Timer finish");
    }
  }, 1000);

  
  
}


/* ⏹️ Stop Timer */
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    console.log("Timer stopped at:", display.innerText);
  }
}



/* ------------------------------------------------------------
 🔗 Event Binding
------------------------------------------------------------- */
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);

/* ------------------------------------------------------------
 🖥️ Initial Display
------------------------------------------------------------- */
updateDisplay(timeLeft);

/* ------------------------------------------------------------
 🧪 Internal Test Method
------------------------------------------------------------- */
function testTimer() {
  console.log("=== Timer Test Started ===");

  // Simulate button click
  startTimer();

  // Check after 3 seconds
  setTimeout(() => {
    console.log("After 3 seconds, timer shows:", display.innerText);
  }, 3000);

  // Check after 5 seconds
  setTimeout(() => {
    console.log("After 5 seconds, timer shows:", display.innerText);
  }, 5000);

  // Check end of timer (61 sec)
  setTimeout(() => {
    console.log("Expected end message:", display.innerText);
    console.log("=== Timer Test Finished ===");
  }, 61000);
}

// Export the test function for internal use
window.testTimer = testTimer;

