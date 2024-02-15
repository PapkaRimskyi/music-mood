type Props = {
  currentTime: number,
  duration: number,
}

function Time({ currentTime = 0, duration = 0 }: Props) {
  return (
    <div>
      <p className="text-sm">{Math.floor(currentTime)}s/{Math.floor(duration)}s</p>
    </div>
  );
}

export default Time;
