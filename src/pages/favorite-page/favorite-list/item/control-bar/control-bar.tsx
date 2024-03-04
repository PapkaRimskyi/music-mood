import { ReactNode } from "react";

import classNames from "classnames";

import ButtonConstructor from "@components/buttons/button-constructor/button-constructor.tsx";

type Props = {
  isPlaying: boolean,
  onPlayClickHandler: () => void,
  onDeleteClickHandler: () => void,
  children: ReactNode,
}

function ControlBar({ isPlaying, onPlayClickHandler, onDeleteClickHandler, children }: Props) {
  const playButtonClass = classNames("w-4 md:w-6 h-4 md:h-6", !isPlaying ? "bg-play-image" : "bg-pause-image");

  return (
    <div className="w-full h-8 md:h-10 flex justify-between bg-neonDarkBlue rounded-xl">
      <div className="w-2/12 md:w-1/12 flex justify-center items-center">
        <ButtonConstructor
          extraClassName={playButtonClass}
          onClickHandler={onPlayClickHandler}
        />
      </div>
      {children}
      <div className="w-2/12 md:w-1/12 flex justify-center items-center">
        <ButtonConstructor
          extraClassName="w-4 md:w-6 h-4 md:h-6 bg-basket-image"
          onClickHandler={onDeleteClickHandler}
        />
      </div>
    </div>
  );
}

export default ControlBar;
