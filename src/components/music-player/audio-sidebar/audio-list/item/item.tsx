import { memo, KeyboardEvent } from 'react';

import { ISearch } from "../../../../../api/interfaces.ts";

import useCurrentSong from "../../../../../zustand/useCurrentSong/useCurrentSong.ts";

type Props = {
  data: ISearch,
  activeAudioRef: React.RefObject<HTMLLIElement>,
  isActive: boolean,
}

const Item = memo(({ data, activeAudioRef, isActive }: Props) => {
  const changeCurrentSong = useCurrentSong(state => state.changeCurrentSong);
  const bgItemColor = isActive ? 'bg-neonPink' : 'bg-neonDarkPurple';

  const handleAudioClick = (id: number) => {
    changeCurrentSong(id);
  }

  const handleAudioEnterPress = (e: KeyboardEvent<HTMLLIElement>, id: number) => {
    const { code } = e;
    if (code === 'Enter') {
      changeCurrentSong(id);
    }
  }

  return (
    <li
      ref={isActive ? activeAudioRef : null}
      className={`border-b-2 ${bgItemColor} hover:bg-neonPurple active:opacity-30 border-b-neonDarkerPurple cursor-pointer`}
      onClick={() => handleAudioClick(Number(data.id))}
      onKeyUp={(e) => handleAudioEnterPress(e, Number(data.id))}
      tabIndex={0}
    >
      <p title={data.title} className="p-2 text-ellipsis whitespace-nowrap overflow-hidden">{data.title}</p>
    </li>
  );
});

export default Item;
