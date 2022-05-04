import * as React from 'react';


import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { AppBar, Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Sidebar } from './SideBar';


import './layoutBar.scss'

export const LayoutBar = (props: any) => {
  const [sidebarState, setSidebarState] = React.useState<boolean>(false);
  const toggleSidebar = (state: boolean) => () => {
    setSidebarState(state);
  };

  return (
    <div>
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
      <Outlet />
    </div>
      
  );
}
