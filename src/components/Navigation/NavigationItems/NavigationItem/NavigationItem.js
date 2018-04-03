import React from 'react';
import classes from './NavigationItem.css';
import {withRouter, Link} from 'react-router-dom';

/**
*@returns JSX
*/
const NavigationItem = (props)=>{
    return (
        <li className={classes.NavigationItem}>
            <Link
                to={props.link}
                className={ props.location.pathname ===  props.link ? classes.active : null }>
                {props.children}
            </Link>
        </li>
    )
};

export default withRouter(NavigationItem);