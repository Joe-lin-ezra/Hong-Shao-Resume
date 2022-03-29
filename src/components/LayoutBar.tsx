import * as React from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { StyledEngineProvider } from '@mui/material/styles';

import { Sidebar } from './SideBar';

import './layoutBar.scss'

export const LayoutBar = () => {
  const [sidebarState, setSidebarState] = React.useState<boolean>(false);
  const toggleSidebar = (state: boolean) => () => {
    setSidebarState(state);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Box id={'layout'}>
        <AppBar className={'appBar'}>
          <Toolbar>
            <IconButton size='large'
              onClick={toggleSidebar(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Sidebar
          state={sidebarState}
          close={toggleSidebar(false)}
        />
      </Box>
    </StyledEngineProvider>
  );
}
