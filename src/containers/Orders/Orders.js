import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Constans from '../../constans/server';
import Spinner from '../../components/UI/Spinner/Spinner';



class Orders extends Component {

    state = {
        orders: []
    };

    componentDidMount(){
        axios.get(Constans.ORDERS)
            .then(this.resolveOrders)
    }

    resolveOrders = (result) =>{
        this.setState({
            orders: Object.entries(result.data)
        })
    };

    render() {

        let orders = <Spinner/>;
        if(this.state.orders.length){
            orders = this.state.orders.map((order, i)=>{
                return <Order
                    key={order[0]}
                    order={order[1]} />
            }, this);
        }


        return (
            <div>
                {orders}
            </div>
        );
    }
}


export default Orders;