import AudioTimeInfo from "@src/pages/result-page/audio-card/audio-footer/audio-time-info/audio-time-info.tsx";
import AudioControlBar from "@src/pages/result-page/audio-card/audio-footer/audio-control-bar/audio-control-bar.tsx";
import AudioLine from "./audio-line/audio-line.tsx";

function AudioFooter() {
  return (
    <div className="mt-auto flex flex-col">
      <div className="flex items-center justify-between">
        <AudioTimeInfo />
        <AudioControlBar />
      </div>
      <AudioLine />
    </div>
  );
}

export default AudioFooter;
