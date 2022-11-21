import './Modal.css';

type TProps = { winner: string; onClose: () => void };

function Modal({ winner, onClose }: TProps) {
  return (
    <div className="modal">
      <div className="modal__content">
        <p>
          The Winner is <b> Player {winner}</b>
        </p>
        <button className="modal__button" onClick={onClose}>
          X
        </button>
      </div>
    </div>
  );
}

export default Modal;
