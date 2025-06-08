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
              <Route path="/Student_connect" element={<Home />} />
              <Route path="/Student_connect/login" element={<Login />} />
              <Route path="/Student_connect/register" element={<Register />} />
              {/* Admin Pages */}
              <Route path="/Student_connect/admin-panel" element={<AdminPanel />} />
              <Route path="/Student_connect/admin-users" element={<AdminUserManagement />} />
              <Route path="/Student_connect/admin-jobs" element={<AdminJobManagement />} />
              <Route path="/Student_connect/admin-settings" element={<AdminSettings />} />
              <Route path="/Student_connect/admin-analytics" element={<AdminAnalytics />} />
              <Route path="/Student_connect/admin-audit-log" element={<AuditLog />} />
              {/* Jobs Pages */}
              <Route path="/Student_connect/jobs" element={<Jobs />} />
              <Route path="/Student_connect/create-job" element={<CreateJobPage />} />
              <Route path="/Student_connect/jobs/:id" element={<JobDetails />} />
              <Route path="/Student_connect/jobs/:id/edit" element={<EditJobPage />} />
              <Route path="/Student_connect/edit-job/:id" element={<EditJobPage />} />
              {/* Student Pages */}
              <Route path="/Student_connect/student-dashboard" element={<StudentDashboard />} />
              <Route path="/Student_connect/student_profile" element={<Student_Profile />} />
              <Route path="/Student_connect/student-applications" element={<StudentApplications />} />
              <Route path="/Student_connect/student-resources" element={<StudentResources />} />
              <Route path="/Student_connect/student-company-deadline" element={<StudentCompanyDeadline />} />
              {/* Recruiter Pages */}
              <Route path="/Student_connect/recruiter-dashboard" element={<RecruiterDashboard />} />
              <Route path="/Student_connect/recruiter_profile" element={<Recruiter_Profile />} />
              <Route path="/Student_connect/recruiter-manage-jobs" element={<RecruiterManageJobs />} />
              <Route path="/Student_connect/recruiter-analytics" element={<RecruiterAnalytics />} />
              <Route path="/Student_connect/recruiter-student-applications" element={<RecruiterStudentApplications />} />
              <Route path="/Student_connect/recruiter-schedule-interview" element={<RecruiterScheduleInterview />} />
              <Route path="/Student_connect/recruiter-schedule-interview_example" element={<RecruiterScheduleInterview_example />} />
              {/* Other Pages */}
              <Route path="/Student_connect/faq" element={<FAQ />} />
              <Route path="/Student_connect/about-us" element={<AboutUs />} />
              <Route path="/Student_connect/blog" element={<Blog />} />
              <Route path="/Student_connect/contact" element={<Contact />} />
              <Route path="/Student_connect/careers" element={<Career />} />
              <Route path="/Student_connect/terms-of-service" element={<TermsOfService />} />
              <Route path="/Student_connect/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/Student_connect/cookies-policy" element={<CookiesPolicy />} />
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