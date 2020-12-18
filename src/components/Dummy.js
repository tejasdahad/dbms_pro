import React,{ useEffect } from 'react'
import { connect } from 'react-redux';
import { finalUpdate,clearState } from '../actions/algo';
import Button from '@material-ui/core/Button';

const Dummy = ({ finalUpdate, users, history,clearState }) => {
    useEffect(() => {
        if(users.studentData){
            finalUpdate({teacherData: users.teacherData, studentData: users.studentData});
        }
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        clearState();
        history.push('/admin');
    }
    return (
        <div>
            Allocated successfully
            <Button onClick={handleClick}>Back to dashboard</Button>
        </div>
    )
}

const mapStateToProps = state => ({
    users: state.users
});

export default connect(mapStateToProps,{ finalUpdate,clearState })(Dummy);