import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { DialogContent, DialogContentText } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const jobUseStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        backgroundColor: 'aliceblue',
        color: 'black',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

export default function JobModal({ job, open, handleClose }) {
    const classes = jobUseStyles();
    return (
        <div>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            <img className='detail-logo' src={job.company_logo} alt='company logo' />
                            {job.title} - 
                            {job.company}
                        </Typography>
                        <Button autoFocus color="primary" variant="outlined" href = {job.url} target='__blank' >
                            Apply
                        </Button>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DialogContentText dangerouslySetInnerHTML={{ __html: job.description }} />
                    <DialogContentText variant="h6">How to Apply</DialogContentText>
                    <DialogContentText  dangerouslySetInnerHTML={{ __html: job.how_to_apply }} />
                </DialogContent>
            </Dialog>
        </div>
    );
}