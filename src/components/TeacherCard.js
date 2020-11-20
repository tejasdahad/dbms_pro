import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

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
        maxWidth: 360,
        backgroundColor: "black",
        color:"white",
        borderRadius:30
      },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
  
const TeacherCard = () => {
    const classes = useStyles();
    const [open1, setOpen1] = React.useState(true);
    const [open2, setOpen2] = React.useState(true);
    const [open3, setOpen3] = React.useState(true);

    const handleClick3 = () => {
      setOpen3(!open3);
    };
    const handleClick2 = () => {
        setOpen2(!open2);
      };
      const handleClick1 = () => {
        setOpen1(!open1);
      };
    return (
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center" style={{marginBottom:10,color:"blue"}}>
            Teacher Profile
          </Typography>
        <Grid container>
        <Grid item xs={12} style={{marginBottom:10}}>
        <Typography component="h6" variant="h6" align="center">
        Registration Id : <span style={{color:"grey"}}>T2K1009019</span>
        
      </Typography>
          </Grid>
            <Grid item xs={12}>
          <Typography component="h6" variant="h6" align="center">
          Name : <span style={{color:"grey"}}>Pranjali Joshi</span>
          
        </Typography>
            </Grid>
            <Grid item xs={12} style={{marginBottom:10}}>
            <Typography component="h6" variant="h6" align="center">
            Email : <span style={{color:"grey"}}>ppj@gmail.com</span>
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
            <ListItem button onClick={handleClick1}>
                <ListItemText primary="Data Science" />
                {open1 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open1} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    
                    <ListItemText primary="Data Analytics" />
                </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={handleClick2}>
                <ListItemText primary="Machine Learning" />
                {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    
                    <ListItemText primary="Image Recognition" />
                </ListItem>
                </List>
            </Collapse>
            <ListItem button onClick={handleClick3}>
                
                <ListItemText primary="Cyber" />
                {open3 ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            
            
            <Collapse in={open3} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                    
                    <ListItemText primary="hacking" />
                </ListItem>
                </List>
            </Collapse>
            </List>
            </Grid>
        </Grid>
        </Paper>
    )
}

export default TeacherCard;
