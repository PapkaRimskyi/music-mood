import { memo } from 'react';

import AudioList from "./audio-list/audio-list.tsx";
import AudioModePanel from "@result-page/sidebar/audio-mode-panel/audio-mode-panel.tsx";

const AudioSidebar = memo(() => {
  return (
    <div className="mt-5 lg:mt-0 w-full lg:w-1/3">
      <AudioList />
      <AudioModePanel />
    </div>
  );
})

export default AudioSidebar;
