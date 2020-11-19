const initialState = {
    user:null,
    domain:null,
    subdomain:null,
    email:null
};

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_DOMAIN':
            return {
                ...state,
                domain:action.user.domain,
                subdomain:action.user.subdomain,
                email:action.user.email
            }
        case 'LOGIN':
            return {
                ...state,
                user:action.payload
            }
        default:
            return state;
    }
};

export default usersReducer;