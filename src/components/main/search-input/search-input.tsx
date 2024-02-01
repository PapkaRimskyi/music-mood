import style from './style.module.css';

function SearchInput() {
  return (
    <div className="w-1/2 mx-auto">
      <input className={`w-full py-4 px-5 rounded-lg ${style.input}`} type="text" placeholder="Singer to search" />
    </div>
  );
}

export default SearchInput;
