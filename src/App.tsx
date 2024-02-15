import { Outlet } from "react-router-dom";

import Header from "./components/header/header.tsx";

function App() {
  return (
    <div className="container mx-auto px-2">
      <Header />
      <Outlet />
    </div>
  );
}

export default App
