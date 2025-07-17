import { GoogleGenAI } from "@google/genai";
import type { DrawnCard, Spread } from './types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getTarotReading(drawnCards: DrawnCard[], spread: Spread, question?: string): Promise<string> {
    const cardList = drawnCards.map((c, index) => 
        `- Pozycja ${index + 1} (${spread.positions[index]}): **${c.card.name}** (${c.isReversed ? 'Odwrócona' : 'Prosta'})`
    ).join('\n');

    const prompt = `
        Jesteś Tarotmistrzem Dariuszem, doświadczonym i mądrym przewodnikiem duchowym. Dajesz wnikliwe, wspierające i jasne interpretacje. Twoim zadaniem jest interpretacja poniższego rozkładu kart tarota.
        Pisz w sposób empatyczny, autorytatywny i pełen mądrości. Mów bezpośrednio do użytkownika. Unikaj ogólników. Skup się na tym, jak karty odnoszą się do siebie nawzajem w kontekście ich pozycji w rozkładzie.

        **Kontekst Rozkładu:**
        - **Nazwa Rozkładu:** ${spread.name}
        - **Pytanie Użytkownika:** ${question ? `"${question}"` : 'Brak konkretnego pytania, proszę o ogólną radę.'}

        **Wylosowane Karty:**
        ${cardList}

        **Twoje Zadanie:**
        1.  **Analiza Kart:** Jako Tarotmistrz Dariusz, krótko przeanalizuj każdą kartę w jej wyznaczonej pozycji, biorąc pod uwagę jej podstawowe znaczenie oraz to, czy jest prosta czy odwrócona.
        2.  **Synteza i Narracja:** Stwórz spójną narrację, która łączy wszystkie karty. Opowiedz historię, którą one przedstawiają. Jak energia przepływa od jednej karty do drugiej?
        3.  **Wnioski i Rada:** Zakończ podsumowaniem i udziel konkretnej, praktycznej porady dla użytkownika na podstawie całego rozkładu, odnosząc się do jego pytania lub ogólnej sytuacji.

        Formatuj odpowiedź używając Markdown dla lepszej czytelności (nagłówki, pogrubienia, listy).
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.7,
                topP: 0.95,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error fetching Tarot reading from Gemini:", error);
        throw new Error("Nie udało się uzyskać interpretacji od AI.");
    }
}