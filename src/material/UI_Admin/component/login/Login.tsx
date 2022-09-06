import { TextField } from "@mui/material";
import React, { useState } from "react";
import { Button, FormControl, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css';
import { useNavigate } from "react-router-dom";
import Axios from "../../../Axios";

interface initialUser {
    username: string,
    password: string,
}

const Login = (props: any) => {
    const [showMessageError, setShowMessageError] = useState(false);
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [user, setUser] = useState<initialUser | any>()
    const navigate = useNavigate();
    const handleClickLogin = () => {
        Axios.post(`admin/login`, {
            username: user?.username,
            password: user?.password,
        }).then((res) => {
            sessionStorage.setItem('accessToken', res.data.accessToken);
            props.setAccessToken(res.data.accessToken);
            props.setLoading(true);
            loadPage();
        }).catch((error) => {
            setShowMessageError(true);
        })
    }
    const handleClickHidden = () => {
        setHiddenPassword(!hiddenPassword);
    }
    const handleChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const loadPage = () => {
        if (sessionStorage.getItem('accessToken')) {
            Axios.get(`admin/information/me`, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken")
                }
            })
                .then((res) => {
                    if (res.data.role.id == 2) {
                        navigate('/');
                    } else {
                        navigate('/delivery');
                    }
                }).catch((e) => {
                    console.log(e);
                })
        }
    }
    return (
        <div className="container-login">
            <div className="main-login">
                <div className="main">
                    <div className="left"></div>
                    <div className="right">
                        <div className="display-main-login">
                            <div className="title">Login</div>
                            <FormControl fullWidth>
                                <TextField
                                    error={showMessageError}
                                    name={'username'}
                                    onChange={handleChange}
                                    label="username" />
                            </FormControl>
                            <FormControl className="password-container">
                                <TextField
                                    error={showMessageError}
                                    type={hiddenPassword ? 'password' : 'text'}
                                    onChange={handleChange}
                                    name={'password'}
                                    label="password"
                                />
                                {hiddenPassword ? <Visibility className="icon-password" onClick={handleClickHidden} />
                                    : <VisibilityOff className="icon-password" onClick={handleClickHidden} />}
                            </FormControl>
                            {showMessageError ? <FormControl error variant="standard">
                                <FormHelperText id="component-error-text">username or password is incorrect</FormHelperText>
                            </FormControl> : <></>}

                            <div className="forget-password">
                                <span>Forget password</span>
                            </div>
                            <div className="btn-login">
                                <Button sx={{ width: '300px', height: '50px', borderRadius: '25px' }}
                                    onClick={handleClickLogin}
                                    variant="outlined">Login</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;