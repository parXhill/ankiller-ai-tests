import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function DeckCard({deckData: object}) {

    const selectedDeck = useSelector((state: any) => state.deck.selectedDeck);

    return (
        <div className="flex">

            {selectedDeck !== deckData.deckId ? (<p>{deckData.deckName}</p>) : 
            
            null} 

        </div>
    );
}