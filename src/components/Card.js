import React from 'react';
import { FaQuestion } from 'react-icons/fa';

// Komponen untuk menampilkan satu kartu memori dengan animasi flip 3D
// props:
// - card: objek yang berisi informasi kartu (id, icon, color, pairId)
// - isFlipped: boolean apakah kartu sedang terbuka
// - isMatched: boolean apakah kartu sudah berhasil dicocokkan
// - onFlip: fungsi yang dipanggil ketika kartu diklik
function Card({ card, isFlipped, isMatched, onFlip }) {
  // Handler ketika kartu diklik
  // Hanya bisa diklik jika kartu belum terbuka dan belum matched
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(card.id);
    }
  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  return (
    <div
      onClick={handleClick}
      className={`w-20 h-20 flex items-center justify-center text-3xl rounded-xl cursor-pointer select-none
      transition-all duration-500 transform perspective-500
      ${isOpen
        ? 'bg-white/95 shadow-lg shadow-white/20 scale-100 rotate-0'
        : 'bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700 shadow-md hover:scale-110 hover:shadow-xl hover:shadow-purple-500/40 hover:from-purple-500 hover:via-indigo-500 hover:to-purple-600'
      }
      ${isMatched ? 'animate-matched ring-2 ring-green-400/70 opacity-90' : ''}
      ${!isOpen ? 'hover:rotate-3' : ''}`}
    >
      {/* Tampilkan icon jika kartu terbuka atau sudah cocok, tampilkan ? jika tertutup */}
      {isOpen ? (
        <span className="animate-card-flip">
          <IconComponent style={{ color: card.color }} />
        </span>
      ) : (
        <FaQuestion className="text-white/50 text-xl transition-all duration-300 hover:text-white/80" />
      )}
    </div>
  );
}

export default Card;
