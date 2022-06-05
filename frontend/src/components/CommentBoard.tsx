import * as React from "react";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Drawer from "@mui/material/Drawer";
import SendIcon from "@mui/icons-material/Send";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import Axios from "axios";
import "./sideBar.scss";
import "./CommentBoard.scss";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";

import { Avatar, Divider } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import { Map } from "typescript";

export const CommentBoard = (props: {
  state: boolean;
  close: () => void;
}): JSX.Element => {
  const [comments, setComments] = React.useState<Array<Comment>>(
    new Array<Comment>()
  );
  const [commentInput, setCommentInput] = React.useState<string>("");
  const [commentMoreMenuState, setCommentMoreMenuState] = React.useState(
    new Map<string, boolean>()
  );
  const [updatedComment, setUpdatedComment] = React.useState<Comment>(
    new Comment("", "", "", "", new Date())
  );

  React.useEffect(() => {getAllComments()}, []);

  const getAllComments = () => {
    Axios.get("http://127.0.0.1:8787/api/comments", {
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((response: any) => {
        const comments = response["data"]["data"];
        // console.log(comments);
        comments.forEach((comment: any) => {
          if (typeof comment.updateDate === "string") {
            comment.updateDate =
              comment.updateDate.slice(0, comment.updateDate.indexOf("T")) +
              " " +
              comment.updateDate.slice(
                comment.updateDate.indexOf("T") + 1,
                comment.updateDate.indexOf(".")
              );
          }
        });
        setComments(comments);
        addNewCommentMoreMenu(comments);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const sendComment = () => {
    if (updatedComment.id === "") {
      const data = JSON.stringify({ description: commentInput });
      Axios.post("http://127.0.0.1:8787/api/comment", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("bearer_token"),
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((response: any) => {
          // console.log(response);
          setCommentInput("");
          getAllComments()
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      const data = JSON.stringify({
        description: commentInput,
      });
      Axios.patch(
        "http://127.0.0.1:8787/api/comment/" + updatedComment.id,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("bearer_token"),
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      )
        .then((response: any) => {
          console.log(response);
          setCommentInput("");
          setUpdatedComment(new Comment("", "", "", "", new Date()));
          getAllComments()
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  };

  const deleteComment = () => {
    let commentId = null;
    anchorElsOpen.forEach((value, key) => {
      if (value) commentId = key;
    });

    Axios.delete("http://127.0.0.1:8787/api/comment/" + commentId, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("bearer_token"),
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
      },
    })
      .then((response: any) => {
        console.log(response);
        getAllComments()
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const addNewCommentMoreMenu = (comments: Array<Comment>) => {
    const myId = getMyUserId();
    comments.forEach((comment: Comment) => {
      const authorId = comment.authorId;
      if (myId === authorId) {
        commentMoreMenuState.set(comment.id, false);
        setAnchorEls(anchorEls.set(comment.id, null));
        setAnchorElsOpen(anchorElsOpen.set(comment.id, false));
      }
    });
  };

  const [anchorEls, setAnchorEls] = React.useState<Map<null | HTMLElement>>(
    new Map()
  );
  const [anchorElsOpen, setAnchorElsOpen] = React.useState<Map<boolean>>(
    new Map()
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const anchorElOpen = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    commentId: string
  ) => {
    anchorEls.forEach((value, key) => {
      anchorEls.set(key, null);
    });
    setAnchorEls(anchorEls.set(commentId, event.currentTarget));
    setAnchorEl(event.currentTarget);
    anchorElsOpen.forEach((value, key) => {
      anchorElsOpen.set(key, false);
    });
    setAnchorElsOpen(anchorElsOpen.set(commentId, true));
  };
  const handleClose = (commentId: string) => {
    setAnchorEls(anchorEls.set(commentId, null));
    setAnchorEl(null);
    setAnchorElsOpen(anchorElsOpen.set(commentId, false));
  };
  const setUpdatedCommentRefInfo = () => {
    let commentId = "";
    anchorEls.forEach((value, key) => {
      if (value) commentId = key;
    });
    setUpdatedComment(new Comment(commentId, "", "", "", new Date()));
    for (let comment of comments) {
      if (comment.id === commentId) {
        setCommentInput(comment.description);
        break;
      }
    }
  };

  return (
    <Drawer
      open={props.state}
      onClose={props.close}
      anchor="right"
      className="comment-board"
      PaperProps={{
        sx: { width: "20%", minWidth: "320px" },
      }}
    >
      <Typography variant="h5" id="title">
        留言板
      </Typography>

      <Divider />
      <div className="comment-list">
        {comments.length >= 0 ? (
          comments.map((comment) => {
            return (
              <React.Fragment key={comment.id}>
                <List
                  sx={{
                    width: "100%",
                    bgColor: "background.paper",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt={comment.authorNickname} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={comment.authorNickname}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {comment.description}
                          </Typography>
                          <br />
                          {comment.updateDate}
                        </React.Fragment>
                      }
                    />

                    {getMyUserId() === comment.authorId && (
                      <React.Fragment>
                        <IconButton
                          key={comment.id + "-icon-button"}
                          aria-label="more"
                          id="long-button"
                          aria-controls={anchorElOpen ? "long-menu" : undefined}
                          aria-expanded={anchorElOpen ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={(event) => handleClick(event, comment.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          key={comment.id + "-menu"}
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={anchorElOpen}
                          onClose={() => handleClose(comment.id)}
                          PaperProps={{
                            style: {
                              width: "80px",
                              textAlign: "center",
                            },
                          }}
                        >
                          <MenuItem
                            key={comment.id + "-edit"}
                            onClick={() => {
                              // console.log("update behavior    " + comment.id);
                              // setCommentInput(comment.description);
                              setUpdatedCommentRefInfo();
                              handleClose(comment.id);
                            }}
                          >
                            編輯
                          </MenuItem>
                          <MenuItem
                            key={comment.id + "-delete"}
                            onClick={() => {
                              deleteComment();
                              handleClose(comment.id);
                            }}
                          >
                            刪除
                          </MenuItem>
                        </Menu>
                      </React.Fragment>
                    )}
                  </ListItem>
                </List>
                <Divider />
              </React.Fragment>
            );
          })
        ) : (
          <React.Fragment>nothing</React.Fragment>
        )}
      </div>

      <div id="input-section">
        {localStorage.getItem("bearer_token") ? (
          <TextField
            id=""
            type="text"
            autoComplete=""
            defaultValue=""
            variant="outlined"
            multiline={true}
            onChange={(event) => {
              setCommentInput(event.target.value);
              // console.log(commentInput);
            }}
            value={commentInput}
            className="comment-text-field input-enabled"
            autoFocus={true}
            minRows="1"
            maxRows="2"
            InputProps={{
              sx: {
                paddingTop: "8px",
                paddingBottom: "8px",
                paddingRight: "0px",
              },
              endAdornment: (
                <IconButton id="send-button" onClick={sendComment}>
                  <SendIcon />
                </IconButton>
              ),
            }}
          />
        ) : (
          <TextField
            id=""
            label="請先登入"
            type="text"
            variant="outlined"
            multiline={true}
            className="comment-text-field input-disabled"
            disabled={true}
            defaultValue=""
          />
        )}
      </div>
    </Drawer>
  );
};

const getMyUserId = () => {
  const bearerToken = localStorage.getItem("bearer_token");
  if (!bearerToken) {
    return null;
  }
  const payload = bearerToken.split(".")[1];
  return JSON.parse(atob(payload)).id;
};

type SvgIconComponent = typeof SvgIcon;

class Comment {
  id: string;
  authorId: string;
  authorNickname: string;
  description: string;
  updateDate: Date;

  constructor(
    id: string,
    authorId: string,
    authorNickname: string,
    description: string,
    updateDate: Date
  ) {
    this.id = id;
    this.authorId = authorId;
    this.authorNickname = authorNickname;
    this.description = description;
    this.updateDate = updateDate;
  }
}
