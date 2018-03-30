import React from 'react';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import Aux from '../../../hoc/Util';
import NavigationItems from '../NavigationItems/NavigationItems';

/**
*@returns JSX
*/
const sideDrawer = (props)=> {

  let attachedClasses = [classes.SideDrawer, classes.Close];

  if(props.open){
     attachedClasses = [classes.SideDrawer, classes.Open]
  }

  return (
      <Aux>
        <Backdrop
            show={props.open}
            clicked={props.closed} />
        <div className={attachedClasses.join(" ")}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>

      </Aux>
    );
};

export default sideDrawer;