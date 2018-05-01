import * as ACTIONS_TYPES from '../actions/actionsTypes';

const initialState = {
	orders: [],
	loading: true,
	purchased: false,
	error: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS_TYPES.PURCHASE_INIT:
			return {
				...state,
				purchased: false,
                loading: false
			};

        case ACTIONS_TYPES.PURCHASE_BURGER_SUCCESS:
			const order = [
				...action.orderData,
                ...{id: action.orderID},
            ];

			return {
				...state,
				loading: false,
				purchased: true,
				orders: state.orders.concat(order),
				error: false,
			};
		case ACTIONS_TYPES.PURCHASE_BURGER_FAIL:
			return {
				...state,
				loading: false,
				error: state.error,
			};
		case ACTIONS_TYPES.PURCHASE_BURGER_START:
			return {
				...state,
				loading: true,
			};
        case ACTIONS_TYPES.ORDERS_START:
            return {
                ...state,
                loading: true
            };
		case ACTIONS_TYPES.ORDERS_INIT:
			let orders = [];
			if(action.ordersData){
                orders = Object.entries(action.ordersData);
			}

			return {
				...state,
				orders: orders,
				loading: false,
				error: false,
			};
		default:
			return state;
	}
};

export default reducer;
