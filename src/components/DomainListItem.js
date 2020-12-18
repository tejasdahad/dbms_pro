import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
const useStyles = makeStyles((theme) => ({
    
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

const DomainListItem = ({item}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };
    console.log(item.sub[0]);
    return (
        <Fragment>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={item.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem key={item.sub} button className={classes.nested}>
                    <ListItemText primary={item.sub} />
                </ListItem>
                </List>
            </Collapse>   
        </Fragment>
    )
}

export default DomainListItem;