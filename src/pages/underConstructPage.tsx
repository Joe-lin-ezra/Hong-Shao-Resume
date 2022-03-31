import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import './underConstructPage.scss'

import '../utils/font-format.scss';

export const underConstructPage = (): JSX.Element => {
  return (
    <Box className="underConstructPage">
      <Link to="/home">
        <Box className="underConstructImg" />
      </Link>
    </Box>
  );
}
