const initialState = {
    user:null,
    userId: null,
    userType:null,
    error: null
};

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case 'ADD_DOMAIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGIN':
            localStorage.setItem('userid',action.payload.userId);
            localStorage.setItem('pass',action.payload.data.pass);
            return {
                ...state,
                user:action.payload.data,
                userId: action.payload.userId,
                userType:action.payload.flag
            }
        case 'LOGIN_ERROR':
            localStorage.removeItem('userid');
            localStorage.removeItem('pass');
            return {
                ...state,
                error: 'Invalid credentials'
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null
            };
        case 'CLEAR_DATA':
            localStorage.removeItem('userid');
            localStorage.removeItem('pass');
            return {
                user: null,
                userId: null,
                userType: null
            };
        default:
            return state;
    }
};

export default usersReducer;