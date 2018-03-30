import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

/**
*@returns JSX
*/
const NavigationItems = (props)=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/test' active>Burger Builder</NavigationItem>
        <NavigationItem link='/test'>Checkout</NavigationItem>
    </ul>
);

export default NavigationItems;