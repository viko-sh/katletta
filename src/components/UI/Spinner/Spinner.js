import React from 'react';
import classes from './Spinner.css';

/**
*@returns JSX
*/
const spinner = (props)=>(
    <div className={classes.Loader}>Loading...</div>
);

export default spinner;