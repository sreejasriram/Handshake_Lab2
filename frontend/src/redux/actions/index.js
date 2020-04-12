import { LOGIN_USER_SUCCESS } from "../constants/action-types";
import { LOGIN_USER_FAILURE } from "../constants/action-types";
import { SIGNUP_USER_SUCCESS } from "../constants/action-types";
import { SIGNUP_USER_FAILURE } from "../constants/action-types";
import { LOGOUT_USER } from "../constants/action-types";
import { FETCH_CARDS_OF_USER } from "../constants/action-types";
import { TOGGLE_CREATE_CARD } from "../constants/action-types";
import { CREATE_CARD_SUCCESS } from "../constants/action-types";
import { CREATE_CARD_FAILURE } from "../constants/action-types";
import { CLOSE_SIGNUP_MODAL } from "../constants/action-types";
import axios from 'axios';
import bcrypt from 'bcryptjs'

export function loginUserSuccess(payload) {
    return { type: LOGIN_USER_SUCCESS, payload };
}

export function closeSignupModal(payload) {
    return { type: CLOSE_SIGNUP_MODAL, payload };
}

export function loginUserFailure(payload) {
    return { type: LOGIN_USER_FAILURE, payload };
}

export function logoutUser(payload) {
    return { type: LOGOUT_USER, payload };
}

export function signUpUserSuccess(payload) {
    return { type: SIGNUP_USER_SUCCESS, payload };
}

export function signUpUserFailure(payload) {
    return { type: SIGNUP_USER_FAILURE, payload };
}

export const loginUser = ({ email, password }) => {
    return dispatch => {
        axios
            .get(process.env.REACT_APP_BACKEND_URL + '/signin?email=' + email + '&password=' + password)
            .then(response => {
                if (bcrypt.compareSync(password, response.data.password)) {
                    console.log("Login success")
                    dispatch(loginUserSuccess(response.data));
                } else {
                    dispatch(loginUserFailure(response.data));
                }
            })
            .catch(err => {
                console.log("Login failure")
                dispatch(loginUserFailure(err.message));
            });
    };
};

export const signUpUser = (payload) => {
    return dispatch => {
        let url = process.env.REACT_APP_BACKEND_URL + '/signup';
        axios.defaults.withCredentials = true;
        axios.post(url, payload)
            .then(response => {
                if (response.status === 200) {
                    dispatch(signUpUserSuccess({}));
                }
            })
            .catch((error) => {
                console.log("Error during Sign Up")
                dispatch(signUpUserFailure({}));
            });
    };
};

export function toggleCreateCard(payload) {
    return { type: TOGGLE_CREATE_CARD, payload };
}

export function createCardSuccess() {
    return { type: CREATE_CARD_SUCCESS };
}

export function createCardFailure() {
    return { type: CREATE_CARD_FAILURE };
}

export const createCard = (payload) => {
    return dispatch => {
        let url = process.env.REACT_APP_BACKEND_URL + '/user/' + sessionStorage.getItem("id") + '/cards';
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.post(url, payload)
            .then(response => {
                if (response.status === 200) {
                    dispatch(fetchCards());
                    dispatch(createCardSuccess());
                }
            })
            .catch((error) => {
                console.log("Error in creating Card")
                dispatch(createCardFailure());
            });
    };
};

export function saveCardData(payload) {
    return { type: FETCH_CARDS_OF_USER, payload };
}

export const fetchCards = () => {
    return dispatch => {
        let url = process.env.REACT_APP_BACKEND_URL + '/user/' + sessionStorage.getItem("id") + '/cards';
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.get(url)
            .then(response => {
                if (response.status === 200) {
                    dispatch(saveCardData(response.data));
                } else {
                    dispatch(saveCardData([]));
                }
            })
            .catch((error) => {
                console.log("Error in fetching Card Data")
                dispatch(saveCardData([]));
            });
    };
};
