import React,{ Fragment, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import DomainListItem from './DomainListItem';
import { firestore } from '../firebase/firebase';
import AllocationTable from './AllocationTable';
import Button from '@material-ui/core/Button';

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
      borderRadius:20
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
        maxWidth: 1000,
        backgroundColor: "black",
        color:"white",
        borderRadius:30
      },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
  
const TeacherCard = ({ users, history }) => {
    const classes = useStyles();
    const [stuData, setStuData] = useState([]);
    const [toggler,setToggler] = useState(false);

    useEffect(() => {
      console.log('In user effect');
      if(!users.user){
        console.log('in case');
        history.push('/');
      }
    },[users]);

    useEffect(() => {
      if(users.user){
        firestore.collection('2020-21').doc('STUDENTS').collection('STUDENTS').where("teacherAssigned","==",users.userId).get()
        .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => (
            {
                id: doc.id,
                ...doc.data()
            }
        ));
        setStuData(data);
        });
      }
      
    },[users.user]);
  
    useEffect(() => {
      if(!users.user){
        history.push('/');
      }
    },[]);
    return (
      <Fragment>
        {!toggler && <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center" style={{marginBottom:10,color:"blue"}}>
            Teacher Profile
          </Typography>
          <Grid container>
            <Grid item xs={12} style={{marginBottom:10}}>
              <Typography component="h6" variant="h6" align="center">
                Registration Id : <span style={{color:"grey"}}>{users.userId}</span> 
              </Typography>
            </Grid>
            <Grid item xs={12}>
            <Typography component="h6" variant="h6" align="center">
              Name : <span style={{color:"grey"}}>{users.user.name}</span>
            </Typography>
          </Grid>
          <Grid item xs={12} style={{marginBottom:10}}>
            <Typography component="h6" variant="h6" align="center">
             Email : <span style={{color:"grey"}}>{users.user.email}</span>
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader" style={{color:"white"}}>
                Domain Selected
                </ListSubheader>
              }
              className={classes.root}
              >
              { users.user.domain.map(d => 
                <DomainListItem key={d} item={d} />
              )}    
              </List>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4} style={{marginTop:20}}>
              {(stuData && stuData.length>0) && <Button variant="contained" color="primary" onClick={e => {
                e.preventDefault();
                setToggler(true);
              }}>View Allocated Students</Button>}
            </Grid>
          </Grid>
        </Paper>}
        {toggler && <Fragment>
          <Grid container>
              <Grid item xs={12}  style={{marginTop:20, marginBottom:20}}>
                <AllocationTable rows={stuData} />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={5}></Grid>
              <Grid item xs={2}>
                <Button style={{marginLeft:"auto",marginRight:"auto"}} variant="contained" color="primary" onClick={e => {
                  e.preventDefault();
                  setToggler(false);
                }}>Back to menu</Button>
              </Grid>
          </Grid>
        </Fragment>}
      </Fragment>
    )
}
const mapStateToProps = state => ({
    users: state.users
})
export default connect(mapStateToProps)(TeacherCard);
