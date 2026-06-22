import {  Routes, Route } from "react-router-dom";

// PUBLIC
import Home from "./publicApp/pages/Home/Home";

// ADMIN
import Login from "./adminApp/pages/Login/Login"; 
import Dashboard from "./adminApp/pages/Dashboad/Dashboard";

// PROTECTED
import ProtectedRoute from "./adminApp/components/ProtectedRoute";
import ProfilePage from "./adminApp/pages/Profile/ProfilePage";
import NewsPage from "./adminApp/pages/News/News";
import AchievementsPage from "./adminApp/pages/Achievements/Achievement";
import LeadershipPage from "./adminApp/pages/Leadership/LeadershipPage";
import GalleryPage from "./adminApp/pages/Gallery/Gallery";
import Navbar from "./publicApp/components/Navbar/Navbar";
import Footer from "./publicApp/components/Footer/Footer";
import About from "./publicApp/sections/About/About";
import Leadership from "./publicApp/sections/leadership/Leadership";
import Achievements from "./publicApp/sections/Achievement/Achievement";
import Gallery from "./publicApp/sections/Gallery/Gallery";
import News from "./publicApp/sections/News/News";
import Skills from "./publicApp/sections/Skills/Skills";
import Education from "./publicApp/sections/Education/Education";
import EducationPage from "./adminApp/pages/Education/Education";
import SkillsPage from "./adminApp/pages/Skills/Skills";

function App() {
  return (
    // <BrowserRouter>
    <>
    <Navbar/>
      <Routes>

        {/* 🌍 PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/education" element={<Education/>} />
      
        {/* <Route path="/contact" element={<contacts/>} /> */}


        {/* 🔐 ADMIN */}
        <Route path="/admin/login" element={<Login />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />


        <Route
        path="/admin/leadership"
        element={
          <ProtectedRoute>
            <LeadershipPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/achievements"
        element={
          <ProtectedRoute>
            <AchievementsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute>
            <GalleryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/news"
        element={
          <ProtectedRoute>
            <NewsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/education"
        element={
          <ProtectedRoute>
            <EducationPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/skills"
        element={
          <ProtectedRoute>
            <SkillsPage />
          </ProtectedRoute>
        }
      />

      

      </Routes>
      <Footer/>
      </>
    // </BrowserRouter>
  );
}

export default App;