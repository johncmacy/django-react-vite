import { NavLink, Outlet } from "react-router-dom"
import { currentUser } from "./utils/current_user/currentUser"
import "../css/styles.css"

export default function App() {
  return (
    <>
      <nav className="navbar">
        <div>
          <NavLink to="">Index</NavLink>
          <NavLink to="route">Route</NavLink>
        </div>

        <div>
          {currentUser.is_authenticated ? (
            <>
              <span>{currentUser.full_name || currentUser.username}</span>
              <a href="/logout/">Logout</a>
            </>
          ) : (
            <a href="/login/">Login</a>
          )}

          <a href="/admin/" target="_blank">
            Admin
          </a>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  )
}
