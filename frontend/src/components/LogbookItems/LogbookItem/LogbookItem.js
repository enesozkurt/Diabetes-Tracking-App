import * as React from 'react';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DescriptionIcon from '@mui/icons-material/Description';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';

function LogbookItemComponent(props) {
    const { record } = props;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={record.title}
                subheader={new Date(record.date).toLocaleString('tr-TR')}
            />
            <CardContent>
                <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <nav aria-label="main mailbox folders">
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <HealthAndSafetyIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={record.bloodGlucose} />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DescriptionIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={record.description} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </nav>
                </Box>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default LogbookItemComponent;