import React, { Component } from "react";
import { Box, TextField, Button, Grid, Paper, CssBaseline, Avatar, Typography, Link  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import LoginImage from '../assets/diabetes.jpg'

import AuthContext from "../context/auth-context";

const theme = createTheme();

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLogin: true
        }
    }

    static contextType = AuthContext;

    submitHandler = (event) => {
        event.preventDefault();

        let reqBody = {
            query: `query{login(email: "${this.state.email}", password:"${this.state.password}") {userId token tokenExpiration}}`
        }

        if (!this.state.isLogin) {
            reqBody = {
                query: `mutation{createUser(userInput: {email: "${this.state.email}", password:"${this.state.password}"}) {_id email}}`
            }
        }


        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Failed')
                }
                return res.json();
            })
            .then(resData => {
                if (resData.data.login.token) {
                    this.context.login(
                        resData.data.login.token,
                        resData.data.login.userId,
                        resData.data.login.tokenExpiration
                    )
                }
            })
            .catch(error => {
                console.log(error)
        })
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {
                isLogin: !prevState.isLogin
            }
        })
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: `url(${LoginImage})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box
                                component="form"
                                sx={{ mt: 1 }}
                                noValidate
                                autoComplete="off"
                                className="auth-form"
                                onSubmit={this.submitHandler}
                            >
                                    <TextField
                                        error={this.state.email.trim().length === 0  ? true : false}
                                        onChange={event => this.setState({ email: event.target.value })}
                                        variant="filled"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                    />
                                    <TextField
                                        error={this.state.password.trim().length === 0 ? true : false}
                                        onChange={event => this.setState({ password: event.target.value })}
                                        variant="filled"
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                    />
                                    <Button type="submit" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }} onClick={this.submitHandler}>Sign In</Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default AuthPage;