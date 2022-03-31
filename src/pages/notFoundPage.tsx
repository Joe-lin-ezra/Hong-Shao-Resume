import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import './notFoundPage.scss'

import '../utils/font-format.scss';

export const notFoundPage = (): JSX.Element => {
  return (
    <Box className="notFoundPage">
      <Link to="/home">
        <Box className="notFoundImg" />
      </Link>
    </Box>
  );
}
