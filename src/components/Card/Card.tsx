import { IconType } from '../../assets/icons';
import './Card.css';

type TProps = {
  Icon: IconType;
  index: number;
  color: string;
  status?: '' | 'selected' | 'checked';
  onClick: (cardId: number) => void;
};

function Card({ Icon, index, color, status, onClick }: TProps) {
  const flipCardClass = 'flip-card'.concat((status && ` -${status}`) || '');

  return (
    <div className={flipCardClass} onClick={() => onClick(index)}>
      <div className="flip-card-inner">
        <div className="flip-card-front"></div>
        <div
          className="card"
          style={{ background: status === 'checked' ? color : '' }}
        >
          <Icon />
        </div>
      </div>
    </div>
  );
}

export default Card;
