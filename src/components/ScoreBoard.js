import React from 'react';
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from 'react-icons/fa';

// Komponen untuk menampilkan skor permainan, timer, dan tombol reset
// props:
// - moves: jumlah percobaan yang sudah dilakukan
// - matchedCount: jumlah pasangan yang sudah berhasil dicocokkan
// - totalPairs: total pasangan kartu yang harus dicocokkan
// - timer: waktu bermain dalam detik
// - onReset: fungsi untuk mereset permainan
function ScoreBoard({ moves, matchedCount, totalPairs, timer, onReset }) {
  // Cek apakah semua pasangan sudah ditemukan
  const isGameComplete = matchedCount === totalPairs;

  // Format timer dari detik menjadi format menit:detik (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-center mb-5">
      {/* Tampilkan waktu, jumlah percobaan, dan pasangan yang ditemukan */}
      {/* Timer ditempatkan di samping jumlah percobaan sesuai ketentuan UGD */}
      <div className="flex justify-center gap-4 mb-4">
        {/* Kotak Waktu (Timer) */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl
        transition-all duration-300 hover:bg-white/15 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10">
          <p className="text-xs text-purple-300 flex items-center justify-center gap-1 uppercase tracking-wider font-semibold">
            <FaClock className="text-purple-400" /> Waktu
          </p>
          <p className="text-2xl font-bold text-white mt-1 font-mono">{formatTime(timer)}</p>
        </div>

        {/* Kotak Percobaan - ditempatkan di samping Timer */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl
        transition-all duration-300 hover:bg-white/15 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10">
          <p className="text-xs text-purple-300 flex items-center justify-center gap-1 uppercase tracking-wider font-semibold">
            <FaMousePointer className="text-purple-400" /> Percobaan
          </p>
          <p className="text-2xl font-bold text-white mt-1">{moves}</p>
        </div>

        {/* Kotak Ditemukan */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl
        transition-all duration-300 hover:bg-white/15 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/10">
          <p className="text-xs text-purple-300 flex items-center justify-center gap-1 uppercase tracking-wider font-semibold">
            <FaCheck className="text-green-400" /> Ditemukan
          </p>
          <p className="text-2xl font-bold text-white mt-1">{matchedCount}/{totalPairs}</p>
        </div>
      </div>

      {/* Pesan selamat jika semua pasangan ditemukan */}
      {isGameComplete && (
        <div className="animate-celebrate bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-yellow-500/20
        border border-yellow-500/40 rounded-xl px-6 py-3 mb-4 backdrop-blur-sm">
          <p className="text-yellow-300 font-bold text-lg">
            🎉 Selamat! Selesai dalam waktu {formatTime(timer)} dengan {moves} percobaan!
          </p>
        </div>
      )}

      {/* Tombol untuk mereset permainan */}
      <button
        onClick={onReset}
        className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-indigo-900 font-bold rounded-full
        hover:from-yellow-300 hover:to-amber-400 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105
        transition-all duration-300 flex items-center gap-2 mx-auto cursor-pointer active:scale-95"
      >
        {isGameComplete ? <FaRedo /> : <FaSyncAlt />}
        {isGameComplete ? 'Main Lagi' : 'Acak Ulang'}
      </button>
    </div>
  );
}

export default ScoreBoard;
