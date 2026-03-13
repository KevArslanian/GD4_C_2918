import React from 'react';
import { FaSmile, FaMeh, FaFire } from 'react-icons/fa';

// Komponen untuk memilih tingkat kesulitan permainan
// props:
// - difficulty: tingkat kesulitan saat ini ('easy', 'medium', 'hard')
// - onSelect: fungsi yang dipanggil ketika pemain memilih tingkat kesulitan
// Tingkat kesulitan menentukan jumlah pasangan kartu:
// Easy = 4 pasang (8 kartu), Medium = 6 pasang (12 kartu), Hard = 8 pasang (16 kartu)
function DifficultySelector({ difficulty, onSelect }) {
  // Daftar pilihan tingkat kesulitan
  const levels = [
    { key: 'easy', label: 'Easy (4)', icon: FaSmile, pairs: 4 },
    { key: 'medium', label: 'Medium (6)', icon: FaMeh, pairs: 6 },
    { key: 'hard', label: 'Hard (8)', icon: FaFire, pairs: 8 },
  ];

  return (
    <div className="flex gap-3 mb-4">
      {levels.map((level) => {
        // Cek apakah level ini sedang aktif
        const isActive = difficulty === level.key;
        const Icon = level.icon;

        return (
          <button
            key={level.key}
            onClick={() => onSelect(level.key)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm
            transition-all duration-300 cursor-pointer border-2
            ${isActive
              ? 'bg-yellow-400 text-indigo-900 border-yellow-400 shadow-lg shadow-yellow-400/30 scale-105'
              : 'bg-transparent text-gray-300 border-gray-600 hover:border-purple-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className={isActive ? 'text-indigo-900' : 'text-gray-400'} />
            {level.label}
          </button>
        );
      })}
    </div>
  );
}

export default DifficultySelector;
