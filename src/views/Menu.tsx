import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <div>
      <NavLink to="/">Wind Down</NavLink>
      <NavLink to="/">Kill Some Time</NavLink>
      <NavLink to="/">Clear Your Sh*t</NavLink>
      <NavLink to="/">Treat Yo' Future Self</NavLink>
      <NavLink to="/">More...</NavLink>
    </div>
  )
}

export default Menu