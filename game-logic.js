// A. MODEL (Data Soal)
const questions = [
  {
    image: "https://via.placeholder.com/400x200?text=Kucing", // Ganti dengan URL gambar kucing asli
    answer: "Kucing",
    choices: ["Anjing", "Harimau", "Kucing", "Beruang"],
  },
  {
    image: "https://via.placeholder.com/400x200?text=Mobil", // Ganti dengan URL gambar mobil asli
    answer: "Mobil",
    choices: ["Sepeda", "Bus", "Kapal", "Mobil"],
  },
  {
    image: "https://via.placeholder.com/400x200?text=Bulan", // Ganti dengan URL gambar bulan asli
    answer: "Bulan",
    choices: ["Matahari", "Bintang", "Planet", "Bulan"],
  }
];

// B. STATUS GAME
let currentQuestionIndex = 0;
let score = 0;

// C. UTILITIES (Fungsi untuk Mengacak Array)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// D. CONTROLLER (Logika Utama Game)

// 1. Memuat Soal ke Tampilan (View)
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        // Jika semua soal terjawab, tampilkan hasil akhir
        document.getElementById('game-container').innerHTML = `<h2>Game Selesai!</h2><p>Skor Akhir Anda: ${score} dari ${questions.length}</p>`;
        return;
    }

    const q = questions[currentQuestionIndex];
    
    // Update View: Gambar dan Indeks Soal
    document.getElementById('question-image').src = q.image;
    document.getElementById('q-index-display').textContent = currentQuestionIndex + 1;
    document.getElementById('feedback-message').textContent = '';
    document.getElementById('next-button').style.display = 'none';

    // Update View: Pilihan Jawaban
    const choicesArea = document.getElementById('choices-area');
    choicesArea.innerHTML = '';
    
    // Acak urutan pilihan sebelum ditampilkan
    let shuffledChoices = [...q.choices]; 
    shuffleArray(shuffledChoices);

    shuffledChoices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        // Panggil checkAnswer saat tombol diklik
        button.onclick = () => checkAnswer(choice, q.answer);
        choicesArea.appendChild(button);
    });
}

// 2. Memeriksa Jawaban Pengguna
function checkAnswer(selectedChoice, correctAnswer) {
    let message = '';
    
    // Nonaktifkan semua tombol setelah pemilihan
    document.querySelectorAll('#choices-area button').forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.style.backgroundColor = 'lightgreen'; // Tandai jawaban benar
        } else if (btn.textContent === selectedChoice) {
            btn.style.backgroundColor = 'lightcoral'; // Tandai pilihan salah
        }
    });

    if (selectedChoice === correctAnswer) {
        score++;
        message = '✅ Benar! Jawaban Anda Tepat.';
    } else {
        message = `❌ Salah. Jawaban yang benar adalah: ${correctAnswer}.`;
    }

    // Update View: Feedback dan Skor
    document.getElementById('feedback-message').textContent = message;
    document.getElementById('score-display').textContent = score;
    document.getElementById('next-button').style.display = 'block';
}

// 3. Pindah ke Soal Berikutnya
document.getElementById('next-button').onclick = () => {
    currentQuestionIndex++;
    loadQuestion();
};

// Mulai Game saat halaman dimuat
window.onload = loadQuestion;
