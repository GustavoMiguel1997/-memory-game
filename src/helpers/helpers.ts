import { TCard } from '../types/card';

function shuffleCards(cardsToShuffle: TCard[]) {
  return cardsToShuffle
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export { shuffleCards };
