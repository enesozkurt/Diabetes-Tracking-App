import * as React from 'react';
import PropTypes from 'prop-types';
import {Box, Tabs, Tab, Typography, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip, Grid} from '@mui/material';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import {
    MemoryRouter,
    Route,
    Routes,
    Link,
    matchPath,
    useLocation,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import AuthContext from "../../context/auth-context";

function Router(props) {
    const { children } = props;
    if (typeof window === 'undefined') {
        return <StaticRouter location="/stats">{children}</StaticRouter>;
    }

    return (
        <MemoryRouter initialEntries={['/stats']} initialIndex={0}>
            {children}
        </MemoryRouter>
    );
}

Router.propTypes = {
    children: PropTypes.node,
};

function useRouteMatch(patterns) {
    const { pathname } = useLocation();

    for (let i = 0; i < patterns.length; i += 1) {
        const pattern = patterns[i];
        const possibleMatch = matchPath(pattern, pathname);
        if (possibleMatch !== null) {
            return possibleMatch;
        }
    }

    return null;
}

function MyTabs() {
    // You need to provide the routes in descendant order.
    // This means that if you have nested routes like:
    // users, users/new, users/edit.
    // Then the order should be ['users/add', 'users/edit', 'users'].
    const routeMatch = useRouteMatch(['/records', '/stats', '/logbook']);
    const currentTab = routeMatch?.pattern?.path;

    return (
        <Tabs value={currentTab}>
            <Tab label="Records" value="/records" to="/records" component={Link} />
            <Tab label="Stats" value="/stats" to="/stats" component={Link} />
            <Tab label="LogBook" value="/logbook" to="/logbook" component={Link} />
        </Tabs>
    );
}

function AccountMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <AuthContext.Consumer>
            {authContext => {
                return (
                    <>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <Avatar /> Profile
                    </MenuItem>
                    <MenuItem>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={authContext.logout}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
                    </>
                )
            }}
        </AuthContext.Consumer>
    )
}

export default function MainNavigation() {
    return (
            <Box sx={{ width: '100%', background: '#F7F6DC' }}>
                <Grid container spacing={2} p={2}>
                    <Grid item xs={2}>
                        <Typography variant="h4" gutterBottom>
                            DiabetUs
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <MyTabs />
                    </Grid>
                    <Grid item xs={4} display="flex" justifyContent="end" alignItems="center">
                        <AccountMenu />
                    </Grid>
                </Grid>
                <Routes>
                    <Route path="*" />
                </Routes>
            </Box>

    );
}