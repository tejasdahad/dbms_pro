import { firestore } from '../firebase/firebase';

export const addDomain = ({domain,subDomain,email,name,user,userId}) => async dispatch => {
    user = {
        ...user,
        domain,
        subDomain,
        email,
        name
    };
    await firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').doc(userId).set(user);
    console.log(user);
    dispatch({
        type: 'ADD_DOMAIN',
        payload: user
    });
} 

export const login = ({data, userId, flag}) => async dispatch => {
    const ndata = {
        data,userId,flag
    }
    dispatch({
        type:'LOGIN',
        payload:ndata
    })
};
