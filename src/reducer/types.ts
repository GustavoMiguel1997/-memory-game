import { TCard } from '../types/card';
import { TPlayer } from '../types/player';

export type State = {
  cards: TCard[];
  players: TPlayer[];
  gameStarted: boolean;
  winner: null | string | number;
};
