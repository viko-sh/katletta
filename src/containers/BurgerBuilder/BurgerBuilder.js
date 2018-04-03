import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';
import Aux from '../../hoc/Util/Util';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/OrderSummery/OrderSummery';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const END_POINTS = {
  INGREDIENTS: 'ingredients.json',
  INGREDIENT_PRICES: 'prices.json'
};

const BASE_PRICE = 10;

/**
 * BurgerBuilder Component
 */
class BurgerBuilder extends Component{

    state={
        ingredients: null,
        prices: null,
        totalPrice: BASE_PRICE,
        purchasable: false,
        purchasing:false,
        loading:false,
        error: false
    };


    componentDidMount(){
        axios.get(END_POINTS.INGREDIENTS)
            .then(this.resolveIngredientsInit)
            .catch(error => {
                this.setState({error: true});
            });

        axios.get(END_POINTS.INGREDIENT_PRICES)
            .then(this.resolveIngredientPrices)
            .catch(error => {
                this.setState({error: true});
            });
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
        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer:{
                name: 'Vico Shlapkin',
                address: {
                    street: '31 Eve Street, Strathfield',
                    zipCode: 2135,
                    country:'Australia'
                },
                email: 'viktor.wrk@gmail.com',
                deliveryMethod: 'fastest'
            }
        };

        axios.post('/orders.json',order)
            .then(response=>{
                this.setState({loading:false, purchasing: false})
            })
            .catch(error=>{
                this.setState({loading:false, purchasing: false})
            })
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
                totalPrice: this.state.totalPrice +  this.state.prices[type]
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
     * Set Order Summery data depending on ingredients & loading
     * @returns {JSX} - order summery
     */
    orderSummery(){
        let orderSummery = null;

        if(this.state.ingredients){
            orderSummery = <OrderSummery
                ingredients={this.state.ingredients}
                cancelHandler={this.purchaseCancelHandler}
                continueHandler={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}/>;
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
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        totalPrice={this.state.totalPrice}
                        removeHadnler={this.removeIngredientHandler.bind(this)}
                        addHandler={this.addIngredientHandler.bind(this)}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
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

export default WithErrorHandler(BurgerBuilder, axios);