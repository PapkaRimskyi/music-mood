import ButtonConstructor from "@components/buttons/button-constructor/button-constructor.tsx";

function FavoriteAudioLine() {
  return (
    <div className="w-full h-10 flex justify-between bg-neonDarkBlue rounded-xl">
      <div className="w-1/12 flex justify-center items-center">
        <ButtonConstructor
          extraClassName="w-6 h-6 bg-play-image"
          onClickHandler={() => {}}
        />
      </div>
      <div className="w-10/12 bg-neonPink" />
      <div className="w-1/12 flex justify-center items-center">
        <ButtonConstructor
          extraClassName="w-6 h-6 bg-basket-image"
          onClickHandler={() => {}}
        />
      </div>
    </div>
  );
}

export default FavoriteAudioLine;
