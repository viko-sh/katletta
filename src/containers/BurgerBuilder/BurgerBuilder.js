import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Aux from '../../hoc/Util';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/OrderSummery/OrderSummery';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const BASE_PRICE = 10;

class BurgerBuilder extends Component{

    state={
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: BASE_PRICE,
        purchasable: false
    };

    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .reduce((total, n)=>{
                return total + ingredients[n]
            }, 0);

        this.setState(()=>{
            return {purchasable: (sum > 0)}
        });
    }

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
                ingredients: ingArr,
                totalPrice: this.state.totalPrice +  INGREDIENT_PRICES[type]
            }
        });
        this.updatePurchaseState(ingArr);
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
                    ingredients: ingArr,
                    totalPrice: this.state.totalPrice -  INGREDIENT_PRICES[type]
                }
            });
        }
        this.updatePurchaseState(ingArr);
    };


    /**
     * Main render method
     * @returns {JSX}
     */
    render(){
        console.log("render");
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        return(
            <Aux>
                <Modal>
                    <OrderSummery ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                               totalPrice={this.state.totalPrice}
                               removeHadnler={this.removeIngredientHandler.bind(this)}
                               addHandler={this.addIngredientHandler.bind(this)}
                               disabled={disabledInfo}
                               purchasable={this.state.purchasable} />
            </Aux>
        );
    }
}

export default BurgerBuilder;