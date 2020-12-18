import React,{ useEffect, Fragment} from 'react'
import { connect } from 'react-redux';
import { finalUpdate,clearState } from '../actions/algo';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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

const Dummy = ({ finalUpdate, users, history,clearState }) => {
    useEffect(() => {
        if(users.studentData){
            finalUpdate({teacherData: users.teacherData, studentData: users.studentData});
        }
    }, []);

    const classes = useStyles();
    
    const handleClick = (e) => {
        e.preventDefault();
        clearState();
        history.push('/admin');
    }
    return (
        <div>
            <Navbar />
            <Fragment>
                <Paper className={classes.paper} style={{alignContent: "center"}}>
                    <Typography component="h1" variant="h4" align="center" style={{marginBottom:10,color:"blue"}}>
                        Allocated Successfully
                    </Typography>
                    <img src='/successful.gif' style={{display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: "20px",
                        width: "20%"}}
                    />
                    <Button variant="contained" color="primary" onClick={handleClick} style={{display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "20%"}}>Back to dashboard</Button>
                </Paper>
            </Fragment> 
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.users
});

export default connect(mapStateToProps,{ finalUpdate,clearState })(Dummy);