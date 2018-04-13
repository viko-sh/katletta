import * as ACTIONS_TYPES from './actionsTypes';
import axios from '../../axios-orders';
import ENDPOINTS from '../../constans/server';

/**
 *
 * @param id
 * @param orderData
 * @returns {{type, orderID: *, orderData: *}}
 */
export const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: ACTIONS_TYPES.PURCHASE_BURGER_SUCCESS,
		orderID: id,
		orderData: orderData,
	};
};

/**
 *
 * @param error
 * @returns {{type, error: *}}
 */
export const purchaseBurgerFail = error => {
	return {
		type: ACTIONS_TYPES.PURCHASE_BURGER_FAIL,
		error: error,
	};
};

/**
 *
 * @returns {object}
 */
export const purchaseBurgerStart = () => {
	return {
		type: ACTIONS_TYPES.PURCHASE_BURGER_START,
	};
};

export const purchaseInit = () => {
	return {
		type: ACTIONS_TYPES.PURCHASE_INIT,
	};
};

/**
 *
 * @param orderData
 * @returns {function(*)}
 */
export const purchaseBurger = orderData => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios
			.post(ENDPOINTS.ORDERS, orderData)
			.then(response => {
				dispatch(purchaseBurgerSuccess(response.data.name, orderData));
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error));
			});
	};
};

const ordersInitSuccess = ordersData => {
	return {
		type: ACTIONS_TYPES.ORDERS_INIT,
		ordersData: ordersData,
	};
};

const ordersInitStart = () => {
    return {
        type: ACTIONS_TYPES.ORDERS_START
    };
};

export const ordersInit = () => {
	return dispatch => {
	    dispatch(ordersInitStart());
		axios
			.get(ENDPOINTS.ORDERS)
			.then(response => {
				dispatch(ordersInitSuccess(response.data));
			})
			.catch(error => {
				dispatch(error);
			});
	};
};

