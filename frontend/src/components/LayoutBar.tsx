import * as React from "react";

import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { AppBar, Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

import { Sidebar } from "./SideBar";
import { CommentBoard } from "./CommentBoard";

import { useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import CommentIcon from "@mui/icons-material/Comment";

import "./layoutBar.scss";

export const LayoutBar = (props: any) => {
  const [loggedInState, setLoggedInState] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (localStorage.getItem("bearer_token")) {
      setLoggedInState(true);
    } else {
      setLoggedInState(false);
    }
  });

  const navigate = useNavigate();

  const [sidebarState, setSidebarState] = React.useState<boolean>(false);
  const toggleSidebar = (state: boolean) => () => {
    setSidebarState(state);
  };

  const [commentBoardState, setCommentBoardState] =
    React.useState<boolean>(false);
  const toggleCommentBoardState = (state: boolean) => () => {
    setCommentBoardState(state);
  };

  return (
    <div>
      <Box id={"layout"}>
        <AppBar className={"appBar"}>
          <Toolbar>
            <IconButton size="large" onClick={toggleSidebar(true)}>
              <MenuIcon />
            </IconButton>

            <div className="app-bar-button-group">
              <Button
                variant="outlined"
                sx={{ marginRight: "16px" }}
                onClick={toggleCommentBoardState(true)}
                className="appbar-button"
              >
                <CommentIcon />
                留言板
              </Button>
              {!loggedInState ? (
                <Button
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  onClick={() => {
                    navigate("login");
                  }}
                  sx={{ marginRight: "8px" }}
                  className="appbar-button"
                >
                  登入
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  onClick={() => {
                    localStorage.removeItem("bearer_token")
                    navigate("home");
                  }}
                  sx={{ marginRight: "8px" }}
                  className="appbar-button"
                >
                  登出
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>

        <Sidebar state={sidebarState} close={toggleSidebar(false)} />
        <CommentBoard
          state={commentBoardState}
          close={toggleCommentBoardState(false)}
        />
      </Box>
      <Outlet />
    </div>
  );
};
