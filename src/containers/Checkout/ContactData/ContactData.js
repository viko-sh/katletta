import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {

    state = {
        name: '',
        address: {
            street: '',
            zipCode: null,
            country:''
        },
        email: '',
        deliveryMethod: 'fastest'
    };

    onSendHandler(){
        console.log(this);
    }

    render() {

        console.log(this);

        return (
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
}


export default ContactData;