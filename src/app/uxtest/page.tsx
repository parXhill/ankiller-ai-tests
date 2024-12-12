'use client'

import Link from "next/link";
import DeckCard from "../ui/landing/DeckCard";
import { useSelector, useDispatch } from "react-redux";
import { Deck, Card } from '../assets/deckDummyData';
import { fetchExampleData } from '@/app/lib/serverGet';
import { updateDummyDecks } from '@/store/deckSlice';




export default function UxPage() {
  
  const dummyDecks = useSelector((state: any) => state.deck.dummyDecks);
 
  const dispatch = useDispatch();


  function handleDataFetch() {
    fetchExampleData().then((data) => {

        const importedDeck: Deck = {
            id: dummyDecks.length + 2,
            title: 'Imported Deck',
            cards: data}
        dispatch(updateDummyDecks(importedDeck));
    });
}

  return (
    <>
    <p>Landing Page</p>
    {dummyDecks.filter((deck: any) => deck && deck.id).map((deck: any) => (<DeckCard deckData={deck} key={deck.id} />))}
        <p>Mix</p>
    <Link href='/uxtest/createdeck'><p>Create</p></Link>
    <Link href="/uxtest/reviews"><p>Reviews</p></Link>
    <p className="cursor-pointer bg-blue-700 text-white font-bold" onClick={handleDataFetch}>FETCH</p>

    </>
  );
}   