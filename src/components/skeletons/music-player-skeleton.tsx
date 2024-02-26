import style from './style.module.css';

const SKELETON_ELEMENTS = 8;

const skeletonArray = new Array(SKELETON_ELEMENTS).fill(1);

function MusicPlayerSkeleton() {
  return (
    <div className="mx-auto w-full lg:w-10/12 xl:w-8/12 flex flex-col lg:flex-row justify-between">
      <div className={`relative w-full lg:w-3/5 h-[600px] bg-neonDarkBlue rounded-lg overflow-hidden ${style.bgPlayerGradient}`}>
        <div className="p-4 h-full flex flex-col relative rounded-md" />
      </div>
      <div className="mt-5 lg:mt-0 w-full lg:w-1/3">
        <div className="max-h-80 overflow-auto rounded-lg">
          <ul>
            {skeletonArray.map((_, i) => (
              <li key={i} className={`relative min-h-[54px] bg-neonDarkBlue border-b-2 border-b-neonDarkerPurple overflow-hidden ${style.bgPlayerGradient}`} />
            ))}
          </ul>
        </div>
        <div className="mt-4 flex justify-around">
          <div className="flex">
            <div className={`relative w-14 h-14 bg-neonDarkBlue bg-loop-image bg-no-repeat bg-cover rounded-lg overflow-hidden ${style.bgPlayerGradient}`} />
          </div>
          <div className="flex">
            <div className={`relative w-14 h-14 bg-neonDarkBlue bg-shuffle-image bg-no-repeat bg-cover rounded-lg overflow-hidden ${style.bgPlayerGradient}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayerSkeleton;
