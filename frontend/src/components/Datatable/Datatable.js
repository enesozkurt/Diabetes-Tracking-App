import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Blood Glucose',
        selector: row => row.bloodGlucose,
    },
    {
        name: 'Date',
        selector: row => row.date,
    },
];

function DatatableComponent(props) {
    const {data} = props;
    return (
        <DataTable title="Movie List"
                   columns={columns}
                   data={data}
                   pagination
        />
    )
}

export default DatatableComponent;