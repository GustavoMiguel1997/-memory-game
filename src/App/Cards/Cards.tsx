import { useState, useEffect } from 'react';
import { Card } from '../../components';
import { TCard } from '../../types/card';
import {
  loadInitialCards,
  setChosenCard,
  setCardsStatus,
  setPlayerScored,
  setNextPlayerTurn,
  setWinner,
} from '../../actions';
import { Action } from '../../actions/types';

type TProps = {
  cards: TCard[];
  dispatch: React.Dispatch<Action>;
};

function Cards({ cards, dispatch }: TProps) {
  const [canSelectCard, setCanSelectCard] = useState(true);

  useEffect(() => {
    loadNewCards();
  }, []);

  useEffect(() => {
    validateSelectedCards();
    validateAllCardsAreSelected();
  }, [cards]);

  function loadNewCards() {
    dispatch(loadInitialCards(16));
  }

  function hasTwoCardsSelected() {
    const cardsSelected = cards.filter((item) => item.status === 'selected');

    if (cardsSelected.length >= 2) {
      return cardsSelected;
    }
  }

  function isCheckedCard(index: number) {
    const card = cards.find((card, currentIndex) => currentIndex === index);
    return card?.status === 'checked';
  }

  function handleCardClick(index: number) {
    if (!canSelectCard || hasTwoCardsSelected() || isCheckedCard(index)) {
      return;
    }

    dispatch(setChosenCard(index));
  }

  function validateAllCardsAreSelected() {
    if (cards.length) {
      const allCardSelected = cards.every(
        (card) => card && card?.status === 'checked',
      );
      if (allCardSelected) {
        dispatch(setWinner());
      }
    }
  }

  function validateSelectedCards() {
    const twoCardsSelected = hasTwoCardsSelected();
    if (twoCardsSelected) {
      const [firstCard, secondCard] = twoCardsSelected;
      const cardsMatch = firstCard.name === secondCard.name;

      if (cardsMatch) {
        updateCardsStatus(twoCardsSelected);
        dispatch(setPlayerScored());
        return;
      }
      updateCardsStatus(twoCardsSelected, 2000);

      setTimeout(() => {
        dispatch(setNextPlayerTurn());
      }, 2000);
    }
  }

  function updateCardsStatus(cards: TCard[], timeout = 500) {
    setCanSelectCard(false);

    setTimeout(() => {
      dispatch(setCardsStatus(cards));
    }, timeout);

    setTimeout(() => {
      setCanSelectCard(true);
    }, timeout + 300);
  }

  return (
    <>
      {cards.map((card, index) => (
        <Card
          key={index}
          index={index}
          color={card.color}
          Icon={card.Icon}
          status={card.status}
          onClick={handleCardClick}
        />
      ))}
    </>
  );
}

export default Cards;
