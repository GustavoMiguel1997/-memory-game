import './Button.css';

type TProps = {
  label: string;
  isYellow?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

function Button({ label, disabled, isYellow, onClick }: TProps) {
  const buttonClass = 'button'.concat(
    isYellow ? ' -yellow' : '',
    disabled ? ' -disabled' : '',
  );

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;
