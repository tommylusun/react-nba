import { ADD_TEAMS, ADD_PLAYERS } from "../actions/";
const initialState = {
  teams: null,
  players: null
};
function rootReducer(state = initialState, action) {
    switch (action.type){
        case ADD_TEAMS:
            return {
                ...state,
                teams: action.payload
            };
        case ADD_PLAYERS:
            return {
                ...state,
                players: action.payload
            };
        default: return state;
    }
}
export default rootReducer;