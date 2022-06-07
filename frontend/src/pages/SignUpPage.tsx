import * as React from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./SignUpPage.scss";
import "../utils/font-format.scss";
import "../utils/page.scss";
import MuiAlert from "@mui/material/Alert";

export const SignUpPage = (): JSX.Element => {
  const handleSignUp = async (event: any) => {
    
    const basicErrorMessage = "請輸入";
    const arr = new Array<string>();

    if (signUpForm._nickname.trim() === "") {
      arr.push("暱稱");
    }
    if (signUpForm._username.trim() === "") {
      arr.push("帳號");
    }
    if (signUpForm._email.trim() === "") {
      arr.push("郵件");
    }
    if (signUpForm._password.trim() === "") {
      arr.push("密碼");
    }

    if (arr.length > 0) {
      setError(true);
      setErrorMessage(basicErrorMessage + arr.join("、") + "！");
      process.exit();
    }

    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(signUpForm._email)) {
      setError(true);
      setErrorMessage("郵件錯誤！");
      process.exit();
    }

    const body = JSON.stringify({
      nickname: signUpForm._nickname,
      username: signUpForm._username,
      email: signUpForm._email,
      password: signUpForm._password
    });

    await Axios.post("http://127.0.0.1:8787/api/auth/signup", body, {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((response: any) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error: any) => {
        setError(true);
        setErrorMessage(error.response.data["message"]);
      });
  };

  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = React.useState<SignUpForm>(new SignUpForm());
  const [error, setError] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  return (
    <Box className="background" component="form">
      <section className="widget">
        <h2 className="title">註冊</h2>

        <TextField
          id="outlined-basic"
          label="Nickname"
          type="text"
          variant="outlined"
          onChange={(event) => {
            signUpForm.nickname = event.target.value;
            setSignUpForm(signUpForm);
            setError(false);
            setErrorMessage("");
          }}
          className="text-field"
          autoFocus={true}
        />

        <TextField
          id="outlined-basic"
          label="Username"
          type="text"
          variant="outlined"
          onChange={(event) => {
            signUpForm.username = event.target.value;
            setSignUpForm(signUpForm);
            setError(false);
            setErrorMessage("");
          }}
          className="text-field"
        />

        <TextField
          id="outlined-basic"
          label="Email"
          type="text"
          variant="outlined"
          onChange={(event) => {
            signUpForm.email = event.target.value;
            setSignUpForm(signUpForm);
            setError(false);
            setErrorMessage("");
          }}
          className="text-field"
        />

        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          onChange={(event) => {
            signUpForm.password = event.target.value;
            setSignUpForm(signUpForm);
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
          <></>
        )}

        <Button
          variant="outlined"
          className="signup my-button"
          onClick={handleSignUp}
        >
          註冊
        </Button>

      </section>
    </Box>
  );
};

class SignUpForm {
  _nickname: string;
  _username: string;
  _email: string;
  _password: string;

  constructor() {
    this._nickname = "";
    this._username = "";
    this._email = "";
    this._password = "";
  }

  set nickname(value: string) {
    this._nickname = value;
  }

  set username(value: string) {
    this._username = value;
  }

  set email(value: string) {
    this._email = value;
  }

  set password(value: string) {
    this._password = value;
  }
}
