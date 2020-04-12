import {
    LOGIN_USER_SUCCESS, LOGOUT_USER,
    LOGIN_USER_FAILURE, SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE, FETCH_CARDS_OF_USER,
    TOGGLE_CREATE_CARD, CREATE_CARD_FAILURE,
    CREATE_CARD_SUCCESS, CLOSE_SIGNUP_MODAL
} from "../constants/action-types";
const initialState = {
    user: {
        "name": sessionStorage.getItem("name"),
        "id": sessionStorage.getItem("id"),
        "email": sessionStorage.getItem("email"),
        "token": sessionStorage.getItem("token")
    },
    invalidCredentials: false,
    signUpSuccessful: false,
    signupFailedError: false,
    cards: [],
    enableCreateCard: false
};

function rootReducer(state = initialState, action) {
    if (action.type === LOGIN_USER_SUCCESS) {
        sessionStorage.setItem("email", action.payload.email);
        sessionStorage.setItem("id", action.payload.id);
        sessionStorage.setItem("name", action.payload.name);
        sessionStorage.setItem("token", action.payload.token);
        delete action.payload['password'];
        return Object.assign({}, state, {
            user: action.payload,
            invalidCredentials: false,
            profile: action.payload,
            cards: action.payload.cards
        });
    }
    if (action.type === LOGIN_USER_FAILURE) {
        return Object.assign({}, state, {
            user: {},
            invalidCredentials: true
        });
    }
    if (action.type === SIGNUP_USER_SUCCESS) {
        delete action.payload['password'];
        return Object.assign({}, state, {
            signUpSuccessful: true,
            signupFailedError: false
        });
    }
    if (action.type === CLOSE_SIGNUP_MODAL) {
        return Object.assign({}, state, {
            signUpSuccessful: false
        });
    }
    if (action.type === SIGNUP_USER_FAILURE) {
        return Object.assign({}, state, {
            signUpSuccessful: false,
            signupFailedError: true
        });
    }
    if (action.type === LOGOUT_USER) {
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("token");
        return Object.assign({}, state, {
            user: {
                "name": "",
                "id": "",
                "email": "",
                "token": ""
            },
            cards: []
        });
    }
    if (action.type === FETCH_CARDS_OF_USER) {
        return Object.assign({}, state, {
            cards: action.payload
        });
    }
    if (action.type === TOGGLE_CREATE_CARD) {
        return Object.assign({}, state, {
            enableCreateCard: !state.enableCreateCard
        });
    }
    if (action.type === CREATE_CARD_SUCCESS) {
        return Object.assign({}, state, {
            enableCreateCard: false
        });
    }
    if (action.type === CREATE_CARD_FAILURE) {
        return Object.assign({}, state, {
            enableCreateCard: true
        });
    }
    return state;
}

export default rootReducer;