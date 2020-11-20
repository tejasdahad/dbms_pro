import React,{ useState } from 'react';
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
}));

const AddDomain = ({addDomain,users,history }) => {
    const classes = useStyles();
    const [domain,setDomain] = useState('');
    const [subDomain,setSubdomain] = useState('');
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    return (
        <div>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor='name' autoFocus required defaultValue='' onChange={e => {
                    e.preventDefault();
                    setName(e.target.value);
                }}>
                Name</InputLabel>
                <BootstrapInput id='name'/>
            </FormControl>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor='email' required defaultValue='' onChange={e => {
                    e.preventDefault();
                    setEmail(e.target.value);
                }}>Email</InputLabel>
                <BootstrapInput id='email'/>
            </FormControl>
            <h3>Domain:</h3>
            <FormControl required className={classes.formControl}>
                <InputLabel id='domain' />
                <NativeSelect labelId='domain' id='selectdomain' value={domain} onChange={e => {
                    e.preventDefault();
                    setDomain(e.target.value);
                }} input={<BootstrapInput/>}>
                    <option value={"Machinelearning"}>Machine Learning</option>
                    <option value={"Datascience"}>Data Science</option>
                    <option value={"Cybersecurity"}>Cybersecurity</option>
                    <option value={"Blockchain"}>Blockchain</option>
                    <option value={"IOT"}>Internet of Things</option>
                </NativeSelect>
            </FormControl>
            <h3>Subdomain:</h3>
            <FormControl required className={classes.formControl}>
                <InputLabel id='subDomain' />
                <NativeSelect labelId='subDomain' id='selectsubdomain' value={subDomain} onChange={e => {
                    e.preventDefault();
                    setSubdomain(e.target.value);
                }} input={<BootstrapInput/>}>
                    { domain === 'Machinelearning' && <option value={"Image rec"}>Image Recognition</option>}
                    { domain === 'Machinelearning' && <option value={"NLP"}>NLP</option>}
                    { domain === 'Datascience' && <option value={"Analysis"}>Data Analysis</option>}
                    { domain === 'Cybersecurity' && <option value={"Pentester"}>Penetration testing</option>}
                    { domain === 'Blockchain' && <option value={"Cryptocurrency"}>CryptoCurrency</option>}
                    { domain === 'IOT' && <option value={'Softdev'}>Software Devloper</option>}
                </NativeSelect>
            </FormControl>  
            <Button onClick={(e) => {
                e.preventDefault();
                console.log(domain);
                console.log(subDomain);
                console.log(name);
                console.log(email);
                //addDomain({domain,subDomain,email,name, user:users.user,userId: users.userId});
                //history.push("/profile");
            }}>Submit</Button>
            <Copyright />
        </div>
    );
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps,{ addDomain })(AddDomain);