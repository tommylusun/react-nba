

export const ADD_TEAMS = "ADD_TEAMS";
export const ADD_PLAYERS = "ADD_PLAYERS";

export function addTeams(payload) {
    return {
        type: ADD_TEAMS,
        payload
    };
}

export function addPlayers(payload) {
    return {
        type: ADD_PLAYERS,
        payload
    }
}