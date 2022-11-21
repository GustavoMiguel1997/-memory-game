import icons from '../assets/icons';
import { shuffleCards } from '../helpers/helpers';
import { TCard } from '../types/card';
import { TPlayer } from '../types/player';
import { State } from './types';
import {
  Action,
  CardsActionsKind,
  PlayerActionsKind,
  GameActionsKind,
} from '../actions/types';

const playersColors = ['#1abc9c', '#3498db', '#9b59b6', '#f1c40f'];

export const initialState: State = {
  cards: [],
  players: [{ id: 1, score: 0, isPlaying: true, color: playersColors[0] }],
  gameStarted: false,
  winner: null,
};

const initialPlayer = {
  score: 0,
  isPlaying: false,
};

function loadInitialCards(cardsQuantity: number) {
  const iconsQuantity = cardsQuantity / 2;
  const cardsWithIcons = icons.slice(0, iconsQuantity);
  const newCards = [...cardsWithIcons, ...cardsWithIcons];
  return shuffleCards(newCards);
}

function setChosenCard(index: number, cards: TCard[]) {
  const newCards = cards.map((item, currentIndex) =>
    currentIndex === index
      ? { ...item, status: 'selected' as 'selected' }
      : item,
  );
  return newCards;
}

function setCardsStatus(
  selectedCards: TCard[],
  cards: TCard[],
  players: TPlayer[],
) {
  const [firstCard, secondCard] = selectedCards;
  const cardsMatch = firstCard.name === secondCard.name;
  return cardsMatch
    ? getCardsWithNewStatus(selectedCards, cards, players, 'checked')
    : getCardsWithNewStatus(selectedCards, cards, players, '');
}

// melhorar essa lógica
function getCardsWithNewStatus(
  selectedCards: TCard[],
  cards: TCard[],
  players: TPlayer[],
  status: 'checked' | 'selected' | '',
) {
  const [firstCard, secondCard] = selectedCards;
  let color = '';
  if (status === 'checked') {
    const player = players.find((player) => player.isPlaying);
    color = player?.color || '';
  }

  return cards.map((card) =>
    card.name === firstCard.name || card.name === secondCard.name
      ? { ...card, status, color }
      : card,
  );
}

function setPlayersQuantity(quantity: number) {
  const initialArray = Array(quantity).fill(initialPlayer);
  const playersArray = initialArray.map((player, index) => ({
    ...player,
    id: index + 1,
    isPlaying: index === 0,
    color: playersColors[index],
  }));
  return playersArray;
}

function setPlayerScored(players: TPlayer[]) {
  return players.map((player) =>
    player.isPlaying ? { ...player, score: player.score + 1 } : player,
  );
}

function setNextPlayerTurn(players: TPlayer[]) {
  const newPlayersStats: TPlayer[] = [];
  players.map((player, index) => {
    const lastPlayer = players[players.length - 1];
    const previousPlayer = players[index - 1];

    if (index === 0 && lastPlayer.isPlaying) {
      newPlayersStats.push({ ...player, isPlaying: true });
    } else if (previousPlayer && previousPlayer.isPlaying) {
      newPlayersStats.push({ ...player, isPlaying: true });
    } else {
      newPlayersStats.push({ ...player, isPlaying: false });
    }
  });
  return newPlayersStats;
}

function setReset() {
  return { ...initialState, cards: loadInitialCards(16) };
}

function setWinner(players: TPlayer[]) {
  const hasDraw = false;
  const winner = players.reduce((prev, current) => {
    return prev.score > current.score ? prev : current;
  });
  return winner.id;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case CardsActionsKind.LOAD_INITIAL_CARDS:
      return {
        ...state,
        cards: loadInitialCards(action.cardsQuantity),
      };

    case CardsActionsKind.SET_CHOSEN_CARD:
      return {
        ...state,
        gameStarted: true,
        cards: setChosenCard(action.chosenCardIndex, state.cards),
      };

    case CardsActionsKind.SET_CARDS_STATUS:
      return {
        ...state,
        cards: setCardsStatus(action.cardsSelected, state.cards, state.players),
      };

    case PlayerActionsKind.SET_PLAYERS_QUANTITY:
      return { ...state, players: setPlayersQuantity(action.quantity) };

    case PlayerActionsKind.SET_PLAYER_SCORED:
      return { ...state, players: setPlayerScored(state.players) };

    case PlayerActionsKind.SET_NEXT_PLAYER_TURN:
      return { ...state, players: setNextPlayerTurn(state.players) };

    case GameActionsKind.SET_RESET_GAME:
      return setReset();

    case GameActionsKind.SET_WINNER:
      return { ...state, winner: setWinner(state.players) };

    default:
      return state;
  }
}

export default reducer;
