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
      className="w-22 h-22 cursor-pointer select-none"
      style={{ perspective: '600px' }}
    >
      {/* Inner card container dengan 3D transform */}
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {/* Sisi depan kartu (tanda tanya) */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-purple-500 to-indigo-500 border border-white/40 shadow-lg shadow-purple-400/40 hover:shadow-xl hover:shadow-fuchsia-400/50 ${!isOpen ? 'hover:scale-105' : ''} transition-transform duration-200`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <FaQuestion className="text-white/80 text-2xl drop-shadow-md" />
        </div>

        {/* Sisi belakang kartu (icon) */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-2xl bg-white/95 shadow-lg shadow-white/20 border border-white/30 ${isMatched ? 'animate-glow ring-2 ring-green-400/60 opacity-80' : ''}`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <IconComponent className="text-4xl" style={{ color: card.color }} />
        </div>
      </div>
    </div>
  );
}

export default Card;
