import React, { Component } from "react";
import Grid from '@mui/material/Grid';
import Highlights from "../components/Highlights/Highlights";
import PieChartComponent from "../components/Chart/PieChart/PieChartComponent";
import LineChartComponent from "../components/Chart/LineChart/LineChartComponent";
import BarChartComponent from "../components/Chart/BarChart/BarChartComponent";

class StatsPage extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            records: [],
            highest: null,
            lowest: null
        }
    }

    componentDidMount() {
        this.fetchRecords()
    }

    fetchRecords()  {
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
                this.setState({
                    records,
                    highest:    Math.max(...records.map(o => o.bloodGlucose)),
                    lowest: Math.min(...records.map(o => o.bloodGlucose)),
                    average: records.reduce((a, {bloodGlucose}) => a + bloodGlucose, 0) / records.length
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Highlights maxValue={this.state.highest} minValue={this.state.lowest} average={this.state.average} />
                    </Grid>
                </Grid>
                <Grid container spacing={2} mt={6}>
                    <Grid item xs={12} md={6}>
                        <h4>Last 7 Records</h4>
                        <PieChartComponent records={this.state.records} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <h4>Last 7 Records</h4>
                        <BarChartComponent records={this.state.records} />
                    </Grid>
                </Grid>
                <h4>Last 7 Records</h4>
                <LineChartComponent records={this.state.records} />
            </>
        )
    }
}

export default StatsPage;