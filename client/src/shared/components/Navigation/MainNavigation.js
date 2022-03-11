import { Fragment, useState } from 'react';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from '../UIElements/SideDrawer/SideDrawer';
import Backdrop from '../UIElements/SideDrawer/Backdrop';

import classes from './MainNavigation.module.css';
import { useEffect } from 'react';

const MainNavigation = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const drawerClickHandler = () => {
    showDrawer ? setShowDrawer(false) : setShowDrawer(true);
  };

  const closeClickHandler = () => {
    setShowDrawer(false);
  };

  return (
    <Fragment>
      {showDrawer && (
        <SideDrawer onClick={closeClickHandler}>
          <nav className={classes.main_navigation__drawer_nav}>
            <NavLinks />
            {/* <span>x</span> */}
          </nav>
        </SideDrawer>
      )}

      <MainHeader>
        <button
          onClick={drawerClickHandler}
          className={classes.main_navigation__menu_btn}
        >
          <span />
          <span />
          <span />
        </button>
        <h3 className={classes.main_navigation__title}>Orpheus</h3>
        <nav className={classes.main_navigation__header_nav}>
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNavigation;
