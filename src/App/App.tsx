import { useReducer } from 'react';
import reducer, { initialState } from '../reducer';
import { setReset } from '../actions';
import Cards from './Cards/Cards';
import Players from './Players/Players';
import { Button, Modal } from '../components';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner } = state;

  return (
    <>
      {winner && (
        <Modal winner={String(winner)} onClose={() => dispatch(setReset())} />
      )}
      <div className="app">
        <div className="app__header">
          <h1>Memory</h1>
          <div className="app__header__button">
            <Button
              label="Restart"
              isYellow={true}
              onClick={() => dispatch(setReset())}
            />
          </div>
        </div>
        <div className="app__cards">
          <Cards cards={state.cards} dispatch={dispatch} />
        </div>
        <div className="app__scoreboards">
          <Players
            players={state.players}
            gameStarted={state.gameStarted}
            dispatch={dispatch}
          />
        </div>
      </div>
    </>
  );
}

export default App;
