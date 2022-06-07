import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import './NotFoundPage.scss'

import '../utils/font-format.scss';

export const NotFoundPage = (): JSX.Element => {
  return (
    <Box className="notFoundPage">
      <Link to="/home">
        <Box className="notFoundImg" />
      </Link>
    </Box>
  );
}
