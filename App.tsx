
import React, { useState, useCallback } from 'react';
import { SPREADS, TAROT_DECK } from './constants';
import type { Spread, DrawnCard } from './types';
import { getTarotReading } from './geminiService';
import Header from './Header';
import SpreadSelector from './SpreadSelector';
import CardGrid from './CardGrid';
import Interpretation from './Interpretation';
import LoadingSpinner from './LoadingSpinner';

const App: React.FC = () => {
    const [selectedSpread, setSelectedSpread] = useState<Spread>(SPREADS[0]);
    const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
    const [interpretation, setInterpretation] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [cardsRevealed, setCardsRevealed] = useState<boolean>(false);

    const handleDrawCards = useCallback(async () => {
        setIsLoading(true);
        setDrawnCards([]);
        setInterpretation('');
        setError('');
        setCardsRevealed(false);

        // A little delay to show the card backs before flipping
        setTimeout(() => {
            const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
            const newDrawnCards = shuffled.slice(0, selectedSpread.cardCount).map(card => ({
                card,
                isReversed: Math.random() < 0.3, // 30% chance of being reversed
            }));
            setDrawnCards(newDrawnCards);

            (async () => {
                try {
                    const reading = await getTarotReading(newDrawnCards, selectedSpread, question);
                    setInterpretation(reading);
                } catch (e: any) {
                    console.error(e);
                    setError('Wystąpił błąd podczas generowania interpretacji. Spróbuj ponownie.');
                } finally {
                    setIsLoading(false);
                    // Reveal cards after fetching interpretation
                    setTimeout(() => setCardsRevealed(true), 100); 
                }
            })();
        }, 500);
    }, [selectedSpread, question]);

    return (
        <div className="min-h-screen bg-stone-950 text-stone-200 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]">
            <div className="container mx-auto px-4 py-8">
                <Header />
                
                <main className="mt-8">
                    <section id="controls" className="max-w-4xl mx-auto p-6 bg-stone-900/50 rounded-lg shadow-2xl shadow-purple-900/20 border border-purple-800/20 backdrop-blur-sm">
                        <h2 className="text-xl font-cinzel text-purple-300 mb-4 text-center">1. Wybierz rozkład kart</h2>
                        <SpreadSelector spreads={SPREADS} selectedSpread={selectedSpread} onSelectSpread={setSelectedSpread} />
                        
                        <h2 className="text-xl font-cinzel text-purple-300 mt-6 mb-4 text-center">2. Skup się na swoim pytaniu (opcjonalnie)</h2>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Wpisz swoje pytanie tutaj..."
                            className="w-full p-3 bg-stone-800/70 border border-purple-600/30 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all text-stone-200 placeholder-stone-400"
                        />

                        <div className="text-center mt-8">
                            <button
                                onClick={handleDrawCards}
                                disabled={isLoading}
                                className="font-cinzel text-lg bg-purple-700 hover:bg-purple-600 disabled:bg-stone-600 text-white font-bold py-3 px-12 rounded-lg shadow-lg shadow-purple-900/50 transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:shadow-none"
                            >
                                {isLoading ? 'Mieszanie kart...' : 'Pociągnij karty'}
                            </button>
                        </div>
                    </section>
                    
                    {isLoading && drawnCards.length === 0 && <div className="flex justify-center my-10"><LoadingSpinner /></div>}

                    {drawnCards.length > 0 && (
                        <section id="reading" className="mt-12">
                            <CardGrid drawnCards={drawnCards} spread={selectedSpread} revealed={cardsRevealed} />
                            
                            {isLoading && !interpretation && (
                                <div className="flex justify-center my-10"><LoadingSpinner /></div>
                            )}

                            {error && <p className="text-center text-red-400 mt-8">{error}</p>}
                            
                            {interpretation && (
                                <Interpretation text={interpretation} />
                            )}
                        </section>
                    )}
                </main>
            </div>
        </div>
    );
};

export default App;