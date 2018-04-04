import React from 'react';
import classes from './Order.css';


/**
*@returns JSX
*/
const order = (props)=>{

    const ing = [];

    for(let itemName in props.order.ingredients){
        ing.push({name: itemName, amount: props.order.ingredients[itemName]})
    }

    const ingredientOutput = ing.map(ig =>{
       return <span style={{textTransform: 'capitalize',display:'inline-block',padding: '0 5px'}} key={ig.name}>{ig.name} ({ig.amount})</span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>{props.order.price}</strong></p>
        </div>
    )
};

export default order;