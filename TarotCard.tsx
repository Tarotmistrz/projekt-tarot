
import React from 'react';
import type { DrawnCard } from './types';
import { CARD_BACK_URL } from './constants';

interface TarotCardProps {
    drawnCard: DrawnCard;
    revealed: boolean;
}

const TarotCard: React.FC<TarotCardProps> = ({ drawnCard, revealed }) => {
    const { card, isReversed } = drawnCard;

    return (
        <div className="w-[150px] h-[255px] md:w-[180px] md:h-[306px]" style={{ perspective: '1000px' }}>
            <div
                className="relative w-full h-full transition-transform duration-1000"
                style={{
                    transformStyle: 'preserve-3d',
                    transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                {/* Card Back */}
                <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                    <img
                        src={CARD_BACK_URL}
                        alt="Tył karty tarota"
                        className="w-full h-full object-cover rounded-lg shadow-lg shadow-black"
                    />
                </div>
                {/* Card Front */}
                <div
                    className="absolute w-full h-full"
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    <img
                        src={card.imgSrc}
                        alt={card.name}
                        className={`w-full h-full object-cover rounded-lg shadow-lg shadow-purple-900/50 transition-transform duration-500 ${isReversed ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default TarotCard;