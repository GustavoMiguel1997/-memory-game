import './Scoreboard.css';

type TProps = {
  id: number;
  score: number;
  isSelected?: boolean;
  selectedColor?: string;
};

function Scoreboard({ id, score, selectedColor, isSelected }: TProps) {
  const scoreboardClass = 'scoreboard'.concat(isSelected ? ' -selected' : '');

  return (
    <div
      className={scoreboardClass}
      style={{ background: isSelected ? selectedColor : '' }}
    >
      <span>Player {id}</span>
      <span className="scoreboard__score">{score}</span>
    </div>
  );
}

export default Scoreboard;
