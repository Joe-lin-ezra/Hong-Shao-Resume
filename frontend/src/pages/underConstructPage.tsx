import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import './UnderConstructPage.scss'

import '../utils/font-format.scss';

export const UnderConstructPage = (): JSX.Element => {
  return (
    <Box className="underConstructPage">
      <Link to="/home">
        <Box className="underConstructImg" />
      </Link>
    </Box>
  );
}
