import React, {Component} from'react';
import classes from './BurgerIngredient.css';
import ingredients from '../Ingredients';
import PropTypes from 'prop-types';


class BurgerIngredient extends Component{


    render() {

        let type = this.props.type,
            ingredientFromList = ingredients[type],
            ingredient = null;

        //for now, we have two types of data that can represent an ingredient
        //string - 1 level div, object - 1 div with children as object.items

        //handle type if its a string
        if (typeof ingredientFromList === 'string') {
            ingredient = (
                <div className={ingredientFromList}>&nbsp;</div>
            )
        }

        //handle object
        if (typeof ingredientFromList === 'object') {

            //add items as div elements
            let items = ingredientFromList.items.map((item, index) => {
                return (
                    <div
                        key={item + '-' + index}
                        className={item}></div>
                )
            });

            ingredient = (
                <div className={ingredientFromList.class}>
                    {items}
                </div>
            )
        }

        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;

