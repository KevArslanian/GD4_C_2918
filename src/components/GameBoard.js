import React from 'react';
import Card from './Card';

// Komponen untuk menampilkan grid kartu memori
// Grid selalu 4 kolom untuk semua tingkat kesulitan
// props:
// - cards: array berisi objek-objek kartu
// - flippedCards: array berisi id kartu yang sedang terbuka
// - matchedCards: array berisi id kartu yang sudah berhasil dicocokkan
// - onFlip: fungsi untuk membalik kartu
function GameBoard({ cards, flippedCards, matchedCards, onFlip }) {
  return (
    // Grid container 4 kolom untuk menampilkan kartu
    // Menggunakan inline style untuk grid agar kompatibel dengan Tailwind v4
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', justifyItems: 'center' }}
    >
      {cards.map((card, index) => (
        // Render komponen Card untuk setiap kartu dengan animasi fade-in bertahap
        // isFlipped: cek apakah id kartu ada di array flippedCards
        // isMatched: cek apakah id kartu ada di array matchedCards
        <div
          key={card.id}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <Card
            card={card}
            isFlipped={flippedCards.includes(card.id)}
            isMatched={matchedCards.includes(card.id)}
            onFlip={onFlip}
          />
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
