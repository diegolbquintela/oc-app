import { NavLink } from 'react-router-dom';

import classes from './NavLInks.module.css';

const NavLinks = (props) => {
  return (
    <ul className={classes.nav_links}>
      <li>
        <NavLink to="/" exact>
          HOLDINGS
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/transactions">TRANSACTIONS</NavLink>
      </li>
      <li>
        <NavLink to="/">ARTICLES</NavLink>
      </li>
      <li>
        <NavLink to="/auth">AUTHENTICATE</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
