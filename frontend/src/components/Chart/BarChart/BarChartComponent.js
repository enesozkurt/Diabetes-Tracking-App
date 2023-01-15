import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = (props) => {
    const { records } = props;

    const [data, setData] = useState([
        {
            title: "",
            bloodGlucose: null
        }
    ]);
    useEffect(() => {
        setData(records.slice(0, 7).map(record => (
            {
                ...record,
                date: new Date(record.date).toLocaleDateString(),
                bloodGlucose: record.bloodGlucose
            }
        )))
    }, [records]);

    return (
        <div style={{ width: '100%' }}>
                <BarChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    barSize={20}
                >
                    <XAxis dataKey="date" padding={{ left: 10, right: 10 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Bar dataKey="bloodGlucose" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
        </div>
    )
}

export default BarChartComponent