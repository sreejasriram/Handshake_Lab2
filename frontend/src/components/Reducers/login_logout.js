export const login_logout = (state=false,action)=>
{
    switch(action.type){
    case 'SIGNIN':
        return !state;
    }
}
export default login_logout;