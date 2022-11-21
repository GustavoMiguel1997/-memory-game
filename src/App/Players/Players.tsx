import { useEffect } from 'react';
import { Button, Scoreboard } from '../../components';
import { TPlayer } from '../../types/player';
import { setPlayersQuantity } from '../../actions';
import { Action } from '../../actions/types';

type TProps = {
  players: TPlayer[];
  gameStarted: boolean;
  dispatch: React.Dispatch<Action>;
};

function Players({ players, gameStarted, dispatch }: TProps) {
  function addPlayer() {
    const newPlayersQuantity = players.length + 1;
    if (newPlayersQuantity <= 4) {
      dispatch(setPlayersQuantity(newPlayersQuantity));
    }
  }

  const disabledButton = gameStarted || players.length === 4;

  return (
    <>
      {players.map((player) => (
        <Scoreboard
          key={player.id}
          id={player.id}
          selectedColor={player.color}
          isSelected={player.isPlaying}
          score={player.score}
        />
      ))}
      <Button label="+" onClick={addPlayer} disabled={disabledButton} />
    </>
  );
}

export default Players;
