import {
    LOGIN_USER_SUCCESS, LOGOUT_USER,
    LOGIN_USER_FAILURE, SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,
    ///////////////////////////
    FETCH_PROFILE_OF_USER,SAVE_CONTACT_OF_USER,
    FETCH_REGISTERED_EVENT_DATA,FETCH_EVENT_DATA,
    FETCH_EVENT_DETAILS_DATA,EVENT_ALREADY_APPLIED,EVENT_NOT_APPLIED,
    CHECK_STUDENT_ELIGIBILITY,FETCH_REGISTERED_JOB_DATA,FETCH_JOB_DATA,
    JOB_ALREADY_APPLIED,JOB_NOT_APPLIED,FETCH_JOB_DETAILS_DATA,
    FETCH_STUDENT_DATA,VIEW_STUDENT_PROFILE,SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_NOT_SUCCESS,FETCH_COMPANY_EVENT_DATA,FETCH_COMPANY_JOB_DATA,
    POST_NEW_JOB_SUCCESS,POST_NEW_JOB_NOT_SUCCESS,POST_NEW_EVENT_SUCCESS,
    POST_NEW_EVENT_NOT_SUCCESS,VIEW_JOB_APPLICANTS,VIEW_EVENT_APPLICANTS,
    FETCH_MESSAGE_DATA,FETCH_COMPANY_PROFILE_DATA

} from "../constants/action-types";


const initialState = {
    // user: {
    //     "name": sessionStorage.getItem("name"),
    //     "id": sessionStorage.getItem("id"),
    //     "email": sessionStorage.getItem("email"),
    //     "token": sessionStorage.getItem("token")
    // },
    // invalidCredentials: false,
    // signUpSuccessful: false,
    // signupFailedError: false,
    ////
    profileData:{},
    registeredEvents:{},
    allEvents:{},
    allJobs:{},
    allStudents:{},
    studData:{},
    eventDetails:{},
    jobDetails:{},
    already_applied:false,
    job_already_applied:false,
    stud_major:"",
    registeredJobs:{},
    allCompanyEvents:{},
    allCompanyJobs:{},
    jobapplicants:{},
    eventapplicants:{},
    companyProfile:{},
    redirectToMessages:false,
    jobposted:false,
    eventposted:false,
    cred:false,
    authFlag:false,
    messagelist:{}
};

function rootReducer(state = initialState, action) {
    if (action.type === LOGIN_USER_SUCCESS) {    
        console.log(action.payload)
        sessionStorage.setItem("token", action.payload);
        return Object.assign({}, state, {
            authFlag: true,
            cred: false
        });
    }
    if (action.type === LOGIN_USER_FAILURE) {
        return Object.assign({}, state, {
            authFlag: false,
            cred: true
        });
    }
    if (action.type === SIGNUP_USER_SUCCESS) {
        delete action.payload['password'];
        return Object.assign({}, state, {
            signUpSuccessful: true,
            signupFailedError: false
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
  

    if (action.type === FETCH_PROFILE_OF_USER) {
        console.log(action.payload)
        return Object.assign({}, state, {

            profileData: action.payload
        });
    }

    if (action.type === SAVE_CONTACT_OF_USER) {
        console.log(action.payload)
        return Object.assign({}, state, {

            profileData: action.payload
        });
    }
    if (action.type === FETCH_REGISTERED_EVENT_DATA) {
        console.log(action.payload)
        return Object.assign({}, state, {

            registeredEvents: action.payload
        });
    }
    if (action.type === FETCH_REGISTERED_JOB_DATA) {
        console.log(action.payload)
        return Object.assign({}, state, {

            registeredJobs: action.payload
        });
    }
    
    if (action.type === FETCH_EVENT_DATA) {
        console.log(action.payload)
        return Object.assign({}, state, {

            allEvents: action.payload
        });
    }
    if (action.type === FETCH_JOB_DATA) {
        console.log(action.payload)
        return Object.assign({}, state, {

            allJobs: action.payload
        });
    }
    if (action.type === FETCH_STUDENT_DATA) {
        console.log(action.payload)
        return Object.assign({}, state, {

            allStudents: action.payload
        });
    }
    
    if (action.type === FETCH_COMPANY_PROFILE_DATA) {
        console.log(action.payload)
        return Object.assign({}, state, {

            companyProfile: action.payload
        });
    }
    if (action.type === VIEW_STUDENT_PROFILE) {
        console.log(action.payload)
        return Object.assign({}, state, {

            studData: action.payload
        });
    }
    
    
    if (action.type === FETCH_EVENT_DETAILS_DATA) {
        console.log(action.payload)
        return Object.assign({}, state, {

            eventDetails: action.payload
        });
    }
    if (action.type === FETCH_JOB_DETAILS_DATA) {
        console.log(action.payload)
        return Object.assign({}, state, {

            jobDetails: action.payload
        });
    }
    
    
    if (action.type === EVENT_ALREADY_APPLIED) {
        console.log(action.payload)
        return Object.assign({}, state, {

            already_applied:true
        });
    }
    if (action.type === EVENT_NOT_APPLIED) {
        console.log(action.payload)
        return Object.assign({}, state, {

            already_applied:false

        });
    }

    if (action.type === JOB_ALREADY_APPLIED) {
        console.log(action.payload)
        return Object.assign({}, state, {

            job_already_applied:true
        });
    }
    if (action.type === SEND_MESSAGE_SUCCESS) {
        return Object.assign({}, state, {

            redirectToMessages:true
        });
    }
    if (action.type === SEND_MESSAGE_NOT_SUCCESS) {
        return Object.assign({}, state, {

            redirectToMessages:false
        });
    }
    
    if (action.type === JOB_NOT_APPLIED) {
        console.log(action.payload)
        return Object.assign({}, state, {

            job_already_applied:false

        });
    }
    if (action.type === CHECK_STUDENT_ELIGIBILITY) {
        console.log(action.payload)
        return Object.assign({}, state, {

            stud_major: action.payload
            

        });
    }
    if (action.type === FETCH_COMPANY_EVENT_DATA) {
        console.log(action.payload)
        return Object.assign({}, state, {

            allCompanyEvents: action.payload
            

        });
    }
    if (action.type === FETCH_COMPANY_JOB_DATA) {
        console.log(action.payload)
        return Object.assign({}, state, {

            allCompanyJobs: action.payload
            

        });
    }
    if (action.type === FETCH_MESSAGE_DATA) {
        console.log(action.payload)
        return Object.assign({}, state, {

            messagelist: action.payload,
            redirectToMessages:false

            

        });
    }
    
    if (action.type === VIEW_JOB_APPLICANTS) {
        console.log(action.payload)
        return Object.assign({}, state, {

            jobapplicants: action.payload
            

        });
    }
    if (action.type === VIEW_EVENT_APPLICANTS) {
        console.log(action.payload)
        return Object.assign({}, state, {

            eventapplicants: action.payload
            

        });
    }
    
    
    
    if (action.type === POST_NEW_JOB_SUCCESS) {
        return Object.assign({}, state, {

            jobposted: true
            

        });
    }
    

    if (action.type === POST_NEW_JOB_NOT_SUCCESS) {
        return Object.assign({}, state, {

            jobposted: false
            

        });
    }

    if (action.type === POST_NEW_EVENT_SUCCESS) {
        return Object.assign({}, state, {

            eventposted: true
            

        });
    }
    

    if (action.type === POST_NEW_EVENT_NOT_SUCCESS) {
        return Object.assign({}, state, {

            eventposted: false
            

        });
    }
    

    return state;
}

export default rootReducer;