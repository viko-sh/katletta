import React, {Component} from 'react';

import CheckoutSummery from '../../components/CheckoutSummery/CheckoutSummery';

class Checkout extends Component {

    constructor(props){
        super(props);

        this.state ={
            ingredients: {}
        };
    }

    componentDidMount(){
        const query =  new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for(let param of query.entries()){
            ingredients[param[0]] = +param[1];
        }

        this.setState({
            ingredients: ingredients
        });
    }

    onCheckoutCancel = () =>{
        console.log(this.props);
        this.props.history.goBack();
    };


    onCheckoutSuccess = () =>{
        this.props.history.replace('checkout/contact-data')
    };


    render() {

        console.log(this.state.ingredients);
        return (
            <div>
                <CheckoutSummery
                    ingredients={this.state.ingredients}
                    onCheckoutCancel={this.onCheckoutCancel}
                    onCheckoutSuccess={this.onCheckoutSuccess}
                    />
            </div>
        );
    }
}


export default Checkout;