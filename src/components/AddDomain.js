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

const AddDomain = (props) => {
    const classes = useStyles();
    const [domain,setDomain] = useState('');
    const [subdomain,setSubdomain] = useState('');
    return (
        <div className={classes.root}>
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
                    }}>Image Recognition</Button>
                }
                { domain === 'Machinelearning' &&
                    <Button onClick={e => {
                        e.preventDefault();
                        setSubdomain("NLP")
                    }}>NLP</Button>
                }
                {
                    domain === 'Datascience' &&
                    <Button onClick={e => {
                        e.preventDefault();
                        setSubdomain("DA")
                    }}>Data Analytics</Button>
                }
                {
                    domain === 'Blockchain' &&
                    <Button onClick={e => {
                        e.preventDefault();
                        setSubdomain("Crypto")
                    }}>CryptoCurrency</Button>
                }
                {
                    domain === 'Cybersecurity' &&
                    <Button onClick={e => {
                        e.preventDefault();
                        setSubdomain("Pentester")
                    }}>Penetration Testing</Button>
                }
                {
                    domain === 'IOT' &&
                    <Button onClick={e => {
                        e.preventDefault();
                        setSubdomain("Softwaredev")
                    }}>Software Enginnering</Button>
                }
            </ButtonGroup>
            }
            <Button onClick={() => {
                props.dispatch(addDomain({domain,subdomain}));
            }}>Submit</Button>
        </div>
    );
}

export default connect()(AddDomain);