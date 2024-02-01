import AppInfo from "./app-info/app-info.tsx";
import SearchInput from "./search-input/search-input.tsx";

function Main() {
  return (
    <main>
      <section>
        <AppInfo />
        <div className="mt-8">
          <SearchInput />
        </div>
      </section>
    </main>
  )
}

export default Main;
