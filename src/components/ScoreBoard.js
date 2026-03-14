import React from 'react';
import { FaCheck, FaSyncAlt, FaRedo, FaMousePointer } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

// Komponen untuk menampilkan skor permainan, timer, dan tombol reset
// props:
// - moves: jumlah percobaan yang sudah dilakukan
// - matchedCount: jumlah pasangan yang sudah berhasil dicocokkan
// - totalPairs: total pasangan kartu yang harus dicocokkan
// - timer: waktu bermain dalam detik
// - onReset: fungsi untuk mereset permainan
function ScoreBoard({ moves, matchedCount, totalPairs, timer, onReset }) {
  // Cek apakah semua pasangan sudah ditemukan
  const isGameComplete = matchedCount === totalPairs && totalPairs > 0;

  // Format timer dari detik menjadi format menit:detik (m:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center mb-6 w-full max-w-md">
      {/* Tampilkan waktu, jumlah percobaan, dan pasangan yang ditemukan */}
      <div className="flex justify-center gap-4 mb-5">
        {/* Kotak Waktu (Timer) */}
        <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl">
          <p className="text-xs font-medium text-indigo-300 uppercase tracking-wider flex items-center justify-center gap-1">
            <IoMdTime className="text-indigo-400" /> Waktu
          </p>
          <p className="text-2xl font-bold text-white mt-1">{formatTime(timer)}</p>
        </div>

        {/* Kotak Percobaan */}
        <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl">
          <p className="text-xs font-medium text-indigo-300 uppercase tracking-wider flex items-center justify-center gap-1">
            <FaMousePointer className="text-indigo-400" /> Percobaan
          </p>
          <p className="text-2xl font-bold text-white mt-1">{moves}</p>
        </div>

        {/* Kotak Ditemukan */}
        <div className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl">
          <p className="text-xs font-medium text-indigo-300 uppercase tracking-wider flex items-center justify-center gap-1">
            <FaCheck className="text-indigo-400" /> Ditemukan
          </p>
          <p className="text-2xl font-bold text-white mt-1">{matchedCount}/{totalPairs}</p>
        </div>
      </div>

      {/* Pesan selamat jika semua pasangan ditemukan */}
      {isGameComplete && (
        <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-400/30 rounded-2xl px-4 py-3 mb-4 backdrop-blur-sm">
          <p className="text-yellow-200 font-bold text-lg animate-pulse">
            🎉 Selamat! Selesai dalam waktu {formatTime(timer)} dengan {moves} percobaan!
          </p>
        </div>
      )}

      {/* Tombol untuk mereset permainan */}
      <button
        onClick={onReset}
        className="px-8 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-400 text-indigo-950 font-bold rounded-full hover:from-yellow-300 hover:to-amber-300 transition-all duration-200 shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-400/30 hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto cursor-pointer"
      >
        {isGameComplete ? <FaRedo /> : <FaSyncAlt />}
        {isGameComplete ? 'Main Lagi' : 'Acak Ulang'}
      </button>
    </div>
  );
}

export default ScoreBoard;
