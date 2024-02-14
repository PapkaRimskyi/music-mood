type Props = {
  currentTime: number,
  duration: number,
}

function Time({ currentTime, duration }: Props) {
  return (
    <div>
      <p className="text-sm">{currentTime}s/{duration}s</p>
    </div>
  );
}

export default Time;
