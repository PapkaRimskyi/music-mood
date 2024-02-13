import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from "swiper/modules";

import Item from "./item/item.tsx";

import { ISearch } from "../../../api/interfaces.ts";

import 'swiper/css';
import 'swiper/css/effect-coverflow';

type Props = {
  results: ISearch[],
}

function ResultList({ results }: Props) {
  const turnOffCurrentAudioAfterSwipe = (currentIndex: number) => {
    const currentAudio: HTMLAudioElement | null = document.querySelector(`audio[src="${results[currentIndex].preview}"]`);
    currentAudio?.pause();
  }

  return (
    <div>
      <Swiper
        effect={'coverflow'}
        className={'py-10'}
        grabCursor={true}
        centeredSlides={true}
        onSlideChange={(e) => turnOffCurrentAudioAfterSwipe(e.previousIndex)}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          scale: .8,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
      >
        {results.map((item) => (
          <SwiperSlide key={item.id}>
            <Item data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ResultList;
