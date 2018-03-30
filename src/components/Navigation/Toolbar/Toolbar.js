import React from 'react';
import classes from './Toolbar.css';

import NavigationItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

/**
 *@returns JSX
 */
const toolbar = (props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle toggleMenu={props.drawerToggleHandler} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;