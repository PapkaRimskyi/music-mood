import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES  } from "../../../const/routes.ts";

import style from './style.module.css';

function SearchInput() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  }

  const onInputSearch = (e: KeyboardEvent) => {
    const { code } = e;
    if (code === 'Enter' && inputValue) {
      navigate({ pathname: ROUTES.SEARCH_RESULT, search: `?q=${inputValue}` });
    }
  }

  return (
    <div className="w-1/2 mx-auto">
      <input
        className={`w-full py-4 px-5 rounded-lg ${style.input}`}
        type="text"
        value={inputValue}
        onChange={onInputChange}
        onKeyUp={onInputSearch}
        placeholder="Singer to search"
      />
    </div>
  );
}

export default SearchInput;
