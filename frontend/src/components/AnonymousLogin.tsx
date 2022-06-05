import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const AnonymousLogin = (props: {class: any}) => {

  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [nickname, setNickname] = React.useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnonymouslyLogin = async (event: any) => {
    const body = JSON.stringify({
      nickname: nickname,
    });

    await Axios.post("http://127.0.0.1:8787/api/auth/anonymous", body, {
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
      .catch((error: any) => {});
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} className={props.class}>
        匿名登入
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>匿名登入</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            label="暱稱"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setNickname(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={handleAnonymouslyLogin}>送出</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AnonymousLogin;
