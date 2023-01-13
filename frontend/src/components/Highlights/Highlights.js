import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import OpacityIcon from '@mui/icons-material/Opacity';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Highlights(props) {
    const { maxValue, minValue, average } = props
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Item>
                    <Typography variant="h5" gutterBottom>
                        Highest <OpacityIcon style={{ color:"#CD0404" }} />
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {maxValue} mg/dL
                    </Typography>
                </Item>
            </Grid>
            <Grid item xs={12} md={4}>
                <Item>
                    <Typography variant="h5" gutterBottom>
                        Lowest <OpacityIcon style={{ color: "#FADA9D" }} />
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {minValue} mg/dL
                    </Typography>
                </Item>
            </Grid>
            <Grid item xs={12} md={4}>
                <Item>
                    <Typography variant="h5" gutterBottom>
                        Average <OpacityIcon style={{ color: "#B08BBB" }} />
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        {average?.toFixed(2)} mg/dL
                    </Typography>
                </Item>
            </Grid>
        </Grid>
    )
}

export default Highlights;