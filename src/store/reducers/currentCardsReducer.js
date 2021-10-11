import {ADD_CURRENT_CARD_ONE, PURE_CURRENT_CARD_ONE} from "../actions/currentCardOne";
import {ADD_CURRENT_CARD_TWO, PURE_CURRENT_CARD_TWO} from '../actions/currentCardTwo';

const initialState = {cardOne: null, cardTwo: null};

const currentCardsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CURRENT_CARD_ONE: {
            return {cardOne: action.payload, cardTwo: state.cardTwo};
        }
        case ADD_CURRENT_CARD_TWO: {
            return {cardOne: state.cardOne, cardTwo: action.payload};
        }
        case PURE_CURRENT_CARD_ONE: {
            return {cardOne: null, cardTwo: state.cardTwo};
        }
        case PURE_CURRENT_CARD_TWO: {
            return {cardOne: state.cardOne, cardTwo: null};
        }
        default: {
            return state;
        }
    }
}

export default currentCardsReducer;
