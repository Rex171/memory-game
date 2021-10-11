import {START_GAME, END_GAME} from "../actions/isGameStart";

const initialState = false;

const isGameStartReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GAME: {
            return true;
        }
        case END_GAME: {
            return false;
        }
        default: {
            return state;
        }
    }
}

export default isGameStartReducer;