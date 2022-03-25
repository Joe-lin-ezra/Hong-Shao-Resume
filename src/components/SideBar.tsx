import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import 
{
  AccountCircleOutlined, BookOutlined, Code, DescriptionOutlined,
  HomeOutlined, Language, SchoolOutlined, WorkHistoryOutlined
} from '@mui/icons-material';

import './sideBar.scss';

type SvgIconComponent = typeof SvgIcon;

class ListContent {
  primary: string;
  secondary: string;
  icon: SvgIconComponent;

  constructor(pri: string, sec: string, icon: SvgIconComponent ) {
    this.primary = pri;
    this.secondary = sec;
    this.icon = icon;
  }
}

export const Sidebar = (props: { state: boolean, close: () => void }) => {
  let listContent = new Array<ListContent>();
  listContent.push(new ListContent('首頁', '', HomeOutlined));
  listContent.push(new ListContent('自傳', '大學至今', AccountCircleOutlined));
  listContent.push(new ListContent('簡歷', '', DescriptionOutlined));
  listContent.push(new ListContent('工作經驗', '', WorkHistoryOutlined));
  listContent.push(new ListContent('專案與作品集', '10+', BookOutlined));
  listContent.push(new ListContent('語言能力', '自然語言', Language));
  listContent.push(new ListContent('專業技能', '程式語言 工具', Code));
  listContent.push(new ListContent('學歷', '學士', SchoolOutlined));

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
                <ListItem button>
                  <obj.icon className={'icons'}/>
                  <ListItemText primary={obj.primary} secondary={obj.secondary}/>
                </ListItem>
              );
            })
          }
        </List>
      </Box>
    </Drawer>
  );
}
