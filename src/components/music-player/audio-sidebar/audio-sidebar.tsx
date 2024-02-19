import AudioList from "./audio-list/audio-list.tsx";
import RepeatAndLoopController from "./repeat-and-loop-controller/repeat-and-loop-controller.tsx";

function AudioSidebar() {
  return (
    <div className="w-1/3">
      <AudioList />
      <RepeatAndLoopController />
    </div>
  );
}

export default AudioSidebar;
