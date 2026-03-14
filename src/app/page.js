'use client';
// Import React dan hooks untuk mengelola state dan side effects
import React, { useState, useEffect, useRef } from 'react';
// Import komponen-komponen yang dibutuhkan
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import DifficultySelector from '../components/DifficultySelector';
// Import react-icons
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { FaApple, FaLemon, FaHeart, FaStar, FaGem, FaBolt, FaFire, FaMoon } from 'react-icons/fa';

// Daftar icon untuk setiap tingkat kesulitan
// Easy menggunakan 4 icon pertama, Medium 6 icon, Hard semua 8 icon
const DIFFICULTY_ICONS = {
  easy: [
    { icon: FaApple, color: '#ef4444' },
    { icon: FaLemon, color: '#eab308' },
    { icon: FaHeart, color: '#ec4899' },
    { icon: FaStar, color: '#f97316' },
  ],
  medium: [
    { icon: FaApple, color: '#ef4444' },
    { icon: FaLemon, color: '#eab308' },
    { icon: FaHeart, color: '#ec4899' },
    { icon: FaStar, color: '#f97316' },
    { icon: FaBolt, color: '#3b82f6' },
    { icon: FaGem, color: '#8b5cf6' },
  ],
  hard: [
    { icon: FaApple, color: '#ef4444' },
    { icon: FaLemon, color: '#eab308' },
    { icon: FaHeart, color: '#ec4899' },
    { icon: FaStar, color: '#f97316' },
    { icon: FaBolt, color: '#3b82f6' },
    { icon: FaGem, color: '#8b5cf6' },
    { icon: FaFire, color: '#f59e0b' },
    { icon: FaMoon, color: '#6366f1' },
  ],
};

// Fungsi untuk mengacak urutan array menggunakan algoritma Fisher-Yates
// Menerima parameter 'array' dan mengembalikan array yang sudah diacak
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Fungsi untuk membuat set kartu baru berdasarkan tingkat kesulitan
// Mengambil icon sesuai difficulty, menggandakan, lalu mengacak
const createCards = (icons) => {
  const paired = icons.flatMap((item, index) => [
    { id: index * 2, icon: item.icon, color: item.color, pairId: index },
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
  ]);
  return shuffleArray(paired);
};

export default function Home() {
  // State 'difficulty' menyimpan tingkat kesulitan yang dipilih
  const [difficulty, setDifficulty] = useState('easy');

  // State 'cards' menyimpan array kartu yang sudah diacak
  const [cards, setCards] = useState([]);

  // State 'flippedCards' menyimpan id kartu yang sedang terbuka (maks 2)
  const [flippedCards, setFlippedCards] = useState([]);

  // State 'matchedCards' menyimpan id kartu yang sudah berhasil dicocokkan
  const [matchedCards, setMatchedCards] = useState([]);

  // State 'moves' menyimpan jumlah percobaan yang dilakukan pemain
  const [moves, setMoves] = useState(0);

  // State 'timer' menyimpan waktu bermain dalam detik
  const [timer, setTimer] = useState(0);

  // State 'isPlaying' menandakan apakah permainan sedang berjalan (timer aktif)
  const [isPlaying, setIsPlaying] = useState(false);

  // useRef untuk menyimpan referensi interval timer agar bisa di-clear
  const timerRef = useRef(null);

  // Jumlah pasangan berdasarkan difficulty yang dipilih
  const icons = DIFFICULTY_ICONS[difficulty];
  const totalPairs = icons.length;

  // useEffect untuk inisialisasi kartu saat komponen pertama kali dirender
  // atau saat difficulty berubah
  useEffect(() => {
    setCards(createCards(icons));
    // Timer dimulai otomatis saat difficulty berubah sesuai referensi
    setTimer(0);
    setMoves(0);
    setMatchedCards([]);
    setFlippedCards([]);
    // Reset isPlaying to trigger timer restart
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 0);
  }, [difficulty]);

  // useEffect untuk menjalankan timer setiap detik
  // Timer berjalan otomatis saat halaman dimuat sesuai referensi
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    // Cleanup: hentikan interval saat isPlaying berubah atau komponen unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying]);

  // useEffect untuk mengecek kecocokan setiap kali 2 kartu terbuka
  useEffect(() => {
    // Hanya cek jika sudah ada 2 kartu terbuka
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      // Tambah jumlah percobaan setiap kali 2 kartu dibuka
      setMoves(prev => prev + 1);

      // Jika kedua kartu memiliki pairId yang sama, berarti cocok
      if (firstCard.pairId === secondCard.pairId) {
        // Tambahkan kedua kartu ke matchedCards
        const newMatched = [...matchedCards, firstId, secondId];
        setMatchedCards(newMatched);
        setFlippedCards([]);

        // Cek apakah semua pasangan sudah ditemukan, jika ya hentikan timer
        if (newMatched.length === totalPairs * 2) {
          setIsPlaying(false);
        }
      } else {
        // Jika tidak cocok, tutup kembali setelah 800ms
        const flipTimer = setTimeout(() => {
          setFlippedCards([]);
        }, 800);
        return () => clearTimeout(flipTimer);
      }
    }
  }, [flippedCards, cards, matchedCards, totalPairs]);

  // Fungsi untuk membalik kartu ketika diklik
  // Menerima parameter 'id' untuk mengidentifikasi kartu yang diklik
  const handleCardFlip = (id) => {
    // Hanya izinkan membalik jika kurang dari 2 kartu terbuka
    // dan kartu yang diklik bukan kartu yang sudah terbuka
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards(prev => [...prev, id]);
    }
  };

  // Fungsi untuk mereset permainan ke kondisi awal
  const resetGame = () => {
    setCards(createCards(icons));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    // Reset isPlaying untuk restart timer
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 0);
  };

  // Fungsi untuk mengubah tingkat kesulitan
  // Saat difficulty berubah, permainan akan direset otomatis via useEffect
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    // Container utama dengan background gradient gelap dan tinggi minimal sesuai viewport
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 animate-gradient p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-1/3 w-40 h-40 bg-pink-600/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Judul aplikasi dengan efek gradient text dan animasi float */}
        <h1 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 drop-shadow-lg animate-float tracking-tight flex items-center gap-3">
          <GiPerspectiveDiceSixFacesRandom className="text-yellow-300 text-5xl drop-shadow-lg" />
          Memory Card
        </h1>

        {/* Komponen DifficultySelector untuk memilih tingkat kesulitan */}
        <DifficultySelector
          currentDifficulty={difficulty}
          onSelect={handleDifficultyChange}
        />

        {/* Komponen ScoreBoard untuk menampilkan skor dan timer */}
        <ScoreBoard
          moves={moves}
          matchedCount={matchedCards.length / 2}
          totalPairs={totalPairs}
          timer={timer}
          onReset={resetGame}
        />

        {/* Komponen GameBoard untuk menampilkan grid kartu */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl shadow-purple-900/30">
          <GameBoard
            cards={cards}
            flippedCards={flippedCards}
            matchedCards={matchedCards}
            onFlip={handleCardFlip}
          />
        </div>
      </div>
    </div>
  );
}
