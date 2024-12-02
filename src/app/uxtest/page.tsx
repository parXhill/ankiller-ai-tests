'use client'

import Link from "next/link";
import DeckCard from "./components/DeckCard";
import { dummyDecks } from "../assets/deckDummyData";



export default function UxPage() {



  return (
    <>
    <p>Landing Page</p>
    {dummyDecks.map((deck) => (<DeckCard deckData={deck} key={deck.id} />))}
    <p>Mix</p>
    <Link href='/uxtest/createdeck'><p>Create</p></Link>
    <Link href="/uxtest/reviews"><p>Reviews</p></Link>
    </>
  );
}   