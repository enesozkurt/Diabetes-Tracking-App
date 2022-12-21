import DataTable from 'react-data-table-component';

const columns = [
    {
        name: 'Title',
        selector: row => row.title,
    },
    {
        name: 'Blood Glucose',
        selector: row => row.bloodGlucose,
        sortable: true,
    },
    {
        name: 'Date',
        selector: row => row.date,
        sortable: true,
    },
];

function DatatableComponent(props) {
    const {data} = props;
    const conditionalRowStyles = [
        {
            when: row => row.bloodGlucose > 200,
            style: {
                backgroundColor: '#EB455F',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.bloodGlucose < 200,
            style: {
                backgroundColor: '#FFF6BD',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.bloodGlucose < 120,
            style: {
                backgroundColor: '#CEEDC7',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
    ];
    return (
        <DataTable title="Record List"
                   columns={columns}
                   data={data}
                   pagination
                   conditionalRowStyles={conditionalRowStyles}
        />
    )
}

export default DatatableComponent;