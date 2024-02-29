import { ReactNode } from "react";

import classNames from 'classnames';

type Props = {
  children?: ReactNode | string,
  onClickHandler: () => void,
  title?: string,
  extraClassName?: string,
}

function ButtonConstructor({ children, title, extraClassName, onClickHandler }: Props) {
  const buttonClassName = classNames('bg-no-repeat bg-center bg-contain', extraClassName);

  return (
    <button
      className={buttonClassName}
      type="button"
      title={title}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}

export default ButtonConstructor;
