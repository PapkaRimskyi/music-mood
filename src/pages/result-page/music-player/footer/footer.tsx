import TimeInfo from "@result-page/music-player/footer/time-info/time-info.tsx";
import ControlBar from "@result-page/music-player/footer/control-bar/control-bar.tsx";
import AudioLine from "./audio-line/audio-line.tsx";

function Footer() {
  return (
    <div className="mt-auto flex flex-col">
      <div className="flex items-center justify-between">
        <TimeInfo />
        <ControlBar />
      </div>
      <AudioLine />
    </div>
  );
}

export default Footer;
