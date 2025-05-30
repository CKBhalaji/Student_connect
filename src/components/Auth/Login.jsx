import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../config/AuthContext';
import { 
  UserOutlined,
  TeamOutlined,
  BankOutlined,
  MailOutlined,
  LockOutlined,
  GoogleOutlined,
  GithubOutlined,
  LoadingOutlined 
} from '@ant-design/icons';
import { Spin } from 'antd';
import './Login.css';
import { APP_NAME, APP_FIRST_LETTER} from '../../config/constants';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeRole, setActiveRole] = useState('student');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Add this line with other state declarations
  const { login } = useContext(AuthContext);
  
  // Modify the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On successful login
      login({
        role: activeRole,
        email: formData.email,
        // Add other user data you get from API response
      });
      
      // Navigation based on role
      if (activeRole === 'student') {
        navigate('/student-dashboard');
      } else if (activeRole === 'recruiter') {
        navigate('/recruiter-dashboard');
      } else if (activeRole === 'admin') {
        navigate('/admin-panel');
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LO-login-container">
      <div className="LO-login-card">
        <div className="LO-login-header">
          <div className="LO-logo">
            <span className="LO-logo-icon">{APP_FIRST_LETTER}</span>
            <span className="LO-logo-text">{APP_NAME}</span>
          </div>
          <div className="LO-slider-container">
            <div className="LO-slider">
              <button className={`LO-slider-item ${activeRole === 'student' ? 'active' : ''}`} 
                onClick={() => setActiveRole('student')}>
                <UserOutlined /> Student
              </button>
              <button className={`LO-slider-item ${activeRole === 'recruiter' ? 'active' : ''}`} 
                onClick={() => setActiveRole('recruiter')}>
                <TeamOutlined /> Recruiter
              </button>
              <button className={`LO-slider-item ${activeRole === 'admin' ? 'active' : ''}`} 
                onClick={() => setActiveRole('admin')}>
                <BankOutlined /> Admin
              </button>
            </div>
          </div>
          <h1>Welcome back</h1>
          <p>Sign in to your account to continue</p>
        </div>

        {error && <div className="LO-alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="LO-login-form">
          <div className="LO-form-group">
            <label htmlFor="email">Email address</label>
            <div className="LO-input-with-icon">
              <MailOutlined className="LO-input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div className="LO-form-group">
            <div className="LO-password-label">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="LO-forgot-password">
                Forgot password?
              </Link>
            </div>
            <div className="LO-input-with-icon">
              <LockOutlined className="LO-input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="LO-form-options">
            <label className="LO-checkbox-container">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span className="LO-checkmark"></span>
              Remember me
            </label>
          </div>

          <button type="submit" className="LO-login-btn" disabled={loading}>
            {loading ? (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} />
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="LO-login-footer">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
          <div className="LO-social-login">
            <p>Or sign in with:</p>
            <div className="LO-social-icons">
              <button type="button" className="LO-social-btn google">
                <GoogleOutlined /> Google
              </button>
              <button type="button" className="LO-social-btn github">
                <GithubOutlined /> GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;