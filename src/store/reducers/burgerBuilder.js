import * as ACTIONS_TYPES from '../actions/actionsTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    return {
        //copy state
        ...state,
        //hover write the data
        ingredients: {
            //copy state ingredients
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
};

const reducer = (state = initialState, action) =>{
    switch(action.type){
        case ACTIONS_TYPES.ADD_INGREDIENT:
            return addIngredient(state, action);
        case ACTIONS_TYPES.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };

        case ACTIONS_TYPES.SET_INGREDIENTS:

            console.log(ACTIONS_TYPES.SET_INGREDIENTS);
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false
            };
        case ACTIONS_TYPES.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default reducer;