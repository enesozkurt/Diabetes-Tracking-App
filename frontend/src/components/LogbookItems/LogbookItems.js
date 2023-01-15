import React, { useState, useEffect } from 'react';
import {Grid, Alert, Container } from '@mui/material';
import LogbookItemComponent from "./LogbookItem/LogbookItem";

function LogbookItemsComponent(props) {
    const [records, setRecords] = useState([]);
    useEffect(() => {
        fetchRecords()
    }, []);

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
                setRecords(records)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {records.length !== 0 ? records.map((record, index) => (
                <Grid item xs={2} sm={3} md={3} key={index}>
                    <LogbookItemComponent record={record} />
                </Grid>
            )) : <Container maxWidth="md">
                    <Alert severity="warning">There are no records to display</Alert>
                </Container>}
        </Grid>
    )
}

export default LogbookItemsComponent