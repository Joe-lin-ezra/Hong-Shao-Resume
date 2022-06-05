import React from "react";
import "./App.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LayoutBar } from "./components/LayoutBar";

import { BiographyPage } from "./pages/BiographyPage";
import { CVPage } from "./pages/CVPage";
import { HomePage } from "./pages/HomePage";
import { LandingPage } from "./pages/LandingPage";
import { LanguagePage } from "./pages/LanguagePage";
import { LoginPage } from "./pages/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ProjectExperiencePage } from "./pages/ProjectExperiencePage";
import { SchoolPage } from "./pages/SchoolPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SkillPage } from "./pages/SkillPage";
import { UnderConstructPage } from "./pages/UnderConstructPage";
import { WorkPage } from "./pages/WorkPage";

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
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/biography" element={<UnderConstructPage />} />
                <Route path="/cv" element={<UnderConstructPage />} />
                <Route path="/language" element={<UnderConstructPage />} />
                <Route
                  path="/projectExperience"
                  element={<UnderConstructPage />}
                />
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
