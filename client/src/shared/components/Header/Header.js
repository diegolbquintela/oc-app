import { Link } from 'react-router-dom';

import classes from './Header.module.css';

const Header = () => {
  return (
    <div>
      <Link to="/" className={classes.title}>
        <h1>The Orpheus App</h1>
      </Link>
    </div>
  );
};

export default Header;
