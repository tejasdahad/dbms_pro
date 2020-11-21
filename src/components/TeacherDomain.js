import React,{ Fragment, useState } from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { addDomain }  from '../actions/users';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

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
      root:{
          display: 'flex',
      }
}));

const TeacherDomain = ({addDomain,users,history }) => {
    const classes = useStyles();
    const [domain,setDomain] = useState({
        ML:false,
        DS: false,
        Cyber: false,
        BlockC: false,
        IOT: false, 
    });
    const [domainArray,setDomainArray] = useState([]);
    const [subDomainArray,setSubdomainArray] = useState([]); 
    const [subDomain,setSubdomain] = useState({
        ImageRec:false,
        NLP:false,
        DA:false,
        Pentester:false,
        Crypto:false,
        Softdev: false
    });
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    const {ML,DS,Cyber,BlockC,IOT} = domain;
    const {ImageRec,NLP,DA,Pentester,Crypto,Softdev} = subDomain;
    const handleDomain = (e) => {
        setDomain({...domain, [e.target.name]: e.target.checked });
        let elem=[];
        if(e.target.checked){
            elem.push(e.target.name);
        }
        else{
            let index = domainArray.indexOf(e.target.name);
            if( index !=-1)
                {domainArray.splice(index,1);}
        }
        setDomainArray(domainArray.concat(elem));
    };

    const handleSubdomain = (e) => {
        setSubdomain({...subDomain, [e.target.name]: e.target.checked});
        let elem=[];
        if(e.target.checked){
            elem.push(e.target.name);
        }
        else{
            let index = subDomainArray.indexOf(e.target.name);
            if( index !=-1)
                {subDomainArray.splice(index,1);}
        }
        setSubdomainArray(subDomainArray.concat(elem));
    }

    return (
        <Fragment>
        <CssBaseline />
        <main className={classes.layout}>
        <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center" style={{marginBottom:10,color:"blue"}}>
            Select Domain
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
                    <FormControl required component='fieldset' className={classes.formControl}>
                        <FormLabel component='legend'>Domain</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={ML} onChange={handleDomain} name="ML"/>}
                                label='Machine Learning'/>
                            <FormControlLabel
                                control={<Checkbox checked={DS} onChange={handleDomain} name="DS"/>}
                                label='Data Science'/>
                            <FormControlLabel
                                control={<Checkbox checked={Cyber} onChange={handleDomain} name="Cyber"/>}
                                label='Cybersecurity'/>
                            <FormControlLabel
                                control={<Checkbox checked={BlockC} onChange={handleDomain} name="BlockC"/>}
                                label='Blockchain'/>
                            <FormControlLabel
                                control={<Checkbox checked={IOT} onChange={handleDomain} name="IOT"/>}
                                label='Internet Of Things'/>
                        </FormGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <FormControl required component='fieldset' className={classes.formControl}>
                        <FormLabel component='legend'>Subomain</FormLabel>
                        <FormGroup>
                            { domain.ML && <FormControlLabel
                                control={<Checkbox checked={ImageRec} onChange={handleSubdomain} name="ImageRec"/>}
                                label='Image Recognition'/>}
                            { domain.ML && <FormControlLabel
                                control={<Checkbox checked={NLP} onChange={handleSubdomain} name="NLP"/>}
                                label='NLP'/>}
                            { domain.DS && <FormControlLabel
                                control={<Checkbox checked={DA} onChange={handleSubdomain} name="DA"/>}
                                label='Data Analysis'/>}
                            { domain.Cyber && <FormControlLabel
                                control={<Checkbox checked={Pentester} onChange={handleSubdomain} name="Pentester"/>}
                                label='Penetration Testing'/>}
                            { domain.BlockC && <FormControlLabel
                                control={<Checkbox checked={Crypto} onChange={handleSubdomain} name="Crypto"/>}
                                label='Cryptocurrency'/>}
                            { domain.IOT && <FormControlLabel
                                control={<Checkbox checked={Softdev} onChange={handleSubdomain} name="Softdev"/>}
                                label='Software Developer'/>}
                        </FormGroup>
                    </FormControl>
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
            
        </main>
        
        </Fragment>
     );
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps,{ addDomain })(TeacherDomain);