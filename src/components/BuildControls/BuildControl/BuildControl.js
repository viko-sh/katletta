import React from 'react';
import classes from './BuildControl.css';


const buildControl = (props) =>
(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={()=>{props.removeHadnler(props.type)}}
                className={classes.Less}
                disabled={false}>Less</button>
        <button onClick={()=>{props.addHandler(props.type)}}
                className={classes.More}>More</button>
    </div>
);


export default buildControl;