import Logo from "./logo.tsx/logo.tsx";

function Header() {
  return (
    <header className="mb-6 pt-3 w-100 flex justify-between items-center">
      <div className="w-10">
        <Logo />
      </div>
      <div>
        <nav>
          <ul>
            <li>
              <a href="">Favorites</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
