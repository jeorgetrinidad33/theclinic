import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <div className="header">
        <h1>The Clinic</h1>
        <nav>
          <ul>
            <li>Home</li>
          </ul>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
