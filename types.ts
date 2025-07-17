
export interface TarotCard {
    name: string;
    imgSrc: string;
}

export interface DrawnCard {
    card: TarotCard;
    isReversed: boolean;
}

export interface Spread {
    name: string;
    cardCount: number;
    positions: string[];
}
