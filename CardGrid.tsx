
import React from 'react';
import type { DrawnCard, Spread } from './types';
import TarotCard from './TarotCard';

interface CardGridProps {
    drawnCards: DrawnCard[];
    spread: Spread;
    revealed: boolean;
}

const CardGrid: React.FC<CardGridProps> = ({ drawnCards, spread, revealed }) => {
    return (
        <div className="mt-12 flex flex-col items-center">
             <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12 justify-center items-start">
                {drawnCards.map((drawnCard, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <TarotCard drawnCard={drawnCard} revealed={revealed} />
                        <div className="mt-4 transition-opacity duration-500" style={{ opacity: revealed ? 1 : 0 }}>
                            <h3 className="font-cinzel text-amber-200">{drawnCard.card.name}</h3>
                            <p className="text-sm text-purple-300/80">{spread.positions[index]}</p>
                            {drawnCard.isReversed && <p className="text-xs text-stone-400">(Odwrócona)</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardGrid;