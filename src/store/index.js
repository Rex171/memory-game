import {combineReducers} from 'redux';
import currentCards from './reducers/currentCardsReducer';
import isGameStart from './reducers/isGameStartReducer';

export default combineReducers({
    currentCards,
    isGameStart
})