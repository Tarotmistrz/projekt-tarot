import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-amber-200 to-purple-400 pb-2">
                Tarotmistrz Dariusz
            </h1>
            <p className="mt-2 text-stone-400 text-sm md:text-base">
                Osobiste i wnikliwe interpretacje kart Tarota. Pozwól kartom odkryć Twoją ścieżkę.
            </p>
        </header>
    );
};

export default Header;