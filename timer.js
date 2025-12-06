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

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      display.innerText = "انتهى الوقت ⏰";
      // Optional: Trigger any action when timer ends
    }
  }, 1000);
}


/* ------------------------------------------------------------
 🔗 Event Binding
------------------------------------------------------------- */
startBtn.addEventListener("click", startTimer);


/* ------------------------------------------------------------
 🖥️ Initial Display
------------------------------------------------------------- */
updateDisplay(timeLeft);


