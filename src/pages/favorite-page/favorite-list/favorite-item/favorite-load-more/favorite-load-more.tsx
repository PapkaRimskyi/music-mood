import { memo } from "react";

import ButtonConstructor from "@components/buttons/button-constructor/button-constructor.tsx";

type Props = {
  setPage:  React.Dispatch<React.SetStateAction<number>>,
}

const FavoriteLoadMore = memo(({ setPage }: Props) => {
  const loadMoreHandler = () => setPage((prevState) => prevState + 1);

  return (
    <div className="text-center">
      <ButtonConstructor
        extraClassName="p-2 rounded-xl bg-neonDarkBlue"
        onClickHandler={loadMoreHandler}
      >
        Load more
      </ButtonConstructor>
    </div>
  );
})

export default FavoriteLoadMore;
