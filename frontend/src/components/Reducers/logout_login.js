export const logout_login = (state=true,action)=>
{
    switch(action.type){
    case 'SIGNOUT':
        return !state;
    }
}
export default logout_login;