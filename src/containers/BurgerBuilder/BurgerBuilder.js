import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/BuildControls/BuildControls';
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

    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls/>
            </Aux>
        );
    }
}

export default BurgerBuilder;