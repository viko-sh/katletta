import React, {Component} from 'react';
import Aux from '../../hoc/Util/Util';
import Button from '../UI/Button/Button';

class OrderSummery extends Component{


    componentWillUpdate(){
        //console.log('OrderSummery componentWillUpdate');
    }

    render(){
        const ingredientsSummary = Object.keys(this.props.ingredients).map((egKey, i)=>{
            return (<li key={egKey +  i}>
                <span>{egKey}</span>: {this.props.ingredients[egKey]}
            </li>)
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger woth the following ingredients</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price: ${this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to checkout</p>
                <Button btnType='Danger'  clicked={this.props.cancelHandler}>CANCEL</Button>
                <Button btnType='Success' clicked={this.props.continueHandler}>CONTINUE</Button>
            </Aux>
        )
    }

}

export default OrderSummery;