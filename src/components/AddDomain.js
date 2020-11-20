import React,{ Fragment, useState } from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { addDomain }  from '../actions/users';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &':{
            marginTop: theme.spacing(3),
        },
    },
    input:{
        borderRadius:4,
        position:'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px  solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color','box-shadow']),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus':{
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
     },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    margin:{
        margin: theme.spacing(1),
    },
    layout: {
        width: 'auto',
        marginTop:theme.spacing(4),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
          marginTop: theme.spacing(6),
          marginBottom: theme.spacing(6),
          padding: theme.spacing(3),
        },
      },
      button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
}));

const AddDomain = ({addDomain,users,history }) => {
    const classes = useStyles();
    const [domain,setDomain] = useState('');
    const [subDomain,setSubdomain] = useState('');
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    return (
        <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center" style={{marginBottom:10,color:"blue"}}>
            Add Domain
          </Typography>
            <Grid container>
                <Grid item xs={6}>
                    <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={e => {
                        e.preventDefault();
                        setName(e.target.value);
                    }} />
                </Grid>
                <Grid item xs={6} style={{marginBottom:20}}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={e => {
                        e.preventDefault();
                        setEmail(e.target.value);
                    }} />
                </Grid>
                
                <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Domain</InputLabel>
                    <Select
                        native
                        value={domain}
                        onChange={e => {
                            e.preventDefault();
                            setDomain(e.target.value);
                        }}
                        label="Domain"
                    >
                        <option aria-label="None" value="" />
                        <option value={"Machinelearning"}>Machine Learning</option>
                        <option value={"Datascience"}>Data Science</option>
                        <option value={"Cybersecurity"}>Cybersecurity</option>
                        <option value={"Blockchain"}>Blockchain</option>
                        <option value={"IOT"}>Internet of Things</option>
                    </Select>
                    </FormControl>
                   
                </Grid>
                <Grid item xs={6}>
                    {domain!=='' && <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">Sub Domain</InputLabel>
                    <Select
                        native
                        value={subDomain}
                        onChange={e => {
                            e.preventDefault();
                            setSubdomain(e.target.value);
                        }}
                        label="Sub Domain"
                    >
                        <option aria-label="None" value="" />
                        { domain === 'Machinelearning' && <option value={"Image rec"}>Image Recognition</option>}
                        { domain === 'Machinelearning' && <option value={"NLP"}>NLP</option>}
                        { domain === 'Datascience' && <option value={"Analysis"}>Data Analysis</option>}
                        { domain === 'Cybersecurity' && <option value={"Pentester"}>Penetration testing</option>}
                        { domain === 'Blockchain' && <option value={"Cryptocurrency"}>CryptoCurrency</option>}
                        { domain === 'IOT' && <option value={'Softdev'}>Software Devloper</option>}
                    </Select>
                    </FormControl>}
                   
                </Grid>
               
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                    <Button disabled={
                        (domain!==''&&subDomain!==''&&email!==''&&name!=='')?false:true
                    } className={classes.button} variant="contained" color="primary" onClick={(e) => {
                        e.preventDefault();
                        addDomain({domain,subDomain,email,name, user:users.user,userId: users.userId});
                        history.push("/profile");
                    }}>Submit</Button>
                </Grid>
            </Grid>
                         
              
            
            </Paper>
            <Copyright />
            
        </main>
        
        </Fragment>
    );
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps,{ addDomain })(AddDomain);