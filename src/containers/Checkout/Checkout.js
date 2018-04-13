import React, {Component, Fragment} from 'react';

import CheckoutSummery from '../../components/CheckoutSummery/CheckoutSummery';
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../Checkout/ContactData/ContactData';


import {connect} from 'react-redux';


class Checkout extends Component {

    componentWillMount(){
        if(this.props.ingredients === null){
            return this.props.history.push('/');
        }
    }

    onCheckoutCancel = () =>{
        this.props.history.goBack();
    };


    onCheckoutSuccess = () =>{
        this.props.history.replace('checkout/contact-data')
    };


    render() {

        let summary = <Redirect to="/" />;

        if(this.props.ingredients){

            const purchasedRedirect = this.props.purchased && <Redirect to="/"/>;

            summary = (
                <Fragment>
                    {purchasedRedirect}
                    <CheckoutSummery
                        ingredients={this.props.ingredients}
                        onCheckoutCancel={this.onCheckoutCancel}
                        onCheckoutSuccess={this.onCheckoutSuccess}/>
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}/>
                </Fragment>
            )
        }

        return summary;
    }
}

const mapStateToProps = state =>{
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased

    }
};




export default connect(mapStateToProps)(Checkout);