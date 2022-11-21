import { TCard } from '../types/card';
import {
  Action,
  CardsActionsKind,
  PlayerActionsKind,
  GameActionsKind,
} from './types';

export const loadInitialCards = (cardsQuantity: number): Action => ({
  type: CardsActionsKind.LOAD_INITIAL_CARDS,
  cardsQuantity,
});

export const setChosenCard = (chosenCardIndex: number): Action => ({
  type: CardsActionsKind.SET_CHOSEN_CARD,
  chosenCardIndex,
});

export const setCardsStatus = (cardsSelected: TCard[]): Action => ({
  type: CardsActionsKind.SET_CARDS_STATUS,
  cardsSelected,
});

export const setPlayersQuantity = (quantity: number): Action => ({
  type: PlayerActionsKind.SET_PLAYERS_QUANTITY,
  quantity,
});

export const setPlayerScored = (): Action => ({
  type: PlayerActionsKind.SET_PLAYER_SCORED,
});

export const setNextPlayerTurn = (): Action => ({
  type: PlayerActionsKind.SET_NEXT_PLAYER_TURN,
});

export const setReset = (): Action => ({
  type: GameActionsKind.SET_RESET_GAME,
});

export const setWinner = (): Action => ({
  type: GameActionsKind.SET_WINNER,
});
