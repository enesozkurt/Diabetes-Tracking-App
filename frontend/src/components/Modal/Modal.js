import React, { useState, useEffect } from 'react';
import { Divider, Box, Typography, Modal, Button, TextField } from '@mui/material';
import DatatableComponent from "../Datatable/Datatable";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function ModalComponent (props) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [values, setValues] = useState({
        title: '',
        description: '',
        bloodGlucose: 105,
        date: '2017-05-24T10:30'
    });

    useEffect(() => {
        fetchRecords()
    }, []);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const confirmHandler = () => {
        const title = values.title;
        const description = values.description;
        const bloodGlucose = values.bloodGlucose;
        const date = values.date;

        if (title.trim().length === 0 ||
            description.trim().length === 0 ||
            bloodGlucose <= 0 ||
            date.trim().length === 0) {
            return;
        }

        const event = {title, description, bloodGlucose, date}
        console.log(event)

        const reqBody = {
            query: `mutation{createRecord(recordInput: {title: "${title}", description: "${description}", bloodGlucose: ${bloodGlucose}, date: "${date}"}) {_id title description date bloodGlucose}}`
        }

        const token = props.token;

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed')
                }
                return res.json();
            })
            .then(resData => {
                handleClose()
                fetchRecords()
            })
            .catch(error => {
                console.log(error)
            })
    }

    const cancelHandler = () => {

    }

    const fetchRecords = () => {
        let reqBody = {
            query: `query{records{_id title description date bloodGlucose}}`
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed')
                }
                return res.json();
            })
            .then(resData => {
                const records = resData.data.records
                setData(records)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <>
            <Button onClick={handleOpen}>Open modal</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                    <Box mb={2}>
                        <TextField id="title"
                                   name="title"
                                   label="Title"
                                   variant="outlined"
                                   fullWidth
                                   onChange={handleChange}
                                   value={values.title}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField id="outlined-multiline-flexible"
                                   label="Description"
                                   name="description"
                                   multiline
                                   maxRows={4}
                                   fullWidth
                                   onChange={handleChange}
                                   value={values.description}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField id="bloodGlucose"
                                   label="Blood Glucose"
                                   name="bloodGlucose"
                                   variant="outlined"
                                   fullWidth
                                   inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                   onChange={handleChange}
                                   value={values.bloodGlucose}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            id="datetime-local"
                            name="date"
                            label="Date"
                            type="datetime-local"
                            defaultValue="2017-05-24T10:30"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            onChange={handleChange}
                            value={values.date}
                        />
                    </Box>
                    <Divider/>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'end' }}>
                        <Button variant="contained" color="error" sx={{ marginX: 2}}>Cancel</Button>
                        <Button variant="contained" color="success" onClick={confirmHandler}>Confirm</Button>
                    </Box>
                </Box>
            </Modal>
            <DatatableComponent data={data} />
        </>
    )
};

export default ModalComponent;