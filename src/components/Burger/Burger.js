import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';
import {withRouter, Link} from 'react-router-dom';

const burger = (props) =>{

    //prep the dynamic ingredients
    //to
    let transformedIngredients = Object
        .keys(props.ingredients)
        .map(igKey => {
            // create an array with length = props.ingredients[igKey] value
            return [...Array(props.ingredients[igKey])]
                .map((_, i)=>{
                    //return BurgerIngredient component X the array length
                    return <BurgerIngredient type={igKey} key={igKey + i} />
                });
        }).reduce((arr, el)=>{
            return arr.concat(el)
        }, []);

    //handle empty array
    if(!transformedIngredients.length){
        transformedIngredients = (<p>Please start adding ingredients</p>)
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="breadTop" />
            {transformedIngredients}
            <BurgerIngredient type="breadBottom" />
        </div>
    );
};


export default withRouter(burger);