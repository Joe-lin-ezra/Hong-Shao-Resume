import * as React from "react";

import { Link } from "react-router-dom";
import { Box, Avatar, Divider, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
import { GitHub, LocalPhoneOutlined, EmailOutlined } from '@mui/icons-material';

import './HomePage.scss';
import '../utils/font-format.scss';
import avatar from '../assets/avatar.png';

export const HomePage = (): JSX.Element => {
  return (
    <Box className={'homePage'}>
      <div id="bg" />
      {/* left side */}
      <Box className={'left'} >
        <div className={'background-blur'}>
          <Avatar alt="my handsome face" src={avatar} className={'avatar'} />
          <Typography sx={{ fontSize: 28 }} className={'chinese-text-format'}> 林泓劭 </Typography>
          <Typography sx={{ fontSize: 20 }}> Joe, Lin</Typography>

          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon children={<GitHub />} />
                <ListItemText primary="Joe, Lin, Hong-Shao" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon children={<LocalPhoneOutlined />} />
                <ListItemText primary="0921727303" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon children={<EmailOutlined />} />
                <ListItemText primary="joelin.hongshao. business" secondary="gmail.com" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      </Box>
      {/* right side */}
      <Box className={'right'}>
        <section className={'section background-blur'}>
          <h2 className={'h2'}> 介紹 </h2>
          <Divider className={'divider'} />
          <Typography className={'textContent'}>
            「凡殺不死我的，必使我更強大。」 — 弗里德里希．尼采（Friedrich Nietzsche）
            <br /><br />
            在大學四年中遇到了許多的挫折，無論是「超修的同時要維持高分的壓力」、
            「專題品質與時程的壓力」、「展演必出Bug定律」、「與他人合作時溝通不清的挫折」、
            「實習的挫敗」，抑或是「跨領域學習時因未具備該領域之基礎知識而格外辛苦」，
            而這些糟糕的情況都未能擊敗我，反而使我更加清楚自己的不足，並加以精進。
          </Typography>
          <Link to="/biography" className="more-link-tag">more ...</Link>
        </section>

        <section className={'section background-blur'}>
          <h2 className={'h2'}> 簡歷 </h2>
          <Divider className={'divider'} />
          <Typography className={'textContent'}>
            邏輯能力: 平時會去 Leetcode 解題練習，並根據當時未通過的測資，審視並修正邏輯漏洞
            ；解題後也會觀察討論區或解答區中其他解題方案，將其內化，並以其為基礎再練習一次。
            並根據空閒時間報名Weekly Contest、Biweekly contest，來挑戰自己。
            <br /><br />
            Web前端: 在接觸 Figma、React、Mui 這些框架與設計系統後，逐漸對前端產生興趣，
            平時會看Pinterest中各類設計，也會觀看IG用戶錄下的CSS撰寫與展示。
            <br /><br />
            Web後端: 相較於Web前端，我會更喜歡後端，無論是密碼加密保存、資料處理、發放Token，
            都需要大量的思考，並得出該如何處置才會使系統執行得更快，節省更多的記憶體。
            <br /><br />
            IoT： 在IoT方面，在大四下時參加了創科資訊(Trunk Studio)所開辦的Monosparta軟體工程培訓中，
            接觸到了IoT的相關專案，無論是從一開始的溫溼度感測器，或是到後來的I2C顯示，以及未來的
            紅外線感測，讓我在實做中學習成長。
            <br /><br />
            硬體： 在大二時曾經學習過如何撰寫VHDL，當時因為並未能清楚的理解硬體是如何運作邏輯的，
            因此對於硬體感到灰心喪志。後來學習到多程序、多執行續，以及系統程式與作業系統後財對於
            硬體的運作有了近一步的概念，未來若是再碰到相關的問題時，必不像當初迷茫。
            <br /><br />
            VR: 畢業專題製作使用Unity、C#、Mirror、Vive pro製作VR連線遊戲，在課程與畢展結束後，
            仍會接收到校方展出、Demo的邀請。
            <br /><br />
            測試: 在Monosparta訓練期間，讓我知道了自動化測試是多麼重要的一件事情，因為每當我們修改了
            部分的程式碼時，就又需要將全部功能手動測試一遍，這讓我感到非常的麻煩。若是未來專案再更大些，
            手動測試將不再可能是一個選項，因此儘快學習自動化測試將是近期的重中之重。
            <br /><br />
            人工智慧: 身處在資訊的洪流之中，必須學習人工智慧、機器學習、深度學習等相關知識，但目前因設備因素
            只針對於知識進行加強，若未來有機會能夠接觸到相關專案與設備，必全力以赴。
            <br /><br />
            專案管理: 在大學期間接觸到了專案管理的課程，在每次的上台報告中，老師都會根據我們的
            報告內容給予肯定與建議，一整個學期結束後收穫頗豐。後續也有訂閱相關雜誌的電子報，改善
            溝通時的語氣、聲調、發音、用詞、表情、態度......等等。
          </Typography>
          <Link to="/cv" className="more-link-tag">more ...</Link>
        </section>

        <section className={'section background-blur'}>
          <h2 className={'h2'}> 工作經驗 </h2>
          <Divider className={'divider'} />
          <Timeline>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                (2021/02 ~ 2022/01)
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                CPE(College Programming Examination)監考考官。
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                (2021/02 ~ 2021/06)
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                系統程式課程助教
                <br />
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                (2020/11 ~ 2021/06)
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                逢甲經濟通系統後端維護
                <br />
              </TimelineContent>
            </TimelineItem>
          </Timeline>
          <Link to="/cv" className="more-link-tag">more ...</Link>
        </section>

        <section className={'section background-blur'}>
          <h2 className={'h2'}> 活動經驗 </h2>
          <Divider className={'divider'} />
          <Timeline>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                大四
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                預見逢甲：與它系畢業專題首席組別於同一場域擺設攤位展示作品，更榮獲該場域第二受歡迎之攤位。
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                大三
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                CDIO 人文科技創新工作坊-逢甲生活圈 AR 互動體驗平台
              </TimelineContent>
            </TimelineItem>
          </Timeline>
          <Link to="/work" className="more-link-tag">more ...</Link>
        </section>

        <section className={'section background-blur'}>
          <h2 className={'h2'}> 專案與作品集 </h2>
          <Divider className={'divider'} />
          <Timeline>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                大四上
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                利用系所資源製作VR畢業專題，為讓專題準時產出，經常性於研究室研究至午夜時段。
                <br />
                <br />
                利用課本的資料集與SPPA的集群分析法，針對該數據所顯示之產品研發或銷售給出建議，並獲老師讚賞。
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                大三
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                海戰棋：實作時會注意「程式碼壞味道」、「設計樣式」以降低未來維護成本。
                <br />
                <br />
                耗時三個月取得PMA、PAM+證照(發行於中華專案管理協會)。
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                大二
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                戰爭遊戲：帶領 4 位夥伴，一同參加系上舉辦的深碗競賽，並於當時獲得優選。
                <br />
                <br />
                選課機器人：與 3 位夥伴合作，製作選課機器人協助搶課事宜。
                <br />
                <br />
                企業合作：「量身訂做提升官方 IG 追蹤數之行動」，協助店家提高至 50 追蹤數。
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineOppositeContent color="text.secondary">
                大一
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                利用Python爬蟲，查找使用者輸入文字之圖片，並進行下載。
                <br />
                <br />
                利用 C 語言製作簡易的成績登記系統。
              </TimelineContent>
            </TimelineItem>
          </Timeline>
          <Link to="/projectExperience" className="more-link-tag">more ...</Link>
        </section>

        <section className={'section background-blur'}>
          <h2 className={'h2'}> 語言能力 </h2>
          <Divider className={'divider'} />
          <Typography className={'textContent'}>
            中: native
            <br />
            英: 聽(中上)說(中上)讀(中上)寫(中上)。多益702分
          </Typography>
          <Link to="/language" className="more-link-tag">more ...</Link>
        </section>
        <section className={'section background-blur'}>
          <h2 className={'h2'}> 專業技能 </h2>
          <Divider className={'divider'} />
          <Typography className={'textContent'}>
            <div>
              <p>程式語言</p>
              <span>
                C, C#, Java, JavaScript, TypeScript, SQL, Python, VHDL, SIC, SIC/XE
              </span>
            </div>
            <div>
              <p>工具、框架</p>
              <span>
                Git, GitHub, React, Angular, MQTT, MySQL, PostgreSQL, Docker, Unity, Figma, Heroku, SteamVR, Vuforia
              </span>
            </div>
          </Typography>
          <Link to="/skill" className="more-link-tag">more ...</Link>
        </section>
        <section className={'section last-element background-blur'}>
          <h2 className={'h2'}> 學經歷 </h2>
          <Divider className={'divider'} />
          <Typography className={'textContent'}>
            資訊工程學系 | 逢甲大學 (2018~2022(expected))
            <br />
            每個學期 GPA 皆維持於 3.5 以上，目前班級累計排名第 2
          </Typography>
          <Link to="/school" className="more-link-tag">more ...</Link>
        </section>
      </Box>
    </Box>
  );
}
