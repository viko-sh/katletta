import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) =>{


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="breadTop" />
            <BurgerIngredient type="bacon" />
            <BurgerIngredient type="salad" />
            <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" />
            <BurgerIngredient type="breadBottom" />
        </div>
    );
};


export default burger;