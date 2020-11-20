import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import { addDomain }  from '../actions/users';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1)
    },
  },
}));

const AddDomain = ({addDomain,users }) => {
    const classes = useStyles();
    const [domain,setDomain] = useState('');
    const [subDomain,setSubdomain] = useState('');
    const [email,setEmail] = useState('');
    const [name,setName] = useState('');
    return (
        <div className={classes.root}>
            <form>
                <input type='text' placeholder="Name" autoFocus required defaultvalue="" onChange={e => {
                    e.preventDefault();
                    setName(e.target.value);
                }}/>
                <input type='text' placeholder="Email" autoFocus required defaultValue="" onChange={e => {
                    e.preventDefault();
                    setEmail(e.target.value);
                }}/>
                <h3>Select Domain:</h3>
                <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group" orientation="vertical">
                    <Button onClick={e => {
                        e.preventDefault();
                        setDomain('Machinelearning');
                    }} style={{background:domain==='Machinelearning'?'grey':'white',color:domain==='Machinelearning'?'white':'black'}}>Machine Learning</Button>
                    <Button onClick={e => {
                        e.preventDefault();
                        setDomain('Datascience');
                    }} style={{background:domain==='Datascience'?'grey':'white',color:domain==='Datascience'?'white':'black'}}>Data Science</Button> 
                    <Button onClick={e => {
                        e.preventDefault();
                        setDomain('Blockchain');
                    }} style={{background:domain==='Blockchain'?'grey':'white',color:domain==='Blockchain'?'white':'black'}}>Blockchain</Button>
                    <Button onClick={e => {
                        e.preventDefault();
                        setDomain('Cybersecurity');
                    }} style={{background:domain==='Cybersecurity'?'grey':'white',color:domain==='Cybersecurity'?'white':'black'}}>Cybersecurity</Button>
                    <Button onClick={e => {
                        e.preventDefault();
                        setDomain('IOT');
                    }} style={{background:domain==='IOT'?'grey':'white',color:domain==='IOT'?'white':'black'}}>Internet of Things</Button>
                </ButtonGroup>

                {domain && <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group" orientation="vertical">
                    <h3>Select Subdomain:</h3>
                    { domain === 'Machinelearning' &&
                        <Button onClick={e => {
                            e.preventDefault();
                            setSubdomain("ImageRec")
                        }} style={{background:subDomain==='ImageRec'?'grey':'white',color:subDomain==='ImageRec'?'white':'black'}}>Image Recognition</Button>
                    }
                    { domain === 'Machinelearning' &&
                        <Button onClick={e => {
                            e.preventDefault();
                            setSubdomain("NLP")
                        }} style={{background:subDomain==='NLP'?'grey':'white',color:subDomain==='NLP'?'white':'black'}}>NLP</Button>
                    }
                    {
                        domain === 'Datascience' &&
                        <Button onClick={e => {
                            e.preventDefault();
                            setSubdomain("DA")
                        }} style={{background:subDomain==='DA'?'grey':'white',color:subDomain==='DA'?'white':'black'}}>Data Analytics</Button>
                    }
                    {
                        domain === 'Blockchain' &&
                        <Button onClick={e => {
                            e.preventDefault();
                            setSubdomain("Crypto")
                        }} style={{background:subDomain==='Crypto'?'grey':'white',color:subDomain==='Crypto'?'white':'black'}}>CryptoCurrency</Button>
                    }
                    {
                        domain === 'Cybersecurity' &&
                        <Button onClick={e => {
                            e.preventDefault();
                            setSubdomain("Pentester")
                        }} style={{background:subDomain==='Pentester'?'grey':'white',color:subDomain==='Pentester'?'white':'black'}}>Penetration Testing</Button>
                    }
                    {
                        domain === 'IOT' &&
                        <Button onClick={e => {
                            e.preventDefault();
                            setSubdomain("Softwaredev")
                        }} style={{background:subDomain==='Softwaredev'?'grey':'white',color:subDomain==='Softwaredev'?'white':'black'}}>Software Enginnering</Button>
                    }
                </ButtonGroup>
                }
                <Button onClick={(e) => {
                    e.preventDefault();
                    addDomain({domain,subDomain,email,name, user:users.user,userId: users.userId});
                }}>Submit</Button>
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    users: state.users
})

export default connect(mapStateToProps,{ addDomain })(AddDomain);