import * as React from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./LoginPage.scss";
import "../utils/font-format.scss";
import "../utils/page.scss";
import AnonymousLogin from "../components/AnonymousLogin";
import { Divider } from "@material-ui/core";
import MuiAlert from "@mui/material/Alert";

export const LoginPage = (): JSX.Element => {
  const handleLogin = async (event: any) => {
    if (
      loginForm._usernameOrEmail.trim() === "" &&
      loginForm._password.trim() === ""
    ) {
      setError(true);
      setErrorMessage("請輸入帳號密碼!");
      process.exit();
    } else if (loginForm._usernameOrEmail.trim() === "") {
      setError(true);
      setErrorMessage("請輸入帳號!");
      process.exit();
    } else if (loginForm._password.trim() === "") {
      setError(true);
      setErrorMessage("請輸入密碼!");
      process.exit();
    }

    const body = JSON.stringify({
      usernameOrEmail: loginForm._usernameOrEmail,
      password: loginForm._password,
    });

    await Axios.post("http://127.0.0.1:8787/api/auth/login", body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((response: any) => {
        console.log(response);
        const token = response["data"]["data"]["token"];
        localStorage.setItem("bearer_token", token);
        navigate("/home");
      })
      .catch((error: any) => {
        setError(true);
        if(error.message === "Network Error")
          setErrorMessage(error.message);
        else
          setErrorMessage(error.response.data["message"]);        
      });
  };

  const navigate = useNavigate();
  const [loginForm, setLoginForm] = React.useState<LoginForm>(new LoginForm());
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  return (
    <Box className="background" component="form">
      <section className="widget">
        <h2 className="title">登入</h2>

        <TextField
          id="outlined-basic"
          label="Username or Email"
          type="text"
          autoComplete=""
          variant="outlined"
          onChange={(event) => {
            loginForm.usernameOrEmail = event.target.value;
            setLoginForm(loginForm);
            setError(false);
            setErrorMessage("");
          }}
          className="text-field"
          autoFocus={true}
        />

        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={(event) => {
            loginForm.password = event.target.value;
            setLoginForm(loginForm);
            setError(false);
            setErrorMessage("");
          }}
          className="text-field"
        />

        {error ? (
          <MuiAlert className="alert" severity="error">
            {errorMessage}
          </MuiAlert>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        <Button
          variant="outlined"
          className="login my-button"
          onClick={handleLogin}
        >
          登入
        </Button>

        <Divider />

        <div className="option-group">
          <Button
            variant="outlined"
            className="option my-button"
            onClick={() => {
              navigate("/signup");
            }}
          >
            註冊
          </Button>

          <AnonymousLogin class="option my-button" />
        </div>
      </section>
    </Box>
  );
};

class LoginForm {
  _usernameOrEmail: string;
  _password: string;

  constructor() {
    this._usernameOrEmail = "";
    this._password = "";
  }

  set usernameOrEmail(value: string) {
    this._usernameOrEmail = value;
  }

  set password(value: string) {
    this._password = value;
  }
}
