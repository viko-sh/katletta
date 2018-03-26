import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Aux from '../../hoc/Util';

class BurgerBuilder extends Component{

    state={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    };

    /**
     * Add ingredient amount
     * @param {string} type - type of ingredient
     * @returns {void}
     */
    addIngredientHandler = (type)=>{
        let ingArr = {...this.state.ingredients};//copy the state object
        ingArr[type] = ingArr[type]+1;//increase the value by 1
        this.setState((prevState, props)=>{
            return {
                ingredients: ingArr
            }
        });
    };

    /**
     * Remove ingredient amount
     * @param {string} type - type of ingredient
     * @returns {void}
     */
    removeIngredientHandler = (type) => {
        let ingArr = {...this.state.ingredients},//copy the state object
            typeExist = (type in ingArr),//test if the type exist
            val = 0;

        //check if the type exist in the array
        if(typeExist){
            val = ingArr[type];
        }

        //check if the value not 0
        if(val>0){
            ingArr[type] = ingArr[type]-1;
            this.setState((prevState, props)=>{
                return {
                    ingredients: ingArr
                }
            });
        }
    };

    /**
     * Main render method
     * @returns {JSX}
     */
    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls removeHadnler={this.removeIngredientHandler.bind(this)}
                               addHandler={this.addIngredientHandler.bind(this)}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;