import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Constans from '../../../constans/server';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Util/Util';

class ContactData extends Component {

    state = {
        prices: {},
        loading: false,
        name: '',
        address: {
            street: '',
            zipCode: null,
            country:''
        },
        email: '',
        deliveryMethod: 'fastest'
    };

    componentDidMount(){
        axios.get(Constans.INGREDIENT_PRICES)
            .then(this.resolveIngredientPrices)
            .catch(error => {
                this.setState({error: true});
            });
    }

    resolveIngredientPrices = (result) =>{
        const data = result.data;
        this.setState(()=>{
            return {prices: data}
        });
    };

    onSendHandler = (event)=>{
        event.preventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
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

        axios.post(Constans.ORDERS,order)
            .then(response=>{
                this.setState({loading:false})
            })
            .catch(error=>{
                this.setState({loading:false})
            })
    };

    render() {

        let data = <Spinner/>;

        if(!this.state.loading){
            data = (
                <div className={classes.ContactData}>
                    <h4>Enter your Contact Data</h4>
                    <form>
                        <input type="text" name="name" placeholder="your name" />
                        <input type="email" name="email" placeholder="your email" />
                        <input type="text" name="street" placeholder="street" />
                        <input type="text" name="postal" placeholder="postal" />
                        <Button btnType="Success" clicked={this.onSendHandler}>ORDER</Button>
                    </form>
                </div>
            );
        }

        return (<Aux>{data}</Aux>);
    }
}


export default ContactData;