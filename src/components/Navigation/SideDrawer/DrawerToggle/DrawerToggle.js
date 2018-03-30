import React from 'react';
import classes from './DrawerToggle.css';

/**
 *@returns JSX
 */
const DrawerToggle = (props)=>(
    <div className={classes.DrawerToggle} onClick={props.toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggle;