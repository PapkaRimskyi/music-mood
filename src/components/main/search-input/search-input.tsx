import { ChangeEvent, KeyboardEvent, useState } from "react";

import style from './style.module.css';

const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': __RAPID_API_KEY__,
    'X-RapidAPI-Host': __RAPID_API_HOST__,
  }
};

function SearchInput() {
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
  }

  const onInputSearch = async(e: KeyboardEvent) => {
    const { code } = e;
    if (code === 'Enter' && inputValue) {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="w-1/2 mx-auto">
      <input className={`w-full py-4 px-5 rounded-lg ${style.input}`} type="text" value={inputValue} onChange={onInputChange} onKeyUp={onInputSearch} placeholder="Singer to search" />
    </div>
  );
}

export default SearchInput;
