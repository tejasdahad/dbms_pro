const usersReducerDefaultState = [];

const usersReducer = (state = usersReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_DOMAIN':
            return [
                ...state,
                action.user
            ];
        default:
            return state;
    }
};

export default usersReducer;