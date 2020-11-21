import React,{ useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import StudentDomain from './StudentDomain';
import TeacherDomain from './TeacherDomain';
import { connect } from 'react-redux';
import { login } from '../actions/users';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://pict.edu">
          Pune Institue of Computer Technology
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
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
  
  
  const Domain = ({ users, login }) => {
    const classes = useStyles();

    useEffect(() => {
      if(localStorage.getItem('userid')){
        login({pass: localStorage.getItem('pass'),userId: localStorage.getItem('userid')});
      }
    },[]);
  
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
        {users.userType==='S'?<StudentDomain/>:<TeacherDomain />}
          
          <Copyright />
        </main>
      </React.Fragment>
    );
  }
  
  const mapStateToProps = state => ({
      users: state.users
  });
  
  export default connect(mapStateToProps,{ login })(Domain);  