import React,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const AddDomain = () => {
    const classes = useStyles();
    const [domain,setDomain] = useState('');
    const data = {
        ML: [
            'Image','NLP'
        ],
        DS:[

        ]
    }

    return (
        <div className={classes.root}>
        
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                <Button onClick={e => {
                    e.preventDefault();
                    setDomain('ML');
                }} style={{background:domain==='ML'?'grey':'white',color:domain==='ML'?'white':'blue'}}>Machine Learning</Button>
                <Button onClick={e => {
                    e.preventDefault();
                    setDomain('DS');
                }} style={{background:domain==='DS'?'grey':'white',color:domain==='DS'?'white':'blue'}}>Data Science</Button>
                <Button onClick={e => {
                    e.preventDefault();
                    setDomain('Blockchain');
                }} style={{background:domain==='Blockchain'?'grey':'white',color:domain==='Blockchain'?'white':'blue'}}>Blockchain</Button>
                
            </ButtonGroup>
            <ButtonGroup size="large" color="primary" aria-label="large outlined primary button group">
                <Button onClick={e => {
                    e.preventDefault();
                    setDomain('Cyber');
                }} style={{background:domain==='Cyber'?'grey':'white',color:domain==='Cyber'?'white':'blue'}}>Cybersecurity</Button>
                <Button onClick={e => {
                    e.preventDefault();
                    setDomain('IOT');
                }} style={{background:domain==='IOT'?'grey':'white',color:domain==='IOT'?'white':'blue'}}>IOT</Button>
                
            </ButtonGroup>
            
      </div>
);
}

export default AddDomain;