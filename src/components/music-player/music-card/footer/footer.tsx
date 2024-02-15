import Time from "./time/time.tsx";
import AudioLine from "./audio-line/audio-line.tsx";
import ControlBar from "../control-bar/control-bar.tsx";

function Footer({ currentAudioState, timeBarClickHandler, audioLinePos }) {
  return (
    <div className="mt-auto flex flex-col">
      <div className="flex items-center justify-between">
        <Time currentTime={currentAudioState.currentTime} duration={currentAudioState.duration} />
        <ControlBar />
      </div>
      <AudioLine audioLinePos={audioLinePos} timeBarClickHandler={timeBarClickHandler} />
    </div>
  );
}

export default Footer;
