import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Aux from '../../hoc/Util/Util';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

import * as ACTIONS_TYPES from '../../store/actions';
import {connect} from 'react-redux';


const END_POINTS = {
  INGREDIENTS: 'ingredients.json',
  INGREDIENT_PRICES: 'prices.json'
};

/**
 * BurgerBuilder Component
 */
class BurgerBuilder extends Component{

    state={
        prices: null,
        purchasing:false,
        loading:false,
        error: false
    };


    componentDidMount(){
        // axios.get(Constans.INGREDIENTS)
        //     .then(this.resolveIngredientsInit)
        //     .catch(error => {
        //         this.setState({error: true});
        //     });

        // axios.get(END_POINTS.INGREDIENT_PRICES)
        //     .then(this.resolveIngredientPrices)
        //     .catch(error => {
        //         this.setState({error: true});
        //     });
        // axios.all([this.getIngredients(), this.getPrices()])
        //     .then(axios.spread(function (ingredients, prices) {
        //         // Both requests are now complete
        //         console.log(ingredients);
        //         console.log(prices);
        //     }));
    }


    getIngredients(){
        return axios.get(END_POINTS.INGREDIENTS);
    }

    getPrices(){
        return axios.get(END_POINTS.INGREDIENT_PRICES);
    }

    resolveIngredientPrices = (result) =>{
        const data = result.data;
        this.setState(()=>{
            return {prices: data}
        });
    };

    /**
     *
     * @param result
     * @returns {void}
     */
    resolveIngredientsInit = (result) =>{
        const data = result.data;
        this.setState(()=>{
            return {ingredients: data}
        });
    };

    /**
     * Change purchasing State to true
     * May be triggered by order button
     * @returns {void}
     */
    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    /**
     * Change purchasing State to false
     * May be triggered by clicking on backdrop
     *@returns {void}
     */
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    /**
     * Continue to purchase
     * triggered by clicking on continue purchase btn
     *@returns {void}
     */
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    /**
     *
     * @param ingredients
     */
    updatePurchaseState(ingredients){
        const sum = Object.keys(ingredients)
            .reduce((total, n)=>{
                return total + ingredients[n]
            }, 0);

        return (sum > 0);
    }


    /**
     * Set Order Summery data depending on ingredients & loading
     * @returns {JSX} - order summery
     */
    orderSummery(){
        let orderSummery = null;

        if(this.props.ingredients){
            orderSummery = <OrderSummery
                ingredients={this.props.ingredients}
                cancelHandler={this.purchaseCancelHandler}
                continueHandler={this.purchaseContinueHandler}
                totalPrice={this.props.totalPrice}/>;
        }

        if(this.state.loading){
            orderSummery = <Spinner/>
        }

        return orderSummery;
    }

    /**
     * Get the Burger object
     * @returns {JSX} - burger object | error | loader
     */
    burger(){
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> :  <Spinner/>

        const disabledInfo = {
            ...this.props.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        totalPrice={this.props.totalPrice}
                        removeHadnler={this.props.onIngredientRemove.bind(this)}
                        addHandler={this.props.onIngredientAdded.bind(this)}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        purchaseHandler={this.purchaseHandler}/>
                </Aux>
            );
        }
        return burger;
    }

    /**
     * Main render method
     * @returns {JSX}
     */
    render(){
        //console.log("render");

        return(
            <Aux>
                <Modal show={this.state.purchasing}
                       loading={this.state.loading}
                       modalClosed={this.purchaseCancelHandler}>
                    {this.orderSummery()}
                </Modal>
                {this.burger()}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingredientName) => dispatch({type: ACTIONS_TYPES.ADD_INGREDIENT, ingredientName: ingredientName} ),
        onIngredientRemove: (ingredientName) => dispatch({type: ACTIONS_TYPES.REMOVE_INGREDIENT, ingredientName: ingredientName} )
    }
};



export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));