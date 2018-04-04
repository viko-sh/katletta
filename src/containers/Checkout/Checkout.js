import React, {Component} from 'react';

import CheckoutSummery from '../../components/CheckoutSummery/CheckoutSummery';
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

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
            if(param[0]!=='totalPrice'){
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({
            ingredients: ingredients
        });
    }

    onCheckoutCancel = () =>{
        this.props.history.goBack();
    };


    onCheckoutSuccess = () =>{
        this.props.history.replace('checkout/contact-data')
    };


    render() {
        //console.log(this.props.match.path);
        //console.log(ContactData);
        return (
            <div>
                <CheckoutSummery
                    ingredients={this.state.ingredients}
                    onCheckoutCancel={this.onCheckoutCancel}
                    onCheckoutSuccess={this.onCheckoutSuccess}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={()=> (<ContactData ingredients={this.state.ingredients} />) }/>
            </div>
        );
    }
}


export default Checkout;