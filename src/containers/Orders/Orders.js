import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Note from '../../components/Note/Note';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {
	componentDidMount() {
		this.props.onOrdersInit();
	}

	mapOrders = () =>{
		return this.props.orders.map((order) => {
            return <Order key={order[0]} order={order[1]} />;
        }, this);
	};

	render() {

		if(this.props.loading){
			return <Spinner />;
		}

		if(!this.props.orders.length){
			return <Note message="There is not orders"/>
		}

        return <div>{this.mapOrders()}</div>;
	}
}

const mapStateToProps = state => {
	return {
		orders: state.orders.orders,
		error: state.orders.error,
        loading:state.orders.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrdersInit: () => dispatch(actions.ordersInit()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	WithErrorHandler(Orders, axios),
);
