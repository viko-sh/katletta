import * as ACTIONS_TYPES from './actionsTypes';
import axios from '../../axios-orders';
import ENDPOINTS from '../../constans/server';

export const addIngredient = name => {
	return {
		type: ACTIONS_TYPES.ADD_INGREDIENT,
		ingredientName: name,
	};
};

export const removeIngredient = name => {
	return {
		type: ACTIONS_TYPES.REMOVE_INGREDIENT,
		ingredientName: name,
	};
};

export const setIngredients = (response) =>{
	const ingredients = response.data;
	return{
		type: ACTIONS_TYPES.SET_INGREDIENTS,
        ingredients: ingredients
	}
};


export const initIngredients = () => {
    return dispatch => {

		axios.get(ENDPOINTS.INGREDIENTS)
			.then(response => {
                dispatch(setIngredients(response));
			})
			.catch(error => {
				dispatch(fetchIngredientsFailed());
			});
	}
};

export const fetchIngredientsFailed = () => {
    return {
        type: ACTIONS_TYPES.FETCH_INGREDIENTS_FAILED
    }
};