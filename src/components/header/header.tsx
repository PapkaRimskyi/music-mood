import HomeLink from "@components/header/home-link/home-link.tsx";
import NavigationList from "@components/header/navigation-list/navigation-list.tsx";

function Header() {
  return (
    <header className="mb-6 pt-6 w-100 flex justify-between items-center">
      <div className="w-20">
        <HomeLink />
      </div>
      <div>
        <nav>
          <NavigationList />
        </nav>
      </div>
    </header>
  );
}

export default Header;
