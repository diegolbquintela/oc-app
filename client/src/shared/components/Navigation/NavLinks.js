import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import classes from './NavLInks.module.css';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);

  const logoutClickHandler = (e) => {
    auth.logout();
  };

  const userId = auth.userId;

  return (
    <ul className={classes.nav_links}>
      <li>
        <NavLink to="/" exact>
          HOME
        </NavLink>
      </li>
      {/* {auth.isLoggedIn && (
        <li>
          <NavLink to="/" exact>
            HOLDINGS
          </NavLink>
        </li>
      )} */}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/transactions`}>TRANSACTIONS</NavLink>
        </li>
      )}
      {/* <li>
        <NavLink to="/">ARTICLES</NavLink>
      </li> */}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/" onClick={logoutClickHandler}>
            LOGOUT
          </NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
