
export const addDomain = ({domain='', subdomain='', email=''} = {}) => ({
    type: 'ADD_DOMAIN',
    user:{
        domain,
        subdomain,
        email
    }
});