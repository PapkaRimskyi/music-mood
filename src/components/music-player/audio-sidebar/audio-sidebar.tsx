import { memo } from 'react';

import AudioList from "./audio-list/audio-list.tsx";
import RepeatAndLoopController from "./repeat-and-loop-controller/repeat-and-loop-controller.tsx";

const AudioSidebar = memo(() => {
  return (
    <div className="mt-5 lg:mt-0 w-full lg:w-1/3">
      <AudioList />
      <RepeatAndLoopController />
    </div>
  );
})

export default AudioSidebar;
