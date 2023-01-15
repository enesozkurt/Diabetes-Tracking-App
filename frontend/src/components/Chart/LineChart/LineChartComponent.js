import React, { useState, useEffect } from 'react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
    Area,
    ResponsiveContainer,
} from 'recharts';

const LineChartComponent = (props) => {
    const { records } = props;

    const [data, setData] = useState([
        {
            name: "",
            value: null
        }
    ]);
    useEffect(() => {
        setData(records.slice(0, 7).map(record => (
            {
                ...record,
                name: new Date(record.date).toLocaleDateString(),
                value: record.bloodGlucose
            }
        )))
    }, [records]);

    return (
        <div style={{ width: '100%' }}>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                    width={500}
                    height={200}
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineChartComponent