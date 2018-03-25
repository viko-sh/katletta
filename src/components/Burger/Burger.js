import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) =>{

    const burgerStyle = {
        width:'450px',
        height: '450px'
    };

    return (
        <div style={burgerStyle}>
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