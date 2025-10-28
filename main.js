// main.js

// --- الأسئلة المرتبطة بكل حرف ---
const questions = {
  "ا": "عاصمة مصر هي؟",
  "ب": "ما اسم البحر الذي يفصل بين السعودية وإفريقيا؟",
  "ت": "كاتب رواية الحرب والسلام هو؟",
  "ث": "اسم كوكب يبعد عن الشمس وترتيبه الرابع؟",
  "ج": "من أول جامع بُني في الإسلام؟",
  "ح": "من هو شاعر الرسول ﷺ؟",
  "خ": "اسم خليفة عباسي اشتهر ببنائه بيت الحكمة؟",
  "د": "دولة عربية عاصمتها دمشق؟",
  "ذ": "غزوة وقعت في السنة الخامسة للهجرة تسمى غزوة…؟",
  "ر": "عاصمة المغرب؟",
  "ز": "ما الحيوان الذي يُلقّب بسفينة الصحراء؟",
  "س": "نبي ابتلعه الحوت؟",
  "ش": "بلد يُعرف بأرض الشمس المشرقة؟",
  "ص": "ما اسم السورة التي تبدأ بـ (ص والقرآن ذي الذكر)؟",
  "ض": "ما اللغة التي تُسمى لغة الضاد؟",
  "ط": "صحابي اشتهر بكونه سيف الله المسلول؟",
  "ظ": "اسم السورة التي فيها قصة يونس عليه السلام؟",
  "ع": "جبل بمكة كان مكانًا لغار حراء؟",
  "غ": "اسم طائر ارتبط بقصة أصحاب الفيل؟",
  "ف": "عاصمة فرنسا؟",
  "ق": "اسم أطول نهر في العالم؟",
  "ك": "عملة اليابان؟",
  "ل": "كوكب يُسمى الكوكب الأحمر؟",
  "م": "خاتم الأنبياء؟"
};

// --- عناصر DOM ---
const squares = Array.from(document.querySelectorAll(".square"));
const title = document.querySelector(".title");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");
const restartBtn = resultBox ? resultBox.querySelector("button") : null;

// --- إعداد اللعبة ---
const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

let gameOver = false;
let turn = "orange"; // إذا أردت نظام دور بدل النقرات، يمكن تغييره — حالياً نعتمد على نقرات 1/2/3
let clickTimers = new Map(); // لتفريق بين النقرات السريعة لكل مربع
let clickCounts = new Map(); // عداد النقرات لكل مربع

// دالة خلط مصفوفة (Fisher-Yates)
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// تعبئة 9 مربعات بحروف عربية عشوائية وغير مكررة
function fillLetters() {
  const letters = Object.keys(questions);
  const shuffled = shuffle(letters);
  for (let i = 0; i < squares.length; i++) {
    squares[i].innerText = shuffled[i] || ""; // إذا كانت أقل من 9 حروف (غير محتمل) يضع فارغ
  }
}

// إظهار صندوق النتيجة
function showResult(msg) {
  if (!resultBox || !resultText) return;
  resultText.innerText = msg;
  resultBox.style.display = "block";
  gameOver = true;
}

// إخفاء صندوق النتيجة
function hideResult() {
  if (!resultBox) return;
  resultBox.style.display = "none";
}

// التحقق من الفائز أو التعادل
function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    const colorA = squares[a].style.backgroundColor;
    const colorB = squares[b].style.backgroundColor;
    const colorC = squares[c].style.backgroundColor;

    if (colorA && colorA === colorB && colorA === colorC) {
      const winner = (colorA === "orange") ? "البرتقالي 🟧" : (colorA === "blue" ? "الأزرق 🟦" : null);
      if (winner) {
        showResult(`🎉 الفائز: ${winner}`);
        return true;
      }
    }
  }

  const allFilled = squares.every(sq => sq.style.backgroundColor);
  if (allFilled) {
    showResult("😅 تعادل!");
    return true;
  }

  return false;
}

// إعادة تشغيل اللعبة
function restartGame() {
  gameOver = false;
  hideResult();
  title.innerText = "سوال";
  clickCounts.clear();
  // مسح الألوان
  squares.forEach(sq => {
    sq.style.backgroundColor = "";
  });
  fillLetters();
}
window.restartGame = restartGame; // لجعلها متاحة إذا كانت HTML تستخدم onclick inline

// ربط زر إعادة التشغيل إن وُجد
if (restartBtn) {
  restartBtn.addEventListener("click", restartGame);
}

// التعامل مع نقرات كل مربع (1 => عرض سؤال، 2 => برتقالي، 3 => أزرق)
function attachSquareHandlers() {
  squares.forEach((square, idx) => {
    clickCounts.set(idx, 0);

    square.addEventListener("click", () => {
      if (gameOver) return; // لا نفعل أي شيء بعد انتهاء اللعبة
      // إذا المربع مأخوذ (له لون) فلا نسمح بتغييره
      if (square.style.backgroundColor) return;

      // زيادة العداد لكل مربع
      let count = clickCounts.get(idx) || 0;
      count++;
      clickCounts.set(idx, count);

      // نستخدم تايمر لفحص ما إذا انتهت سلسلة النقرات السريعة (300ms)
      if (clickTimers.has(idx)) {
        clearTimeout(clickTimers.get(idx));
      }

      const timer = setTimeout(() => {
        // نفّذ بناءً على عدد النقرات
        if (count === 1) {
          // النقرة الأولى: عرض السؤال المرتبط بالحرف في العنوان فقط
          const letter = square.innerText;
          title.innerText = questions[letter] || "لا يوجد سؤال لهذا الحرف";
        } else if (count === 2) {
          // نقرتان: يصبح المربع برتقالي
          square.style.backgroundColor = "orange";
          checkWinner();
        } else if (count >= 3) {
          // ثلاث نقرات أو أكثر: يصبح أزرق
          square.style.backgroundColor = "blue";
          checkWinner();
        }
        // إعادة تعيين العداد والموقت لهذا المربع
        clickCounts.set(idx, 0);
        clickTimers.delete(idx);
      }, 300);

      clickTimers.set(idx, timer);
    });
  });
}

// بدء اللعبة عند تحميل السكربت
(function init() {
  fillLetters();
  attachSquareHandlers();
  hideResult();
})();













