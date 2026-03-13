'use client';
// Import React dan hooks untuk mengelola state dan side effects
import React, { useState, useEffect, useRef } from 'react';
// Import komponen-komponen yang dibutuhkan
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import DifficultySelector from '../components/DifficultySelector';
// Import react-icons
import { GiCardJoker } from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaGem, FaBolt, FaCrown, FaSnowflake } from 'react-icons/fa';

// Daftar lengkap icon untuk semua tingkat kesulitan (8 pasang = 16 kartu maksimal)
// Easy menggunakan 4 icon pertama, Medium 6 icon, Hard semua 8 icon
const ALL_ICONS = [
  { icon: FaAppleAlt, color: '#ef4444' },
  { icon: FaLemon, color: '#eab308' },
  { icon: FaHeart, color: '#ec4899' },
  { icon: FaStar, color: '#f97316' },
  { icon: FaGem, color: '#06b6d4' },
  { icon: FaBolt, color: '#a855f7' },
  { icon: FaCrown, color: '#f59e0b' },
  { icon: FaSnowflake, color: '#3b82f6' },
];

// Jumlah pasangan per tingkat kesulitan
const DIFFICULTY_PAIRS = {
  easy: 4,
  medium: 6,
  hard: 8,
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

// Fungsi untuk membuat set kartu baru berdasarkan jumlah pasangan
// Mengambil icon sesuai jumlah pairs, menggandakan, lalu mengacak
const createCards = (pairs) => {
  const icons = ALL_ICONS.slice(0, pairs);
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
  const totalPairs = DIFFICULTY_PAIRS[difficulty];

  // useEffect untuk inisialisasi kartu saat komponen pertama kali dirender
  // atau saat difficulty berubah
  useEffect(() => {
    setCards(createCards(totalPairs));
  }, [totalPairs]);

  // useEffect untuk menjalankan timer setiap detik saat isPlaying = true
  // Timer berjalan otomatis saat pemain mulai membalik kartu pertama
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
    // Mulai timer saat kartu pertama dibalik
    if (!isPlaying && matchedCards.length === 0 && moves === 0) {
      setIsPlaying(true);
    }

    // Hanya izinkan membalik jika kurang dari 2 kartu terbuka
    // dan kartu yang diklik bukan kartu yang sudah terbuka
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards(prev => [...prev, id]);
    }
  };

  // Fungsi untuk mereset permainan ke kondisi awal
  const resetGame = () => {
    setCards(createCards(totalPairs));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Fungsi untuk mengubah tingkat kesulitan
  // Saat difficulty berubah, permainan akan direset otomatis
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  return (
    // Container utama dengan background gradient gelap dan tinggi minimal sesuai viewport
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Judul aplikasi dengan efek gradient text */}
        <h1 className="text-5xl font-bold mb-5 flex items-center gap-3">
          <GiCardJoker className="text-yellow-400 text-5xl drop-shadow-lg" />
          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-lg">
            Memory Card
          </span>
        </h1>

        {/* Komponen DifficultySelector untuk memilih tingkat kesulitan */}
        <DifficultySelector
          difficulty={difficulty}
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
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl
        transition-all duration-500 hover:shadow-purple-500/10 hover:border-white/20">
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
