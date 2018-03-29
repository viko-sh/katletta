import React from 'react';
import Aux from '../../hoc/Util';

const orderSummery = (props) =>{

    const ingredientsSummary = Object.keys(props.ingredients).map((egKey, i)=>{
        return <li key={egKey +  i}><span>{egKey}</span>: {props.ingredients[egKey]}</li>
    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger woth the following ingredients</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout</p>
        </Aux>
    )
};

export default orderSummery;