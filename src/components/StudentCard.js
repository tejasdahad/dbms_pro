import React, { Fragment, useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { firestore } from '../firebase/firebase';

const useStyles = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
}));
  
const StudentCard = ({ users }) => {
    const classes = useStyles();
    const [teacherName, setTeacherName] = useState('');
    const [teacherEmail,setTeacherEmail]= useState('');

    useEffect(() => {
      if(users.user.assigned){
        firestore.collection('2020-21').doc('TEACHERS').collection('TEACHERS').doc(users.user.teacherAssigned).get().then(d => {
          const data = d.data();
          setTeacherEmail(data.email);
          setTeacherName(data.name);
        })
      }
    },[]);
    
    return (
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center" style={{marginBottom:10,color:"blue"}}>
            Profile
          </Typography>
        <Grid container>
        <Grid item xs={12} style={{marginBottom:10}}>
          <Typography component="h6" variant="h6" align="center">
          Registration Id : <span style={{color:"grey"}}>{users.userId}</span>
          
        </Typography>
            </Grid>
            <Grid item xs={6}>
          <Typography component="h6" variant="h6" align="left">
          Name : <span style={{color:"grey"}}>{users.user.name}</span>
          
        </Typography>
            </Grid>
            <Grid item xs={6} style={{marginBottom:10}}>
            
          <Typography component="h6" variant="h6" align="right">
          Roll No. : <span style={{color:"grey"}}>{users.user.roll}</span>
          </Typography>
            </Grid>
            <Grid item xs={12} style={{marginBottom:10}}>
            <Typography component="h6" variant="h6" align="left">
            Email : <span style={{color:"grey"}}>{users.user.email}</span>
            </Typography>
            </Grid>
            <Grid item xs={6}>
            <Typography component="h6" variant="h6" align="left">
            Domain : <span style={{color:"grey"}}>{users.user.domain}</span>
            </Typography>
            </Grid>
            <Grid item xs={6} style={{marginBottom:10}}>
            <Typography component="h6" variant="h6" align="right">
            Sub Domain : <span style={{color:"grey"}}>{users.user.subDomain}</span>
            </Typography>
            </Grid>
            {users.user.assigned && <Fragment><Grid item xs={12} style={{marginBottom:10}}>
            <Typography component="h6" variant="h6" align="left">
            Teacher Assigned : <span style={{color:"grey"}}>{teacherName}</span>
            </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography component="h6" variant="h6" align="left">
            Teacher Email : <span style={{color:"grey"}}>{teacherEmail}</span>
            </Typography>
            </Grid>
            </Fragment>}
        </Grid>
        </Paper>
    )
}

const mapStateToProps = state => ({
    users: state.users
});

export default connect(mapStateToProps)(StudentCard);
