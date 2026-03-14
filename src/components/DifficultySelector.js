import React from 'react';
import { FaSmile, FaMeh, FaUserSecret } from 'react-icons/fa';

// Komponen untuk memilih tingkat kesulitan permainan
// props:
// - currentDifficulty: tingkat kesulitan saat ini ('easy', 'medium', 'hard')
// - onSelect: fungsi yang dipanggil ketika pemain memilih tingkat kesulitan
// Tingkat kesulitan menentukan jumlah pasangan kartu:
// Easy = 4 pasang (8 kartu), Medium = 6 pasang (12 kartu), Hard = 8 pasang (16 kartu)
function DifficultySelector({ currentDifficulty, onSelect }) {
  // Daftar pilihan tingkat kesulitan
  const levels = [
    { key: 'easy', label: 'Easy', pairs: 4, icon: FaSmile },
    { key: 'medium', label: 'Medium', pairs: 6, icon: FaMeh },
    { key: 'hard', label: 'Hard', pairs: 8, icon: FaUserSecret },
  ];

  return (
    <div className="flex gap-3 mb-5">
      {levels.map((level) => {
        // Cek apakah level ini sedang aktif
        const isActive = currentDifficulty === level.key;
        const Icon = level.icon;

        return (
          <button
            key={level.key}
            onClick={() => onSelect(level.key)}
            className={isActive
              ? 'px-5 py-2.5 rounded-full font-bold text-sm bg-gradient-to-r from-yellow-400 to-amber-400 text-indigo-950 shadow-lg shadow-yellow-500/25 scale-105 transition-all duration-200 flex items-center gap-2'
              : 'px-5 py-2.5 rounded-full font-bold text-sm bg-white/10 text-white/80 border border-white/10 hover:bg-white/20 hover:text-white hover:scale-105 transition-all duration-200 backdrop-blur-sm flex items-center gap-2'
            }
          >
            <Icon /> {level.label} ({level.pairs})
          </button>
        );
      })}
    </div>
  );
}

export default DifficultySelector;
