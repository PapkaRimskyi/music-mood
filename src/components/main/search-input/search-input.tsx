import { ChangeEvent, KeyboardEvent, useState } from "react";

import useSearch from "../../../api/useSearch/useSearch.ts";

import style from './style.module.css';

function SearchInput() {
  const [inputValue, setInputValue] = useState("");
  const { singerData, isMutating, trigger } = useSearch();

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  }

  const onInputSearch = async(e: KeyboardEvent) => {
    const { code } = e;
    if (code === 'Enter' && inputValue) {
      trigger({ searchValue: inputValue });
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
        disabled={isMutating}
        placeholder="Singer to search"
      />
    </div>
  );
}

export default SearchInput;
