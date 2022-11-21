import { TCard } from '../types/card';

export type Action =
  | { type: CardsActionsKind.LOAD_INITIAL_CARDS; cardsQuantity: number }
  | { type: CardsActionsKind.SET_CHOSEN_CARD; chosenCardIndex: number }
  | { type: CardsActionsKind.SET_CARDS_STATUS; cardsSelected: TCard[] }
  | { type: PlayerActionsKind.SET_PLAYERS_QUANTITY; quantity: number }
  | { type: PlayerActionsKind.SET_PLAYER_SCORED }
  | { type: PlayerActionsKind.SET_NEXT_PLAYER_TURN }
  | { type: GameActionsKind.SET_RESET_GAME }
  | { type: GameActionsKind.SET_WINNER };

export enum CardsActionsKind {
  LOAD_INITIAL_CARDS = 'LOAD_INITIAL_CARDS',
  SET_CHOSEN_CARD = 'SET_CHOSEN_CARD',
  SET_CARDS_STATUS = 'SET_CARDS_STATUS',
}

export enum GameActionsKind {
  SET_RESET_GAME = 'SET_RESET_GAME',
  SET_WINNER = 'SET_WINNER',
}

export enum PlayerActionsKind {
  SET_PLAYERS_QUANTITY = 'SET_PLAYERS_QUANTITY',
  SET_PLAYER_SCORED = 'SET_PLAYER_SCORED',
  SET_NEXT_PLAYER_TURN = 'SET_NEXT_PLAYER_TURN',
}
