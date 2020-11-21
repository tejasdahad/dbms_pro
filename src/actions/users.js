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

export const login = ({pass, userId}) => async dispatch => {
    var de,data,flag;
    de = await firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').doc(userId).get();
    data = de.data();
    if(data){
      flag='S';
    }else{
      de = await firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').doc(userId).get();
      data = de.data();
      if(data){
        flag='T';
      }
    }
    if(data && data.pass===pass){
        console.log(data);
        const ndata = {
            data,userId,flag
        }
        dispatch({
            type:'LOGIN',
            payload:ndata
        });
    }else{
        console.log('Not found or invalid cred');
        dispatch({
            type:"LOGIN_ERROR"
        })
    }
    
};


export const clearError = () => dispatch => {
    dispatch({
        type:'CLEAR_ERROR'
    });
}

export const clearData = () => dispatch => {
    dispatch({
        type:'CLEAR_DATA'
    });
}