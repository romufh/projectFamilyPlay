// timer.js

const startBtn = document.getElementById("startTimerBtn");
const display = document.getElementById("timerDisplay");

let timerInterval = null;
let timeLeft = 60; // ثانية

function updateDisplay(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  display.innerText = `${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`;
}

function startTimer() {
  // إعادة التعيين إذا تم الضغط مرة أخرى
  if (timerInterval) clearInterval(timerInterval);
  timeLeft = 60;
  updateDisplay(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateDisplay(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      display.innerText = "انتهى الوقت ⏰";
      // يمكنك هنا إضافة أي إجراء عند انتهاء الوقت
    }
  }, 1000);
}

// ربط الزر
startBtn.addEventListener("click", startTimer);

// عرض أولي
updateDisplay(timeLeft);
