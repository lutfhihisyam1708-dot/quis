/* =====================================
     1. DATA PERTANYAAN QUIZ
===================================== */

const questions = [
	{
	question: "1. Apa nama ilmiah dari bunga Rafflesia?",
	answer: [
		"A. Amorphophallus titanum",
        "B. Rafflesia arnoldii",
        "C. Phalaenopsis amabilis",
        "D. Jasminum sambac"
	],
	correct: 1
	},
	{
	question: "2. Tumbuhan yang memiliki batang beruas-ruas dan sering dimanfaatkan sebagai bahan bangunan adalah ...",
	answer: [
		"A. Melati",
        "B. Durian",
        "C. Manggis",
        "D. Bambu"
	],
	correct: 3
	},
	{
	question: "3. Edelweiss Jawa dikenal sebagai tumbuhan yang tumbuh di ...",
	answer: [
		"A. Pantai",
		"B. Hutan bakau",
		"C. Pegunungan",
		"D. Rawa-rawa"
	],
	correct: 2
	},
	{
	question: "4. Manakah tumbuhan yang termasuk kelompok penghasil rempah-rempah?",
	answer: [
		"A. Lada, Lombok, dan Limau",
		"B. Merica, Mawar, dan Ketumbar",
		"C. Melati, Temulawak, dan Pala",
		"D. Kluwek, Cengkih, dan Kayu Manis"
	],
	correct: 3
	},
	{
	question: "5. Manakah pasangan tumbuhan dan nama ilmiah yang benar?",
	answer: [
		"A. Pakis Tiang - Cyathea",
		"B. Kantong Semar - Santalum album",
		"C. Meranti - Myristica fragrans",
		"D. Pala - Tectona grandis"
	],
	correct: 0
	},
	{
	question: "6. Manakah kelompok yang seluruhnya merupakan fauna khas Indonesia?",
	answer: [
		"A. Anoa, Cenderawasih, dan Badak",
		"B. Komodo, Anoa, dan Cenderawasih",
		"C. Harimau Jawa, Orang Utan, dan Zebra",
		"D. Jerapah, Badak Jawa, dan Kangguru"
	],
	correct: 1
	},
	{
    question: "7. Kukang dikenal sebagai hewan yang aktif pada ...",
	answer: [
		"A. Pagi hari",
        "B. Siang hari",
        "C. Sore hari",
        "D. Malam hari"
	],
	correct: 3
	},
	{
    question: "8. Bekantan merupakan hewan khas dari ...",
	answer: [
		"A. Kalimantan Selatan",
		"B. Sumatra Barat",
		"C. Kalimantan Utara",
		"D. Sulawesi Tenggara"
	],
	correct: 0
	},
	{
    question: "9. Penyu Hijau termasuk kelompok ...?",
	answer: [
		"A. Amfibi",
        "B. Unggas",
        "C. Mamalia",
        "D. Reptil",
	],
	correct: 3
	},
	{
    question: "10. Apa nama ilmiah dari Gajah Sumatra?",
	answer: [
		"A. Elephas maximus sumatranus",
        "B. Bubalus depressicornis",
        "C. Pongo pygmaeus",
        "D. Babyrousa"
	],
	correct: 0
	},
];

/* =====================================
      2. VARIABEL QUIZ
===================================== */

let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let answered = false;

/* =====================================
      3. MEMILIH PERMAINAN
===================================== */

function startGame(game) {

	const area =
	document.getElementById("game-area")

	if(game === "quiz") {
		
		currentQuestion = 0;
		score = 0;
		correctAnswers = 0;
		answered = false;

		showQuestion();
	}

	else if(game === "memory") {
		startMemoryGame();
	}

	else if(game === "word") {
		startWordGame();
	}
}

/* =====================================
      4. MENAMPILKAN PERTANYAAN
===================================== */

function showQuestion() {

	const area =
	document.getElementById("game-area");

	const q =
	questions[currentQuestion];

	answered = false;

	let answerButtons = "";

	q.answer.forEach((answer, index) => {

		answerButtons += `
            <button
                class="answer-btn"
                onclick="checkAnswer(${index})">

                ${answer}

            </button>
        `;
	});

	const progressWidth =
	(currentQuestion/questions.length) * 100;

	area.innerHTML = `

        <h2>🧠 Quiz Game</h2>

        <div class="quiz-info">

            <span>
                Soal ${currentQuestion + 1}
                / ${questions.length}
            </span>

            <span>
                Skor: ${score}
            </span>

        </div>


        <div class="progress-bar">

            <div
                class="progress"
                style="width: ${progressWidth}%">

            </div>

        </div>


        <h3 class="question">
            ${q.question}
        </h3>


        <div class="answer-container">

            ${answerButtons}

        </div>


        <p id="feedback"></p>


        <button
            id="next-btn"
            onclick="nextQuestion()"
            hidden>

            ${currentQuestion === questions.length - 1
                ? "Lihat Hasil"
                : "Pertanyaan Selanjutnya"}

        </button>

    `;

}

/* =====================================
      5. MEMERIKSA JAWABAN
===================================== */

function checkAnswer(selected) {

    if (answered) return;

    answered = true;

    const q = questions[currentQuestion];

    const buttons =
        document.querySelectorAll(".answer-btn");

    const feedback =
        document.getElementById("feedback");


    // Memeriksa apakah jawaban benar

    if (selected === q.correct) {

        score += 10;

        correctAnswers++;

        feedback.innerHTML =
            "✅ Benar! Jawaban kamu tepat.";

        feedback.style.color = "green";

    }

    else {

        feedback.innerHTML =
            "❌ Salah! Jawaban yang benar adalah " +
            q.answer[q.correct] + ".";

        feedback.style.color = "red";

    }


    // Memberi warna pada jawaban

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === q.correct) {

            button.classList.add("correct");

        }

        else if (index === selected) {

            button.classList.add("wrong");

        }

    });


    // Memperbarui skor

    const scoreDisplay =
        document.querySelector(".quiz-info span:last-child");

    scoreDisplay.textContent = "Skor: " + score;


    // Menampilkan tombol selanjutnya

    document.getElementById("next-btn").hidden = false;

}

/* =====================================
   6. PERTANYAAN SELANJUTNYA
===================================== */

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    }

    else {

        showResult();

    }

}

/* =====================================
   7. MENAMPILKAN HASIL AKHIR
===================================== */

function showResult() {

    const area = document.getElementById("game-area");

    const percentage =
        (correctAnswers / questions.length) * 100;


    let message = "";

    if (percentage === 100) {

        message = "Luar biasa! Semua jawaban kamu benar!";

    }

    else if (percentage >= 70) {

        message = "Hebat! Pengetahuan kamu sangat baik!";

    }

    else if (percentage >= 50) {

        message = "Bagus! Terus tingkatkan kemampuanmu!";

    }

    else {

        message = "Jangan menyerah! Coba bermain lagi!";

    }


    area.innerHTML = `

        <h2>🎉 Quiz Selesai!</h2>

        <p>Hasil permainan kamu:</p>

        <div class="result-score">
            ${score} / 100
        </div>

        <h3>${message}</h3>

        <div class="result-message">

            <p>
                Jumlah soal: ${questions.length}
            </p>

            <p>
                Jawaban benar: ${correctAnswers}
            </p>

            <p>
                Jawaban salah:
                ${questions.length - correctAnswers}
            </p>

            <p>
                Nilai: ${percentage}%
            </p>

        </div>

        <div class="result-buttons">

            <button onclick="startGame('quiz')">
                🔄 Play Again
            </button>

            <button onclick="showMenu()">
                🏠 Kembali ke Menu
            </button>

        </div>

    `;

}


/* =====================================
   8. KEMBALI KE MENU UTAMA
===================================== */

function showMenu() {

    const area = document.getElementById("game-area");

    area.innerHTML = `

        <h2>Selamat Bermain!</h2>

        <p>Pilih salah satu permainan di atas.</p>

    `;

}

/* =====================================
   MEMORY CARD GAME
===================================== */

//1. DATA KARTU
const memoryEmojis =[
    "🦏","🐘","🦧",
    "🐘","🦧","🐗",
    "🐅","🐃","🐅",

    "🐃","🐗","🦏",
    "🦃","🦚","🦅",
    "🦚","🦅","🦃"
]

// 2. VARIABEL MEMORY GAME
let memoryCards = [];
let firstCard = null;
let secondCard = null;
let memoryMoves = 0;
let memoryMatched = 0;
let memoryLocked = false;

// 3. MEMULAI PERMAINAN
function startMemoryGame() {
    const area = document.getElementById("game-area");

    memoryCards = [...memoryEmojis];

    // Mengacak posisi kartu
    memoryCards.sort(() => Math.random() - 0.5);

    firstCard = null;
    secondCard = null;
    memoryMoves = 0;
    memoryMatched = 0;
    memoryLocked = false;

    area.innerHTML = `
        <h2>🃏 Memory Card</h2>

        <p>
            Temukan semua pasangan kartu yang sama!
        </p>

        <div class="memory-info">
            <span>Percobaan: <span id="moves">0</span></span>
            <span>Pasangan: <span id="matched">0</span> / 9</span>
        </div>

        <div class="memory-grid" id="memory-grid"></div>

        <button onclick="startMemoryGame()">
            🔄 Ulangi Permainan
        </button>

        <button onclick="showMenu()">
            🏠 Menu Utama
        </button>
    `;

    renderMemoryCards();
}

// 4. MENAMPILKAN KARTU
function renderMemoryCards() {
    const grid = document.getElementById("memory-grid");

    grid.innerHTML = "";

    memoryCards.forEach((emoji, index) => {
        grid.innerHTML += `
            <button
                class="memory-card"
                id="card-${index}"
                onclick="flipMemoryCard(${index})">
                ❓
            </button>
        `;
    });
}

// 5. MEMBUKA KARTU
function flipMemoryCard(index) {

    if (memoryLocked) return;

    const card = document.getElementById("card-" + index);

    // Mencegah membuka kartu yang sama
    if (card.classList.contains("flipped")) return;
    if (card.classList.contains("matched")) return;

    // Membuka kartu
    card.textContent = memoryCards[index];
    card.classList.add("flipped");

    // Kartu pertama
    if (firstCard === null) {
        firstCard = index;
        return;
    }

    // Kartu kedua
    secondCard = index;
    memoryMoves++;

    document.getElementById("moves").textContent = memoryMoves;

    // Memeriksa pasangan
    checkMemoryMatch();
}

// 6. MEMERIKSA PASANGAN KARTU
function checkMemoryMatch() {

    const card1 = document.getElementById("card-" + firstCard);
    const card2 = document.getElementById("card-" + secondCard);

    if (memoryCards[firstCard] === memoryCards[secondCard]) {

        // Jika kartu sama
        card1.classList.add("matched");
        card2.classList.add("matched");

        memoryMatched++;

        document.getElementById("matched").textContent = memoryMatched;

        firstCard = null;
        secondCard = null;

        // Memeriksa apakah semua pasangan sudah ditemukan
        if (memoryMatched === 9) {
            showMemoryResult();
        }

    } else {

        // Jika kartu berbeda
        memoryLocked = true;

        setTimeout(() => {

            card1.textContent = "❓";
            card2.textContent = "❓";

            card1.classList.remove("flipped");
            card2.classList.remove("flipped");

            firstCard = null;
            secondCard = null;

            memoryLocked = false;

        }, 1000);
    }
}

// 7. HASIL PERMAINAN
function showMemoryResult() {
    const area = document.getElementById("game-area");

    area.innerHTML = `
        <h2>🎉 Selamat!</h2>

        <h3>Kamu berhasil menemukan semua pasangan!</h3>

        <div class="result-score">
            ${memoryMoves}
        </div>

        <p>Jumlah percobaan kamu.</p>

        <button onclick="startMemoryGame()">
            🔄 Main Lagi
        </button>

        <button onclick="showMenu()">
            🏠 Menu Utama
        </button>
    `;
}

/* =====================================
   WORD GUESS GAME
===================================== */

// 1. DATA PERTANYAAN
const wordQuestions = [
    {
        clue: "Pohon penghasil kayu harum yang banyak ditemukan di Nusa Tenggara Timur",
        answer: "CENDANA"
    },
    {
        clue: "Tumbuhan paku berukuran besar yang memiliki batang tegak seperti pohon",
        answer: "PAKISTIANG"
    },
    {
        clue: "Pohon khas Kalimantan yang dikenal memiliki kayu sangat kuat",
        answer: "ULIN"
    },
    {
        clue: "Pohon penghasil kayu yang banyak ditemukan di hutan tropis Indonesia",
        answer: "MERANTI"
    },
    {
        clue: "Bunga putih yang dikenal sebagai bunga abadi dan tumbuh di pegunungan",
        answer: "EDELWEISSJAWA"
    },
    {
        clue: "Bunga nasional Indonesia yang memiliki warna putih dan bentuk indah",
        answer: "ANGGREKBULAN"
    },
    {
        clue: "Anggrek khas Kalimantan yang memiliki warna bunga gelap",
        answer: "ANGGREKHITAM"
    },
    {
        clue: "Bunga nasional Indonesia yang terkenal dengan aroma harumnya",
        answer: "MELATI"
    },
    {
        clue: "Bunga berukuran sangat besar yang terkenal sebagai bunga terbesar di dunia",
        answer: "RAFFLESIA"
    },
    {
        clue: "Tumbuhan karnivora yang memiliki kantong untuk menangkap serangga",
        answer: "KANTONGSEMAR"
    }
];

// 2. VARIABEL GAME
let wordCurrentQuestion = 0;
let wordScore = 0;
let wordCorrect = 0;
let selectedLetters = [];
let shuffledLetters = [];
let wordAnswered = false;

// 3. MENGACAK HURUF
function shuffleWord(word) {
    let letters = word.split("");
    let shuffled;

    do {
        shuffled = [...letters];

        for (let i = shuffled.length - 1; i > 0; i--) {
            let randomIndex = Math.floor(
                Math.random() * (i + 1)
            );

            [shuffled[i], shuffled[randomIndex]] =
                [shuffled[randomIndex], shuffled[i]];
        }
    } while (shuffled.join("") === word && word.length > 1);

    return shuffled;

}

// 4. MEMULAI GAME
function startWordGame() {
    wordCurrentQuestion = 0;
    wordScore = 0;
    wordCorrect = 0;

    showWordQuestion();
}

// 5. MENAMPILKAN SOAL
function showWordQuestion() {
    const area = document.getElementById("game-area");
    const q = wordQuestions[wordCurrentQuestion];

    selectedLetters = [];
    shuffledLetters = shuffleWord(q.answer);
    wordAnswered = false;

    let letterButtons = "";

    shuffledLetters.forEach((letter, index) => {
        letterButtons += `
            <button
                class="letter-btn"
                id="letter-${index}"
                onclick="selectLetter(${index})">
                ${letter}
            </button>
        `;
    });

    area.innerHTML = `
        <div class="word-game">

            <h2>🌿 Word Scramble</h2>
            <p class="word-subtitle">Flora Indonesia</p>

            <div class="word-info">
                <span>
                    Soal ${wordCurrentQuestion + 1}
                    / ${wordQuestions.length}
                </span>

                <span>⭐ Skor: ${wordScore}</span>
            </div>

            <div class="word-progress">
                <div class="word-progress-fill"
                    style="width: ${
                        ((wordCurrentQuestion + 1) /
                        wordQuestions.length) * 100
                    }%">
                </div>
            </div>

            <div class="word-clue">
                <h3>🌱 Petunjuk</h3>
                <p>${q.clue}</p>
            </div>

            <h3 class="word-instruction">
                Susun huruf berikut menjadi nama flora yang benar!
            </h3>

            <div class="letter-container">
                ${letterButtons}
            </div>

            <h3 class="answer-title">Jawaban kamu:</h3>

            <div class="answer-slots" id="answer-slots">
                <p class="empty-answer">
                    Klik huruf di atas!
                </p>
            </div>

            <p id="word-feedback"></p>

            <div class="word-buttons">
                <button
                    class="word-clear-btn"
                    onclick="clearWordAnswer()">
                    ↩ Hapus
                </button>

                <button
                    class="word-check-btn"
                    onclick="checkWordAnswer()">
                    ✓ Periksa
                </button>
            </div>

            <button
                class="word-next-btn"
                id="word-next"
                onclick="nextWordQuestion()"
                hidden>
                Pertanyaan Selanjutnya →
            </button>

        </div>
    `;
}

// 6. MEMILIH HURUF
function selectLetter(index) {
    if (wordAnswered) return;
    if (selectedLetters.includes(index)) return;

    selectedLetters.push(index);

    renderSelectedLetters();

    document.getElementById(
        "letter-" + index
    ).disabled = true;
}

// 7. MENAMPILKAN SUSUNAN JAWABAN
function renderSelectedLetters() {
    const slots = document.getElementById("answer-slots");

    if (selectedLetters.length === 0) {
        slots.innerHTML = `
            <p class="empty-answer">
                Klik huruf di atas!
            </p>
        `;
        return;
    }

    let answerHTML = "";

    selectedLetters.forEach(index => {
        answerHTML += `
            <span class="selected-letter">
                ${shuffledLetters[index]}
            </span>
        `;
    });

    slots.innerHTML = answerHTML;
}

// 8. MENGHAPUS SUSUNAN JAWABAN
function clearWordAnswer() {
    if (wordAnswered) return;

    selectedLetters = [];

    shuffledLetters.forEach((letter, index) => {
        document.getElementById(
            "letter-" + index
        ).disabled = false;
    });

    renderSelectedLetters();

    document.getElementById(
        "word-feedback"
    ).textContent = "";
}

// 9. MEMERIKSA JAWABAN
function checkWordAnswer() {
    if (wordAnswered) return;

    const q = wordQuestions[wordCurrentQuestion];

    const feedback = document.getElementById(
        "word-feedback"
    );

    const playerAnswer = selectedLetters
        .map(index => shuffledLetters[index])
        .join("");

    if (selectedLetters.length !== q.answer.length) {
        feedback.textContent =
            "⚠️ Pilih semua huruf terlebih dahulu!";

        feedback.style.color = "#d97706";
        return;
    }

    if (playerAnswer === q.answer) {
        wordScore += 10;
        wordCorrect++;
        wordAnswered = true;

        feedback.textContent =
            "🎉 Benar! Jawaban kamu tepat!";

        feedback.style.color = "#15803d";

        shuffledLetters.forEach((letter, index) => {
            document.getElementById(
                "letter-" + index
            ).disabled = true;
        });

        document.getElementById(
            "word-next"
        ).hidden = false;

    } else {
        feedback.textContent =
            "❌ Belum tepat! Coba susun ulang hurufnya.";

        feedback.style.color = "#dc2626";
    }
}

// 10. SOAL SELANJUTNYA
function nextWordQuestion() {
    wordCurrentQuestion++;

    if (wordCurrentQuestion < wordQuestions.length) {
        showWordQuestion();
    } else {
        showWordResult();
    }
}

// 11. HASIL AKHIR
function showWordResult() {
    const area = document.getElementById("game-area");

    const totalQuestions = wordQuestions.length;

    const percentage =
        (wordCorrect / totalQuestions) * 100;

    const wrongAnswers = totalQuestions - wordCorrect;

    let message = "";

    if (percentage === 100) {
        message = "Luar biasa! Semua flora berhasil kamu tebak!";
    } else if (percentage >= 70) {
        message = "Hebat! Pengetahuan floramu sangat bagus!";
    } else if (percentage >= 50) {
        message = "Bagus! Terus belajar mengenal flora Indonesia!";
    } else {
        message = "Jangan menyerah! Ayo coba lagi!";
    }

    area.innerHTML = `
        <div class="word-game word-result">

            <h2>🎉 Permainan Selesai!</h2>

            <p class="word-subtitle">
                Word Scramble - Flora Indonesia
            </p>

            <h3 class="result-message-title">
                ${message}
            </h3>

            <div class="result-score">
                ${wordScore} / ${totalQuestions * 10}
            </div>

            <div class="result-message">
                <p>📚 Jumlah soal: ${totalQuestions}</p>
                <p>✅ Jawaban benar: ${wordCorrect}</p>
                <p>❌ Jawaban salah: ${wrongAnswers}</p>
                <p>⭐ Nilai: ${percentage}%</p>
            </div>

            <div class="result-buttons">

                <button
                    class="word-replay-btn"
                    onclick="startWordGame()">
                    🔄 Main Lagi
                </button>

                <button
                    class="word-menu-btn"
                    onclick="showMenu()">
                    🏠 Menu Utama
                </button>

            </div>

        </div>
    `;
}