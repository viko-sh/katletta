import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummery.css';

/**
*@returns JSX
*/
const checkoutSummery = (props)=>{

    const style = {
        with:'100%',
        margin: 'auto'
    };

    return (
        <div className={classes.CheckoutSummery}>
            <h1>Bone Appetit!</h1>
            <div style={style}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.onCheckoutCancel}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.onCheckoutSuccess}>SUCCESS</Button>
        </div>
    );
};

export default checkoutSummery;