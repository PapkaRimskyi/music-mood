import ApiLink from "./api-link/api-link.tsx";

function Header() {
  return (
    <header className="mb-6 pt-6 w-100 flex justify-between items-center">
      <div className="w-20">
        <ApiLink />
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
