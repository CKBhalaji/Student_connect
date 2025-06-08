import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../config/AuthContext';
import { useTheme } from '../config/ThemeContext';
import { BankOutlined, LoadingOutlined } from '@ant-design/icons';
import './Navbar.css';
import { UserOutlined, TeamOutlined, SunOutlined, MoonOutlined, BulbOutlined, BulbFilled, MoonFilled, SolutionOutlined, CrownOutlined } from '@ant-design/icons';
import { APP_NAME , APP_FIRST_LETTER} from '../config/constants';

const Navbar = () => {
  const {
    isAuthenticated,
    userRole,
    userData,
    logout
  } = useAuth();

  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowProfileMenu(false);
  }, [location]);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simulate API call for resources
    const timer = setTimeout(() => {
      setResources([
        { name: 'Blog', path: '/Student_connect/blog' },
        { name: 'FAQ', path: '/Student_connect/faq' },
        { name: 'Contact', path: '/Student_connect/contact' },
        { name: 'Documentation', path: '/Student_connect/documentation' }
      ]);
      setLoadingResources(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderResourcesDropdown = () => (
    <div className="dropdown">
      <button className="dropdown-toggle">
        Resources <span className="caret">▾</span>
      </button>
      <div className="dropdown-menu">
        {loadingResources ? (
          <>
            <div className="dropdown-item loading">
              <div className="loading-line"></div>
            </div>
            <div className="dropdown-item loading">
              <div className="loading-line"></div>
            </div>
            <div className="dropdown-item loading">
              <div className="loading-line"></div>
            </div>
          </>
        ) : (
          resources.map((resource, index) => (
            <Link key={index} to={resource.path} className="dropdown-item">
              {resource.name}
            </Link>
          ))
        )}
        {userRole === 'admin' && !loadingResources && (
          <>
            <div className="dropdown-divider"></div>
            <Link to="/Student_connect/admin-documentation" className="dropdown-item">
              Admin Docs
            </Link>
          </>
        )}
      </div>
    </div>
  );

  const renderLoadingSkeleton = () => (
    <div className="nav-loading">
      <div className="loading-line">
        <LoadingOutlined className="loading-icon" />
        <div className="loading-bar"></div>
      </div>
    </div>
  );

  const renderAuthButtons = () => {
    if (isLoading) return renderLoadingSkeleton();
    if (!isAuthenticated) {
      return (
        <div className="nav-auth">
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {/* {theme === 'light' ? <BulbOutlined /> : <BulbFilled />} */}
            {/* {theme === 'light' ? <SunOutlined /> : <MoonOutlined />} */}
            {theme === 'light' ?  <MoonFilled /> : <SunOutlined />}
          </button>
          <Link to="/Student_connect/login" className="btn btn-outline">Login</Link>
          <Link to="/Student_connect/register" className="btn btn-primary">Sign Up</Link>
        </div>
      );
    }



    return (
      <div className="nav-profile">
        <button onClick={toggleTheme} className="theme-toggle-btn">
          {/* {theme === 'light' ? <BulbOutlined /> : <BulbFilled />} */}
          {/* {theme === 'light' ? <SunOutlined /> : <MoonOutlined />} */}
          {theme === 'light' ?  <MoonFilled /> : <SunOutlined />}
        </button>
        <button
          className="profile-button"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          {/* <img
            src={userData?.avatar ||
              (userRole === 'admin' ? '/images/admin_avatar.jpg' :
                userRole === 'student' ? '/images/student_avatar.jpg' : '/images/recruiter_avatar.jpg')}
            alt="Profile"
            className="profile-avatar"
          /> */}
          <div className="profile-avatar">
            {userData?.avatar ? (
              <img src={userData.avatar} alt="Profile" />
            ) : (
              <div className="avatar-icon-container">
                {userRole === 'admin' ? (
                  <BankOutlined className="role-icon" />
                ) : userRole === 'student' ? (
                  <UserOutlined className="role-icon" />
                ) : (
                  <TeamOutlined className="role-icon" />
                )}
              </div>
            )}
          </div>
          <div className="profile-info">
            {userData?.name && <span className="profile-name">{userData.name}</span>}
            <span className="profile-role">{userRole?.toUpperCase()}</span>
            <span className="profile-email">{userData?.email}</span>
          </div>
        </button>
        {showProfileMenu && (
          <div className="profile-dropdown">
            <Link
              to={
                userRole === 'admin' ? '/Student_connect/admin-panel' :
                  userRole === 'student' ? '/Student_connect/student_profile' : '/Student_connect/recruiter_profile'
              }
              className="profile-dropdown-item"
            >
              Profile
            </Link>
            {userRole === 'admin' && (
              <>
                <Link to="/Student_connect/admin-settings" className="profile-dropdown-item">
                  Admin Settings
                </Link>
                <Link to="/Student_connect/admin-audit-log" className="profile-dropdown-item">
                  Audit Log
                </Link>
              </>
            )}
            <button onClick={logout} className="profile-dropdown-item">Sign Out</button>
          </div>
        )}
      </div>
    );
  };

  const renderNavLinks = () => {
    if (isLoading) return renderLoadingSkeleton();
    if (!isAuthenticated) {
      return (
        <>
          <NavLink to="/Student_connect/jobs" className="nav-link">Jobs/Internships</NavLink>
          <NavLink to="/Student_connect/login?role=student" className="nav-link">For Students</NavLink>
          <NavLink to="/Student_connect/login?role=recruiter" className="nav-link">For Recruiters</NavLink>
        </>
      );
    }

    if (userRole === 'student') {
      return (
        <>
          <NavLink to="/Student_connect/jobs" className="nav-link">Available Jobs</NavLink>
          <NavLink to="/Student_connect/student-applications" className="nav-link">My Applications</NavLink>
          <NavLink to="/Student_connect/student-resources" className="nav-link">Resources</NavLink>
          <NavLink to="/Student_connect/student-dashboard" className="nav-link">Dashboard</NavLink>
        </>
      );
    }

    if (userRole === 'recruiter') {
      return (
        <>
          <NavLink to="/Student_connect/create-job" className="nav-link">Post a Job</NavLink>
          <NavLink to="/Student_connect/recruiter-manage-jobs" className="nav-link">Manage Jobs</NavLink>
          <NavLink to="/Student_connect/recruiter-analytics" className="nav-link">Analytics</NavLink>
          <NavLink to="/Student_connect/recruiter-dashboard" className="nav-link">Dashboard</NavLink>
        </>
      );
    }

    if (userRole === 'admin') {
      return (
        <>
          <NavLink to="/Student_connect/admin-users" className="nav-link">User Management</NavLink>
          <NavLink to="/Student_connect/admin-jobs" className="nav-link">Job Management</NavLink>
          <NavLink to="/Student_connect/admin-analytics" className="nav-link">Analytics</NavLink>
          {/* <NavLink to="/admin/system" className="nav-link">System</NavLink> */}
        </>
      );
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}${theme}`}>
      <div className="container">
        <div className="logo">
          {isLoading ? (
            <div className="logo-loading">
              <div className="loading-line-short"></div>
            </div>
          ) : (
            <Link to="/Student_connect">
              <span className="logo-icon">{APP_FIRST_LETTER}</span>
              <span className="logo-text">{APP_NAME}</span>
            </Link>
          )}
        </div>

        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <div className="nav-main">
            {renderNavLinks()}
            {renderResourcesDropdown()}
          </div>
          {renderAuthButtons()}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;