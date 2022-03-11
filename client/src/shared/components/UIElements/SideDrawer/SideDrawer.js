import React from 'react';
import ReactDOM from 'react-dom';
import classes from './SideDrawer.module.css';

const SideDrawer = (props) => {
  const content = (
    <aside onClick={props.onClick} className={classes.side_drawer}>
      {props.children}
    </aside>
  );
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
