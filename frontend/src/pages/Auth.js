import React, { Component } from "react";
import { Box, TextField, Button} from '@mui/material';

import './Auth.css'

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLogin: true
        }
    }

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
                console.log(resData);
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
                <Box
                    component="form"
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                        margin: '5rem auto'
                    }}
                    noValidate
                    autoComplete="off"
                    className="auth-form"
                    onSubmit={this.submitHandler}
                >
                        <div className="form-control">
                            <TextField
                                required
                                error={this.state.email.trim().length === 0  ? true : false}
                                onChange={event => this.setState({ email: event.target.value })}
                                id="email"
                                label="E-mail"
                                type="email"
                                autoComplete="current-password"
                                variant="filled"
                                fullWidth
                            />
                        </div>
                        <div className="form-control">
                            <TextField
                                required
                                error={this.state.password.trim().length === 0 ? true : false}
                                onChange={event => this.setState({ password: event.target.value })}
                                id="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="filled"
                                fullWidth
                            />
                        </div>
                        <div className="form-actions">
                            <Button type="button" variant="outlined" onClick={this.submitHandler}>Submit</Button>
                            <Button type="submit" variant="contained" onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Signup' : 'Login'}</Button>
                        </div>
                </Box>
        );
    }
}

export default AuthPage;