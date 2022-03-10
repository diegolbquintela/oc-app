import { Fragment, useState } from 'react';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from '../UIElements/SideDrawer/SideDrawer';
import Backdrop from '../UIElements/SideDrawer/Backdrop';

import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const drawerClickHandler = (e) => {
    showDrawer ? setShowDrawer(false) : setShowDrawer(true);
  };

  return (
    <Fragment>
      {/* {showDrawer && <Backdrop onCLick={drawerClickHandler} />} */}
      {showDrawer && (
        <SideDrawer>
          <nav className={classes.main_navigation__drawer_nav}>
            <NavLinks onCLick={(e) => setShowDrawer(false)} />
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
