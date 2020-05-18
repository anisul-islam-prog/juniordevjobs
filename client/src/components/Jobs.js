import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Job from './Job';
import JobModal from './JobModal';


//Pagination Styles
const useStyles = makeStyles({
    root: {
        maxWidth: "80%",
        flexGrow: 1,
    },
});

export default function Jobs({ jobs }) {

    /** Pagination **/
    const numOfJobs = jobs.length;
    const numOfPages = Math.ceil(numOfJobs / 20);
    //Per step = 20 Jobs
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    //No of jobs in plage
    const jobsOnPage = jobs.slice(activeStep * 20, (activeStep * 20) + 20);
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    /** Pagination **/

    /** Job dialog **/
    const [open, setOpen] = React.useState(false);
    const [selectedJob, selectJob] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    /** Job Dialog **/
    return (
        <div className="jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose} />
            <Typography variant="h3" component="h1">
                Entry Level Software Jobs
            </Typography>
            <Typography variant="h6" component="h2">
                {numOfJobs} Jobs Found
            </Typography>
            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={() => {
                        handleClickOpen();
                        selectJob(job);
                      }
                    } />
                )
            }
            <div className="pageIndex">
                Page {activeStep + 1} of {numOfPages}
            </div>
            <br></br>
            <MobileStepper
                variant="progress"
                steps={numOfPages}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === numOfPages}>
                        Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
                }
            />


        </div>
    );
}