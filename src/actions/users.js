
export const addDomain = ({domain='', subdomain='', email=''}) => ({
    type: 'ADD_DOMAIN',
    user:{
        domain,
        subdomain,
        email
    }
});

export const login = ({data}) => async dispatch => {
    dispatch({
        type:'LOGIN',
        payload:data
    })
};