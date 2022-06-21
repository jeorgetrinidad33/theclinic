import { NavLink, Outlet } from "react-router-dom";

const Layout = ({ user, signedIn, onLogout}) => {
  return (
    <div>
      <div className="header">
        <h1>The Clinic</h1>
        <nav>
          <ul>
            <li signedIn={{ cursor: 'pointer' }}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <ul>
                {signedIn && <li>Hello {user.name}!</li>}
                {signedIn && (<li
                  style={{ cursor: 'pointer'}}
                  onClick={() => onLogout(false, {})}
                  >Logout
                  </li>
                )}
              </ul>
            </li>
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
