import React from 'react';
import classes from './Input.css';

/**
*@returns JSX
*/
const input = (props)=>{

    const inputClasses = [classes.Input];

    if(props.touched && !props.invalid){
        inputClasses.push(classes.Invalid);
    }


    return (
        <div>
            <label>{props.label}</label>
            <input className={inputClasses.join(" ")}
                   type={props.type}
                   value={props.value}
                   placeholder={props.placeholder}
                   onChange={props.changed}/>
        </div>
    );
};

export default input;