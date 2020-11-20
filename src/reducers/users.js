const initialState = {
    user:null,
    userId: null,
    userType:null
};

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_DOMAIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGIN':
            return {
                ...state,
                user:action.payload.data,
                userId: action.payload.userId,
                userType:action.payload.flag
            }
        default:
            return state;
    }
};

export default usersReducer;