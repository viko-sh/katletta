import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Constans from '../../../constans/server';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Aux from '../../../hoc/Util/Util';

import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        prices: {},
        loading: false,
        orderForm:{
            name: {
                elem: 'input',
                config:{
                    type: 'text',
                    label: 'Your name',
                    value: ''
                },
                validation: {
                    required: true
                },
                isValid: true,
                touched: false
            },
            email: {
                elem: 'input',
                config:{
                    type: 'text',
                    label: 'Your email',
                    value: ''
                },
                validation: {
                    required: true
                },
                isValid: true,
                touched: false
            },
            address: {
                elem: 'input',
                config:{
                    type: 'text',
                    label: 'Your address',
                    value: ''
                },
                validation: {
                    required: true
                },
                isValid: true,
                touched: false
            }
        },
        deliveryMethod: 'fastest',
        formIsValid: false
    };

    componentDidMount(){
        axios.get(Constans.INGREDIENT_PRICES)
            .then(this.resolveIngredientPrices)
            .catch(error => {
                this.setState({error: true});
            });
    }

    checkValidity(value, rules){
        let isValid = false;

        if(rules.required){
            isValid = value.trim() !== '';
        }

        return isValid;
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
                name: this.state.orderForm.name.config.value,
                address: this.state.orderForm.address.config.value,
                email: this.state.orderForm.email.config.value,
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

    inputChangedHandler = (event, input) =>{
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedOrderFormElement = {
            ...updatedOrderForm[input]
        };

        updatedOrderFormElement.config.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidity(event.target.value, updatedOrderFormElement.validation);

        updatedOrderFormElement.touched = true;

        updatedOrderForm[input] = updatedOrderFormElement;


        let isFormValid = true;

        for(let input in updatedOrderForm){
            isFormValid = updatedOrderForm[input].valid && isFormValid;
        }

        console.log(isFormValid);
        this.setState({orderForm: updatedOrderForm,formIsValid:!isFormValid});
    };

    render() {

        let data = <Spinner/>;

        const form = Object.keys(this.state.orderForm).map((input, i)=>{
            let elem = this.state.orderForm[input];
           return <Input
                    key={i}
                    name={input}
                    value={elem.config.value}
                    label={elem.config.label}
                    type={elem.config.type}
                    invalid={elem.valid}
                    touched={elem.touched}
                    changed={(event) => this.inputChangedHandler(event, input)}/>
        }, this);

        if(!this.state.loading){
            data = (
                <div className={classes.ContactData}>
                    <h4>Enter your Contact Data</h4>
                    <form>
                        {form}
                        {/*<Input type="text" name="name" label="your name" />*/}
                        {/*<Input type="email" name="email" label="your email" />*/}
                        {/*<Input type="text" name="street" label="street" />*/}
                        {/*<Input type="text" name="postal" label="postal" />*/}
                        <Button btnType="Success" disabled={this.state.formIsValid} clicked={this.onSendHandler}>ORDER</Button>
                    </form>
                </div>
            );
        }

        return (<Aux>{data}</Aux>);
    }
}


export default ContactData;