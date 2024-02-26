import { memo } from 'react';

import AudioList from "./audio-list/audio-list.tsx";
import AudioListButtonPanel from "./audio-list-button-panel/audio-list-button-panel.tsx";

const AudioSidebar = memo(() => {
  return (
    <div className="mt-5 lg:mt-0 w-full lg:w-1/3">
      <AudioList />
      <AudioListButtonPanel />
    </div>
  );
})

export default AudioSidebar;
