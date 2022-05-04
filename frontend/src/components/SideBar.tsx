import * as React from "react";

import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import SvgIcon from '@mui/material/SvgIcon';
import {
  AccountCircleOutlined, BookOutlined, Code, DescriptionOutlined,
  HomeOutlined, Language, SchoolOutlined, WorkHistoryOutlined
} from '@mui/icons-material';

import './sideBar.scss';

type SvgIconComponent = typeof SvgIcon;

class ListContent {
  key: string;
  primary: string;
  secondary: string;
  icon: SvgIconComponent;

  constructor(k: string, pri: string, sec: string, icon: SvgIconComponent) {
    this.key = k;
    this.primary = pri;
    this.secondary = sec;
    this.icon = icon;
  }
}

export const Sidebar = (props: { state: boolean, close: () => void }): JSX.Element => {
  let listContent = new Array<ListContent>();
  listContent.push(new ListContent('home', '首頁', '', HomeOutlined));
  listContent.push(new ListContent('biography', '自傳', '大學至今', AccountCircleOutlined));
  listContent.push(new ListContent('cv', '簡歷', '', DescriptionOutlined));
  listContent.push(new ListContent('work', '工作經驗', '', WorkHistoryOutlined));
  listContent.push(new ListContent('projectExperience', '專案與作品集', '10+', BookOutlined));
  listContent.push(new ListContent('language', '語言能力', '自然語言', Language));
  listContent.push(new ListContent('skill', '專業技能', '程式語言 工具', Code));
  listContent.push(new ListContent('school', '學經歷', '學士', SchoolOutlined));

  return (
    <Drawer open={props.state} onClose={props.close} >
      <Box
        className={'sidebar'}
        role="presentation"
        onClick={props.close}
      >
        <List>
          {
            listContent.map((obj: ListContent): JSX.Element => {
              return (
                <Link to={obj.key} className={'listItem'}>
                  <ListItem button={true} key={obj.key}>
                    <ListItemIcon>
                      <obj.icon />
                    </ListItemIcon>
                    <ListItemText primary={obj.primary} secondary={obj.secondary} />
                  </ListItem>
                </Link>
              );
            })
          }
        </List>
      </Box>
    </Drawer>
  );
}
