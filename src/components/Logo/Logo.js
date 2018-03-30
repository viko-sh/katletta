import React from 'react';

import burgerLogo from '../../accets/images/burger-logo.png';
import classes from './Logo.css';

/**
*@returns JSX
*/
const logo = (props)=>(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt='MyBurger'/>
    </div>
);

export default logo;