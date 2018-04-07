import React, {Component} from 'react';

import CheckoutSummery from '../../components/CheckoutSummery/CheckoutSummery';
import {Route} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';

import {connect} from 'react-redux';


class Checkout extends Component {

    onCheckoutCancel = () =>{
        this.props.history.goBack();
    };


    onCheckoutSuccess = () =>{
        this.props.history.replace('checkout/contact-data')
    };


    render() {
        return (
            <div>
                <CheckoutSummery
                    ingredients={this.props.ingredients}
                    onCheckoutCancel={this.onCheckoutCancel}
                    onCheckoutSuccess={this.onCheckoutSuccess}/>
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ingredients: state.ingredients
    }
};

export default connect(mapStateToProps)(Checkout);