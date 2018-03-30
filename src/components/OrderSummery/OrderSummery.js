import React from 'react';
import Aux from '../../hoc/Util';
import Button from '../UI/Button/Button';

const orderSummery = (props) =>{

    const ingredientsSummary = Object.keys(props.ingredients).map((egKey, i)=>{
        return (<li key={egKey +  i}>
                    <span>{egKey}</span>: {props.ingredients[egKey]}
                </li>)
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger woth the following ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout</p>
            <Button btnType='Danger'  clicked={props.cancelHandler}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continueHandler}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummery;