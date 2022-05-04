import React from 'react';
import './App.scss';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  BiographyPage, CVPage, HomePage, LandingPage, UnderConstructPage,
  LanguagePage, NotFoundPage, ProjectExperiencePage, SchoolPage, SkillPage, WorkPage
} from "./pages/index";
import { LayoutBar } from './components/LayoutBar';


function App() {
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <div className={"font-format"}>
          <BrowserRouter>
            <Routes>
              {/* <Route path="/" element={<LandingPage />} /> */}
              <Route path="/" element={<UnderConstructPage />} />
              <Route element={<LayoutBar />}>
                {/* <Route path="/biography" element={<BiographyPage />} /> */}
                {/* <Route path="/cv" element={<CVPage />} /> */}
                <Route path="/home" element={<HomePage />} />
                {/* <Route path="/language" element={<LanguagePage />} /> */}
                {/* <Route path="/projectExperience" element={<ProjectExperiencePage />} /> */}
                {/* <Route path="/school" element={<SchoolPage />} /> */}
                {/* <Route path="/skill" element={<SkillPage />} /> */}
                {/* <Route path="/work" element={<WorkPage />} /> */}
                <Route path="/biography" element={<UnderConstructPage />} />
                <Route path="/cv" element={<UnderConstructPage />} />
                <Route path="/language" element={<UnderConstructPage />} />
                <Route path="/projectExperience" element={<UnderConstructPage />} />
                <Route path="/school" element={<UnderConstructPage />} />
                <Route path="/skill" element={<UnderConstructPage />} />
                <Route path="/work" element={<UnderConstructPage />} />
                <Route path="/*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
