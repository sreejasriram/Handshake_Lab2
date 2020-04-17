import { LOGIN_USER_SUCCESS } from "../constants/action-types";
import { LOGIN_USER_FAILURE } from "../constants/action-types";
import { SIGNUP_USER_SUCCESS } from "../constants/action-types";
import { SIGNUP_USER_FAILURE } from "../constants/action-types";
import { LOGOUT_USER } from "../constants/action-types";
import { FETCH_PROFILE_OF_USER,SAVE_CONTACT_OF_USER,FETCH_REGISTERED_EVENT_DATA,
    FETCH_EVENT_DATA,FETCH_EVENT_DETAILS_DATA,EVENT_ALREADY_APPLIED,EVENT_NOT_APPLIED,
    CHECK_STUDENT_ELIGIBILITY,FETCH_REGISTERED_JOB_DATA,FETCH_JOB_DATA,JOB_ALREADY_APPLIED,
    JOB_NOT_APPLIED,FETCH_JOB_DETAILS_DATA,FETCH_STUDENT_DATA,VIEW_STUDENT_PROFILE,SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_NOT_SUCCESS,FETCH_COMPANY_EVENT_DATA,FETCH_COMPANY_JOB_DATA,
    POST_NEW_JOB_SUCCESS,POST_NEW_JOB_NOT_SUCCESS,POST_NEW_EVENT_NOT_SUCCESS,POST_NEW_EVENT_SUCCESS,
    VIEW_EVENT_APPLICANTS,VIEW_JOB_APPLICANTS,FETCH_MESSAGE_DATA,FETCH_COMPANY_PROFILE_DATA } from "../constants/action-types";


//////////////

////////////////////
import axios from 'axios';
// import bcrypt from 'bcryptjs'
import {environment} from '../../Utils/constants';


export function loginUserSuccess(payload) {
    return { type: LOGIN_USER_SUCCESS, payload };
}


export function loginUserFailure() {
    return { type: LOGIN_USER_FAILURE };
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

// export const loginUser = ({ email, password }) => {
//     return dispatch => {
//         axios
//             .get(process.env.REACT_APP_BACKEND_URL + '/signin?email=' + email + '&password=' + password)
//             .then(response => {
//                 if (bcrypt.compareSync(password, response.data.password)) {
//                     console.log("Login success")
//                     dispatch(loginUserSuccess(response.data));
//                 } else {
//                     dispatch(loginUserFailure(response.data));
//                 }
//             })
//             .catch(err => {
//                 console.log("Login failure")
//                 dispatch(loginUserFailure(err.message));
//             });
//     };
// };

export const companyLogin = ( payload ) => {
    console.log(payload.email)
    console.log(payload.password)

    return dispatch => {
        axios.get(environment.baseUrl+'/company/company_signin/'+payload.email+"/"+payload.password)

            .then(response => {
                console.log("in frontend after response");  

                if (response.data.result) {
                    console.log(response.data.result);  
                    dispatch(loginUserSuccess(response.data.result));
                } else {
                    dispatch(loginUserFailure());
                }
            })
            
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






////////////////////////////////Profile ////////////////////////////////////////////////////
export function saveProfileData(payload) {
    return { type: FETCH_PROFILE_OF_USER, payload };
}
export const fetchProfile = () => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;

        axios.get(environment.baseUrl+'/student/student_profile_info/'+sessionStorage.getItem('id'))
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                response.data.rows = response.data.rows[0]
                console.log(response.data.rows)
                    if (response.data.rows) {
                        dispatch(saveProfileData(response.data.rows));

                    } 
                
                else if (response.data.error) {
                    dispatch(saveProfileData([]));
                }
            })

    };
};



export function saveeditedContact(payload) {
    return { type: SAVE_CONTACT_OF_USER, payload };
}
export const editContact = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.post(environment.baseUrl+'/student/student_contact_edited', payload)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    dispatch(saveeditedContact(response.data.result));
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(saveeditedContact([]));

                }
            }
            )

    };
};


export const editJourney = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.post(environment.baseUrl+'/student/student_journey_edited', payload)
        .then(response => {
            console.log("in frontend after response");
            console.log(response.data.result)
            if (response.data.result) {
                dispatch(saveeditedContact(response.data.result));

            } else if (response.data.error) {
                console.log("response" + response.data.error)
                dispatch(saveeditedContact([]));

            }
        }
        )

    };
};


export const editBasic = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.post(environment.baseUrl+'/student/student_basic_edited', payload)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    dispatch(saveeditedContact(response.data.result));

                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(saveeditedContact([]));

                }
            }
            )

    };
};



export const editSkill = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.post(environment.baseUrl+'/student/student_skill_edited', payload)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    dispatch(saveeditedContact(response.data.result));
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(saveeditedContact([]));

                }
            }
            )

    };
};


export const editProfilePic = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.post(environment.baseUrl+'/student/student_profilepic_edited', payload)
        .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    dispatch(saveeditedContact(response.data.result));
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(saveeditedContact([]));

                }
            }
            )

    };
};



export const editEducation = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.post(environment.baseUrl+'/student/student_education_edited', payload)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    dispatch(saveeditedContact(response.data.result));
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(saveeditedContact([]));

                }
            }
            )

    };
};



export const editExperience = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.post(environment.baseUrl+'/student/student_experience_edited', payload)
        .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                if (response.data.result) {
                    dispatch(saveeditedContact(response.data.result));
                } else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(saveeditedContact([]));

                }
            }
            )

    };
};
//////////////////////////////////////////////////////

////////////////////////////////Events/////////////////////////////////////////////


 
    
    export function fetchStudentData(payload) {
        return { type: FETCH_STUDENT_DATA, payload };
    }
    export const fetchStudents = () => {
        return dispatch => {
    
            axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
            axios.defaults.withCredentials = true;
    
            axios.get(environment.baseUrl + '/company/list_all_students')
            .then(response => {
                    console.log("in frontend after response");
                    console.log(response.data.rows)
                        if (response.data.rows) {
                            dispatch(fetchStudentData(response.data.rows));
    
                        } 
                    
                    else if (response.data.error) {
                        console.log("response" + response.data.error)

                        dispatch(fetchStudentData([]));
                    }
                })
    
        };
    };
    



    export function fetchJobData(payload) {
        return { type: FETCH_JOB_DATA, payload };
    }
    export const fetchJobs = () => {
        return dispatch => {
    
            axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
            axios.defaults.withCredentials = true;
    
            axios.get(environment.baseUrl+'/student/all_jobs_retrieve')
            .then(response => {
                    console.log("in frontend after response");
                    console.log(response.data.rows)
                        if (response.data.rows) {
                            dispatch(fetchJobData(response.data.rows));
    
                        } 
                    
                    else if (response.data.error) {
                        dispatch(fetchJobData([]));
                    }
                })
    
        };
    };
    







export function fetchEventData(payload) {
    return { type: FETCH_EVENT_DATA, payload };
}
export const fetchEvents = () => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;

        axios.get(environment.baseUrl + '/student/all_events_retrieve')
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                    if (response.data.rows) {
                        dispatch(fetchEventData(response.data.rows));

                    } 
                
                else if (response.data.error) {
                    dispatch(fetchEventData([]));
                }
            })

    };
};



   
    export function fetchRegisteredJobData(payload) {
        return { type: FETCH_REGISTERED_JOB_DATA, payload };
    }
    export const fetchRegisteredJobs = () => {
        return dispatch => {
    
            axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
            axios.defaults.withCredentials = true;
    
            axios.get(environment.baseUrl+'/student/list_applied_jobs/'+sessionStorage.getItem('id'))
            .then(response => {
                    console.log("in frontend after response");
                    console.log(response.data.rows)
                        if (response.data.rows) {
                            dispatch(fetchRegisteredJobData(response.data.rows));
    
                        } 
                    
                    else if (response.data.error) {
                        dispatch(fetchRegisteredJobData([]));
                    }
                })
    
        };
    };

export function fetchRegisteredEventData(payload) {
    return { type: FETCH_REGISTERED_EVENT_DATA, payload };
}
export const fetchRegisteredEvents = () => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;

        axios.get(environment.baseUrl + '/student/list_applied_events/' + sessionStorage.getItem('id'))
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                    if (response.data.rows) {
                        dispatch(fetchRegisteredEventData(response.data.rows));

                    } 
                
                else if (response.data.error) {
                    dispatch(fetchRegisteredEventData([]));
                }
            })

    };
};

////////////////////////////////////////////


    export function fetchJobDetailsData(payload) {
        return { type: FETCH_JOB_DETAILS_DATA, payload };
    }
    export const fetchJobDetails = (payload) => {
        return dispatch => {
    
            axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
            axios.defaults.withCredentials = true;
    
            axios.get(environment.baseUrl + '/student/jobs_details/' + payload.jobId)
            .then(response => {
                    console.log("in frontend after response");
                    console.log(response.data.rows)
                        if (response.data.rows) {
                            dispatch(fetchJobDetailsData(response.data.rows));
    
                        } 
                    
                    else if (response.data.error) {
                        dispatch(fetchJobDetailsData([]));
                    }
                })
    
        };
    };
    





export function fetchEventDetailsData(payload) {
    return { type: FETCH_EVENT_DETAILS_DATA, payload };
}
export const fetchEventDetails = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;

        axios.get(environment.baseUrl + '/student/events_details/' + payload.eventId)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                    if (response.data.rows) {
                        dispatch(fetchEventDetailsData(response.data.rows));

                    } 
                
                else if (response.data.error) {
                    dispatch(fetchEventDetailsData([]));
                }
            })

    };
};






    export function JobAlreadyApplied(payload) {
        return { type: JOB_ALREADY_APPLIED, payload };
    }
    export function JobNotApplied(payload) {
        return { type: JOB_NOT_APPLIED, payload };
    }
    
    export const jobAlreadyApplied = (payload) => {
        return dispatch => {
    
            axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
            axios.defaults.withCredentials = true;
    
            axios.get(environment.baseUrl + '/company/job_already_applied/' + payload.jobId + "/" + payload.studentId)
            .then(response => {
                    console.log("in frontend after response");
                    console.log(response.data.result)
                        if (response.data.result) {
                            dispatch(JobAlreadyApplied(response.data.result));
    
                        } 
                    
                    else if (response.data.error) {
                        console.log("response" + response.data.error)
    
                        dispatch(JobNotApplied([]));
                    }
                })
    
        };
    };
    





export function EventAlreadyApplied(payload) {
    return { type: EVENT_ALREADY_APPLIED, payload };
}
export function EventNotApplied(payload) {
    return { type: EVENT_NOT_APPLIED, payload };
}

export const eventAlreadyApplied = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;

            axios.get(environment.baseUrl + '/company/event_already_applied/' + payload.eventId + "/" + payload.studentId)
            .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                    if (response.data.result) {
                        dispatch(EventAlreadyApplied(response.data.result));

                    } 
                
                else if (response.data.error) {
                    console.log("response" + response.data.error)

                    dispatch(EventNotApplied([]));
                }
            })

    };
};



export function checkStudentEligibility(payload) {
    return { type: CHECK_STUDENT_ELIGIBILITY, payload };
}
export const studentEligibility = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;

        axios.get(environment.baseUrl + '/company/get_student_eligibility/' + payload.eventId + "/" + payload.studentId)
        .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                    if (response.data.rows) {
                        dispatch(checkStudentEligibility(response.data.rows));

                    } 
                
                else if (response.data.error) {
                    dispatch(checkStudentEligibility([]));
                }
            })



                  

    };
};

///////////////////////////////////////////////////
               
 
            export function viewStudentProfileData(payload) {
                return { type: VIEW_STUDENT_PROFILE, payload };
            }
            export const viewStudentProfile = (payload) => {
                return dispatch => {
            
                    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
                    axios.defaults.withCredentials = true;
            
                    axios.get(environment.baseUrl + '/company/get_student_profile/' + payload.id)
                    .then(response => {
                            console.log("in frontend after response");
                            console.log(response.data.rows)
                                if (response.data.rows) {
                                    dispatch(viewStudentProfileData(response.data.rows));
            
                                } 
                            
                            else if (response.data.error) {
                                console.log("response" + response.data.error)

                                dispatch(viewStudentProfileData([]));
                            }
                        })                             
            
                };
            };
            







export function sendMessageSuccess() {
    return { type: SEND_MESSAGE_SUCCESS };
}
export function sendMessageNotsent() {
    return { type: SEND_MESSAGE_NOT_SUCCESS };
}
export const sendmessage = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;

        axios.post(environment.baseUrl + '/company/send_message', payload)
        .then(response => {
                console.log("in frontend after response");
                console.log(response.data)
                    if (response.data) {
                        dispatch(sendMessageSuccess());

                    } 
                
                else if (response.data.error) {
                    console.log("response" + response.data.error)

                    dispatch(sendMessageNotsent());
                }
            })                             

    };
};



export function fetchcompanyeventdata(payload) {
    return { type: FETCH_COMPANY_EVENT_DATA,payload };
}
export const fetchCompanyEvents = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.get(environment.baseUrl+'/company/getevents/'+payload.companyId)//company_events_retrieve
        .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                    if (response.data.rows) {
                        dispatch(fetchcompanyeventdata(response.data.rows));

                    } 
                
                else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(fetchcompanyeventdata());
                }
            })                             

    };
};


export function fetchcompanyjobdata(payload) {
    return { type: FETCH_COMPANY_JOB_DATA,payload };
}
export const fetchCompanyJobs = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.get(environment.baseUrl+'/company/getjobs/'+payload.companyId)
        .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                    if (response.data.rows) {
                        dispatch(fetchcompanyjobdata(response.data.rows));

                    } 
                
                else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(fetchcompanyjobdata());
                }
            })                             

    };
};




    


export function postnewjobsuccess(payload) {
    return { type: POST_NEW_JOB_SUCCESS,payload };
}
export function postnewjobnotsuccess(payload) {
    return { type: POST_NEW_JOB_NOT_SUCCESS,payload };
}
export const postCompanyJobs = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.post(environment.baseUrl+'/company/post_job',payload)
        .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                    if (response.data.result) {
                        dispatch(postnewjobsuccess());

                    } 
                
                else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(postnewjobnotsuccess());
                }
            })                             

    };
};





export function postneweventsuccess(payload) {
    return { type: POST_NEW_EVENT_SUCCESS,payload };
}
export function postneweventnotsuccess(payload) {
    return { type: POST_NEW_EVENT_NOT_SUCCESS,payload };
}
export const postCompanyEvents = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.post(environment.baseUrl+'/company/post_events',payload)
        .then(response => {
                console.log("in frontend after response");
                console.log(response.data.result)
                    if (response.data.result) {
                        dispatch(postneweventsuccess());

                    } 
                
                else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(postneweventnotsuccess());
                }
            })                             

    };
};





export function jobapplicantsdata(payload) {
    return { type: VIEW_JOB_APPLICANTS,payload };
}
export const viewJobApplicants = (payload) => {
    return dispatch => {

        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.get(environment.baseUrl+'/company/list_applicants/'+payload.job_id)
        .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                    if (response.data.rows.length>0) {
                        dispatch(jobapplicantsdata(response.data.rows));
                    } 
                
                else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(jobapplicantsdata([]));
                }
            })                             

    };
};





export function eventapplicantsdata(payload) {
    return { type: VIEW_EVENT_APPLICANTS,payload };
}
export const viewEventApplicants = (payload) => {
    return dispatch => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.get(environment.baseUrl+'/company/list_event_applicants/'+payload.event_id)
        .then(response => {
                console.log("in frontend after response");
                console.log(response.data.rows)
                    if (response.data.rows.length>0) {
                        dispatch(eventapplicantsdata(response.data.rows));
                    }                 
                else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(eventapplicantsdata([]));
                }
            })                             

    };
};
      

export function fetchMessageData(payload) {
    return { type: FETCH_MESSAGE_DATA,payload };
}
export const fetchConversations = (payload) => {
    return dispatch => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.get(environment.baseUrl+'/company/fetch_convos/' + sessionStorage.getItem('id'))
        .then(response => {
                console.log("in frontend after response");
                console.log(response.data)
                    if (response.data.rows.length>0) {
                        dispatch(fetchMessageData(response.data.rows));
                    }                 
                else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(fetchMessageData([]));
                }
                else{
                    dispatch(fetchMessageData([]));
                }
            })           
        

    };
};
    


export function fetchCompanyProfileData(payload) {
    return { type: FETCH_COMPANY_PROFILE_DATA,payload };
}
export const fetchCompanyProfile = (payload) => {
    return dispatch => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        // axios.get(environment.baseUrl+'/company/profile/' + sessionStorage.getItem('id'))
        axios.get(environment.baseUrl+'/company/profile/' + payload)

        .then(response => {
                console.log("in frontend after response");
                console.log(response.data)
                    if (response.data.rows.length>0) {
                        dispatch(fetchCompanyProfileData(response.data.rows));
                    }                 
                else if (response.data.error) {
                    console.log("response" + response.data.error)
                    dispatch(fetchCompanyProfileData([]));
                }
            })           

    };
};




// export function uploadCompanyPictureData(payload) {
//     return { type: FETCH_COMPANY_PROFILE_DATA,payload };
// }
export const uploadCompanyPicture = (formData, config) => {
    return dispatch => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.post(environment.baseUrl+"/company/uploadpic",formData, config)     
             .then((response) => {
                dispatch(fetchCompanyProfile(sessionStorage.getItem('id')));               
            }).catch((error) => {
                console.log("error" + error)

            });     

    };
};





export function uploadStudentPictureData(payload) {
    return { type: FETCH_COMPANY_PROFILE_DATA,payload };
}
export const uploadStudentPicture = (formData, config) => {
    return dispatch => {
        axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        axios.defaults.withCredentials = true;
        axios.post(environment.baseUrl+"/student/uploadpic",formData, config)   
             .then((response) => {
                dispatch(saveeditedContact(response.data));
            }).catch((error) => {
                console.log("error" + error)

            });     

    };
};




