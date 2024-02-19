import Time from "./time/time.tsx";
import ControlBar from "../control-bar/control-bar.tsx";
import AudioLine from "./audio-line/audio-line.tsx";

function Footer() {
  return (
    <div className="mt-auto flex flex-col">
      <div className="flex items-center justify-between">
        <Time />
        <ControlBar />
      </div>
      <AudioLine />
    </div>
  );
}

export default Footer;
