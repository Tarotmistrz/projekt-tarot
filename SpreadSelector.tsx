
import React from 'react';
import type { Spread } from './types';

interface SpreadSelectorProps {
    spreads: Spread[];
    selectedSpread: Spread;
    onSelectSpread: (spread: Spread) => void;
}

const SpreadSelector: React.FC<SpreadSelectorProps> = ({ spreads, selectedSpread, onSelectSpread }) => {
    return (
        <div className="flex flex-wrap justify-center gap-3">
            {spreads.map(spread => (
                <button
                    key={spread.name}
                    onClick={() => onSelectSpread(spread)}
                    className={`px-5 py-2 text-sm font-medium rounded-md transition-all duration-200 border-2 ${
                        selectedSpread.name === spread.name
                            ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-800/40'
                            : 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-700 hover:border-purple-500'
                    }`}
                >
                    {spread.name}
                </button>
            ))}
        </div>
    );
};

export default SpreadSelector;