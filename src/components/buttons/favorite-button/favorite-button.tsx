import FavoriteIcon from "@src/icons/favorite-icon.tsx";

type Props = {
  isActive: boolean,
  onClickHandler: () => void,
  className?: string,
}

function FavoriteButton({ isActive, onClickHandler, className = '' }: Props) {
  return (
    <button className={`w-5 ${className}`} type="button" onClick={onClickHandler}>
      <FavoriteIcon className={isActive ? "fill-neonPink" : "fill-neonDarkerPurple"} />
    </button>
  );
}

export default FavoriteButton;
