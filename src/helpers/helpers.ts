import { TCards } from '../types/card';

function shuffleCards(cardsToShuffle: TCards[]) {
  return cardsToShuffle
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export { shuffleCards };
