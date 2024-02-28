type Props = {
  text: string,
  onClickHandler: () => void,
}

function RetryAgainButton({ text, onClickHandler }: Props) {
  return (
    <button
      className="absolute p-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neonDarkerPurple hover:bg-neonPurple active:opacity-30 rounded-lg"
      type="button"
      onClick={onClickHandler}
    >
      {text}
    </button>
  );
}

export default RetryAgainButton;
