import React,{ Fragment, useEffect, useState } from 'react';
import Navbar from './Navbar';
import {makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {connect } from 'react-redux';
import { allocateStudent, test,clearData, finalUpdate } from '../actions/algo';
import { login } from '../actions/users';
import { firestore } from '../firebase/firebase';
import AllocationTable from './AllocationTable';

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
      borderRadius:20,
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
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: "black",
        color:"white",
        borderRadius:30
      },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
  

const Admin = ({ users, history, test, clearData, finalUpdate }) => {
    const [toggler,setToggler] = useState(false);
    const [tableData, setTableData] = useState([]);
    useEffect(() => {
        console.log('In user effect');
        console.log(users);
        if(users.userType===null){
          console.log('in case');
          history.push('/');
        }
      },[users]);

    const classes = useStyles();

    useEffect(() => {
      if(users.teacherData && users.studentData){
        history.push('/allocated');
      }
    },[users.studentData]);

  useEffect(() => {
    if(localStorage.getItem('userid')){
      login({pass: localStorage.getItem('pass'),userId: localStorage.getItem('userid')});      
    }
  },[]);

  useEffect(() => {
      const data = [];
    firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').onSnapshot((snapshot) => {
        snapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
        console.log(data);
        setTableData(data);
    });
  },[]);

  const handleAllocate = (e) => {
      e.preventDefault();
     test({finalUpdate});
  }

    return (
        <div>
            <Navbar />
            <Fragment>
                {!toggler&&<Paper className={classes.paper}>
                  <Typography component="h1" variant="h4" align="center" style={{marginBottom:10,color:"blue"}}>
                      Admin
                  </Typography>
                  <Grid container>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={4} style={{marginBottom:10}}>
                      <Button  variant="contained" color="primary" size="medium" onClick={handleAllocate}>Allocate</Button>
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={4} style={{marginBottom:10}}>
                    <Button variant="contained" color="primary" size="medium" onClick={e => {
                      e.preventDefault();
                      setToggler(true);
                    }}>View Submissions</Button>
                    <Grid item xs={1}>
                      <Button variant="contained" color="primary" size="medium" onClick={e => {
                      e.preventDefault();
                      clearData();
                      }}>Clear Data</Button></Grid>
                    </Grid>
                  </Grid>
                </Paper>}
                {toggler && <Fragment>
                  <Grid container> 
                      <Grid item xs={12}  style={{marginTop:20, marginBottom:20}}>
                        <AllocationTable rows={tableData} />
                      </Grid>
                      <Button variant="contained" color="primary" size="large" style={{display: "block", marginLeft:"auto", marginRight: "auto", widht:"auto"}} onClick={e => {
                        e.preventDefault();
                        setToggler(false);
                      }}>Back to menu</Button>
                  </Grid>
                </Fragment>}
            </Fragment>
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps,{ allocateStudent, test, clearData, finalUpdate })(Admin);