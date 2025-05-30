import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Home pages
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Footer from './pages/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
// Jobs Pages
import Jobs from './components/JobManagement/Jobs';
import JobDetails from './components/JobManagement/JobDetailPage';
import CreateJobPage from './components/JobManagement/CreateJobPage';
import EditJobPage from './components/JobManagement/EditJobPage';
// Student Pages
import StudentDashboard from './components/Dashboard/StudentDashboard';
import Student_Profile from './components/Profile/Student_Profile';
import StudentApplications from './components/Profile/Student/StudentApplication';
import StudentResources from './components/Profile/Student/StudentResources';
import StudentCompanyDeadline from './components/Profile/Student/StudentCompanyDeadline';
// Recruiter Pages
import RecruiterDashboard from './components/Dashboard/RecruiterDashboard';
import Recruiter_Profile from './components/Profile/Recruiter_Profile';
import RecruiterManageJobs from './components/Profile/Recruiter/RecruiterManageJobs';
import RecruiterAnalytics from './components/Profile/Recruiter/RecruiterAnalytics';
import RecruiterStudentApplications from './components/Profile/Recruiter/RecruiterStudentApplications';
import RecruiterScheduleInterview from './components/Profile/Recruiter/Interview/RecruiterScheduleInterview';
import RecruiterScheduleInterview_example from './components/Profile/Recruiter/Interview/RecruiterScheduleInterview_example';
// Admin Pages
import AdminPanel from './components/Dashboard/AdminPanel';
import AdminUserManagement from './components/Admin/AdminUserManagement';
import AdminJobManagement from './components/Admin/AdminJobManagement';
import AdminSettings from './components/Admin/AdminSettings';
import AdminAnalytics from './components/Admin/AdminAnalytics';
import AuditLog from './components/Admin/AuditLog';
// Other Pages
import FAQ from './components/QndA/FAQ';
import AboutUs from './components/QndA/AboutUs';
import Contact from './components/QndA/Contact';
import Career from './components/QndA/Career';
import Blog from './components/QndA/Blog';
import TermsOfService from './components/QndA/TermsOfService';
import PrivacyPolicy from './components/QndA/PrivacyPolicy';
import CookiesPolicy from './components/QndA/CookiePolicy';
import { AuthProvider } from './config/AuthContext';
import { ThemeProvider } from './config/ThemeContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Home Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Admin Pages */}
              <Route path="/admin-panel" element={<AdminPanel />} />
              <Route path="/admin-users" element={<AdminUserManagement />} />
              <Route path="/admin-jobs" element={<AdminJobManagement />} />
              <Route path="/admin-settings" element={<AdminSettings />} />
              <Route path="/admin-analytics" element={<AdminAnalytics />} />
              <Route path="/admin-audit-log" element={<AuditLog />} />
              {/* Jobs Pages */}
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/create-job" element={<CreateJobPage />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/jobs/:id/edit" element={<EditJobPage />} />
              <Route path="/edit-job/:id" element={<EditJobPage />} />
              {/* Student Pages */}
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/student_profile" element={<Student_Profile />} />
              <Route path="/student-applications" element={<StudentApplications />} />
              <Route path="/student-resources" element={<StudentResources />} />
              <Route path="/student-company-deadline" element={<StudentCompanyDeadline />} />
              {/* Recruiter Pages */}
              <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
              <Route path="/recruiter_profile" element={<Recruiter_Profile />} />
              <Route path="/recruiter-manage-jobs" element={<RecruiterManageJobs />} />
              <Route path="/recruiter-analytics" element={<RecruiterAnalytics />} />
              <Route path="/recruiter-student-applications" element={<RecruiterStudentApplications />} />
              <Route path="/recruiter-schedule-interview" element={<RecruiterScheduleInterview />} />
              <Route path="/recruiter-schedule-interview_example" element={<RecruiterScheduleInterview_example />} />
              {/* Other Pages */}
              <Route path="/faq" element={<FAQ />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Career />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookies-policy" element={<CookiesPolicy />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;