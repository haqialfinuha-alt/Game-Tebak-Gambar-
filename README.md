# Game-Tebak-Gambar-// Data soal game (contoh gambar menggunakan URL bebas, bisa diganti sesuai kebutuhan)
const questions = [
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Bitmap_umbrella.png",
        choices: ["Payung", "Topi", "Meja", "Bola"],
        answer: "Payung"
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Fruit_salad_in_white_bowl.jpg",
        choices: ["Nasi Goreng", "Salad Buah", "Bakso", "Sate"],
        answer: "Salad Buah"
    },
    {
        image: "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cat.jpg",
        choices: ["Anjing", "Kucing", "Ayam", "Burung"],
        answer: "Kucing"
    }
];

// Variabel game
let currentQuestion = 0;
let score = 0;

// Element DOM
const imageElem = document.getElementById('question-image');
const choicesArea = document.getElementById('choices-area');
const feedbackMsg = document.getElementById('feedback-message');
const scoreDisplay = document.getElementById('score-display');
const qIndexDisplay = document.getElementById('q-index-display');
const nextBtn = document.getElementById('next-button');

// Tampilkan soal pertama saat halaman dimuat
window.onload = function() {
    showQuestion();
};

// Fungsi menampilkan soal saat ini
function showQuestion() {
    // Reset feedback dan tombol
    feedbackMsg.textContent = "";
    nextBtn.style.display = "none";

    const q = questions[currentQuestion];
    imageElem.src = q.image;
    imageElem.alt = "Gambar " + (currentQuestion + 1);

    // Tampilkan pilihan
    choicesArea.innerHTML = "";
    q.choices.forEach((choiceText) => {
        const btn = document.createElement("button");
        btn.textContent = choiceText;
        btn.onclick = function() { selectAnswer(choiceText); };
        choicesArea.appendChild(btn);
    });

    // Update skor dan nomor soal
    scoreDisplay.textContent = score;
    qIndexDisplay.textContent = currentQuestion + 1;
}

// Fungsi memilih jawaban
function selectAnswer(selected) {
    const correct = questions[currentQuestion].answer;
    if (selected === correct) {
        feedbackMsg.textContent = "✅ Benar!";
        score += 1;
    } else {
        feedbackMsg.textContent = `❌ Salah. Jawaban yang benar: ${correct}`;
    }

    // Matikan semua tombol pilihan setelah menjawab
    const buttons = choicesArea.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);

    // Tampilkan tombol next jika belum soal terakhir
    nextBtn.style.display = (currentQuestion < questions.length - 1) ? "inline-block" : "none";

    // Jika selesai, ganti pesan pada next
    if (currentQuestion >= questions.length - 1) {
        nextBtn.textContent = "Lihat Skor Akhir";
        nextBtn.style.display = "inline-block";
    }
}

// Fungsi tombol soal selanjutnya
nextBtn.onclick = function() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showEndScreen();
    }
};

// Fungsi akhir game
function showEndScreen() {
    imageElem.style.display = "none";
    choicesArea.innerHTML = "";
    feedbackMsg.innerHTML = `<strong>Permainan selesai!</strong><br>Skor akhir Anda: <span style="font-size: 1.3em;">${score} / ${questions.length}</span>`;
    nextBtn.style.display = "none";
}
