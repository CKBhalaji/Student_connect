import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  UserOutlined,
  TeamOutlined,
  MailOutlined,
  LockOutlined,
  IdcardOutlined,
  ReadOutlined,
  CalendarOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  GoogleOutlined,
  GithubOutlined,
  LoadingOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { Spin } from 'antd';
import './Register.css';
import { APP_NAME, APP_FIRST_LETTER } from '../../config/constants';

const Register = () => {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') || 'student';
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: defaultRole,
    university: '',
    major: '',
    graduationYear: '',
    cgpa: '',
    skills: [],
    resume: null,
    companyName: '',
    jobTitle: '',
    industry: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [verificationCodeSent, setVerificationCodeSent] = useState(false);
  const [enteredVerificationCode, setEnteredVerificationCode] = useState('');
  const [storedVerificationCode, setStoredVerificationCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSendVerificationCode = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
      return;
    }

    // Generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setStoredVerificationCode(code);
    setVerificationCodeSent(true);

    // In real app, send this code to user's email
    console.log('Verification code:', code); // Remove this in production

    setErrors({ ...errors, email: null, verificationCode: null });
  };

  const handleVerifyCode = () => {
    if (enteredVerificationCode === storedVerificationCode) {
      setIsEmailVerified(true);
      setErrors({ ...errors, verificationCode: null });
    } else {
      setErrors({ ...errors, verificationCode: 'Invalid verification code' });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!isEmailVerified) {
      newErrors.api = 'Please verify your email address first';
      setErrors(newErrors);
      return false;
    }

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setErrors({ ...errors, api: err.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="RE-register-container">
        <div className="RE-register-card">
          <div className="RE-register-success">
            <CheckCircleOutlined className="RE-success-icon animated-check" />
            <h2>Registration Successful!</h2>
            <p>You will be redirected to the login page shortly.</p>
            <p>If not, <Link to="/login">click here</Link> to login.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="RE-register-container">
      <div className="RE-register-card">
        <div className="RE-register-header">
          <div className="RE-logo">
            <span className="RE-logo-icon">{APP_FIRST_LETTER}</span>
            <span className="RE-logo-text">{APP_NAME}</span>
          </div>
          <h1>Create your account</h1>
          <p>Join our platform to connect with {formData.role === 'student' ? 'career opportunities' : 'talented students'}</p>
        </div>

        {errors.api && <div className="RE-alert alert-error">{errors.api}</div>}

        <form onSubmit={handleSubmit} className="RE-register-form">
          {loading && (
            <div className="RE-loading-overlay">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 32, color: '#1890ff' }} spin />}
                tip="Creating your account..."
              />
            </div>
          )}

          {/* Email Verification Section */}
          <div className="RE-form-group">
            <label htmlFor="email">Email Address</label>
            <div className="RE-email-verification-container">
              <div className="RE-input-with-icon">
                <MailOutlined className="RE-input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'error' : ''}
                  disabled={verificationCodeSent}
                />
              </div>
              {!verificationCodeSent && (
                <button
                  type="button"
                  className="RE-verify-btn"
                  onClick={handleSendVerificationCode}
                  disabled={!formData.email}
                >
                  Send Code
                </button>
              )}
            </div>
            {errors.email && <span className="RE-error-message">{errors.email}</span>}
          </div>

          {verificationCodeSent && !isEmailVerified && (
            <div className="RE-form-group">
              <label htmlFor="verificationCode">Verification Code</label>
              <div className="RE-verification-code-container">
                <input
                  type="text"
                  id="verificationCode"
                  name="verificationCode"
                  value={enteredVerificationCode}
                  onChange={(e) => setEnteredVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                  className={errors.verificationCode ? 'error' : ''}
                />
                <button
                  type="button"
                  className="RE-verify-btn"
                  onClick={handleVerifyCode}
                  disabled={enteredVerificationCode.length !== 6}
                >
                  Verify
                </button>
              </div>
              {errors.verificationCode && (
                <span className="RE-error-message">{errors.verificationCode}</span>
              )}
              <p className="RE-code-note">
                We've sent a 6-digit verification code to your email address
              </p>
            </div>
          )}
          <div className={`RE-form-fields ${isEmailVerified ? '' : 'RE-disabled'}`}>
            <div className="RE-form-row">
              <div className="RE-form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="RE-input-with-icon">
                  <IdcardOutlined className="RE-input-icon" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className={errors.firstName ? 'error' : ''}
                    disabled={!isEmailVerified}
                  />
                </div>
                {errors.firstName && <span className="RE-error-message">{errors.firstName}</span>}
              </div>

              <div className="RE-form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="RE-input-with-icon">
                  <IdcardOutlined className="RE-input-icon" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className={errors.lastName ? 'error' : ''}
                    disabled={!isEmailVerified}
                  />
                </div>
                {errors.lastName && <span className="RE-error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="RE-form-row">
              <div className="RE-form-group">
                <label htmlFor="password">Password</label>
                <div className="RE-input-with-icon">
                  <LockOutlined className="RE-input-icon" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className={errors.password ? 'error' : ''}
                    disabled={!isEmailVerified}
                  />
                </div>
                {errors.password && <span className="RE-error-message">{errors.password}</span>}
              </div>

              <div className="RE-form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="RE-input-with-icon">
                  <LockOutlined className="RE-input-icon" />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className={errors.confirmPassword ? 'error' : ''}
                    disabled={!isEmailVerified}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="RE-error-message">{errors.confirmPassword}</span>
                )}
              </div>
            </div>

            <div className="RE-form-group">
              <label htmlFor="role">I am a</label>
              <div className="RE-role-options">
                <label className={`RE-role-option ${formData.role === 'student' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleChange}
                  />
                  <UserOutlined /> Student
                </label>
                <label className={`RE-role-option ${formData.role === 'recruiter' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={formData.role === 'recruiter'}
                    onChange={handleChange}
                  />
                  <TeamOutlined /> Recruiter
                </label>
              </div>
            </div>

            {formData.role === 'student' ? (
              <>
                <div className="RE-form-group">
                  <label htmlFor="university">University</label>
                  <div className="RE-input-with-icon">
                    <ReadOutlined className="RE-input-icon" />
                    <input
                      type="text"
                      id="university"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      placeholder="Enter your university"
                    />
                  </div>
                </div>
                <div className="RE-form-row">
                  <div className="RE-form-group">
                    <label htmlFor="major">Major</label>
                    <div className="RE-input-with-icon">
                      <ReadOutlined className="RE-input-icon" />
                      <input
                        type="text"
                        id="major"
                        name="major"
                        value={formData.major}
                        onChange={handleChange}
                        placeholder="Enter your major"
                      />
                    </div>
                  </div>
                  <div className="RE-form-group">
                    <label htmlFor="graduationYear">Graduation Year</label>
                    <div className="RE-input-with-icon">
                      <CalendarOutlined className="RE-input-icon" />
                      <input
                        type="text"
                        id="graduationYear"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        placeholder="Expected graduation year"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="RE-form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <div className="RE-input-with-icon">
                    <BankOutlined className="RE-input-icon" />
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>
                <div className="RE-form-row">
                  <div className="RE-form-group">
                    <label htmlFor="jobTitle">Job Title</label>
                    <div className="RE-input-with-icon">
                      <IdcardOutlined className="RE-input-icon" />
                      <input
                        type="text"
                        id="jobTitle"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Enter your job title"
                      />
                    </div>
                  </div>
                  <div className="RE-form-group">
                    <label htmlFor="industry">Industry</label>
                    <div className="RE-input-with-icon">
                      <SafetyCertificateOutlined className="RE-input-icon" />
                      <input
                        type="text"
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        placeholder="Enter your industry"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="RE-form-group RE-terms-group">
              <label className="RE-checkbox-container">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span className="RE-checkmark"></span>
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
              {errors.agreeTerms && <span className="RE-error-message">{errors.agreeTerms}</span>}
            </div>

            <button
              type="submit"
              className="RE-register-btn"
              disabled={loading || !isEmailVerified}
            >
              {loading ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} />
              ) : (
                'Create Account'
              )}
            </button>
          </div>  
        </form>
      <div className="RE-login-footer">
        <div className="RE-social-login">
          <p>Or sign up with:</p>
          <div className="RE-social-icons">
            <button type="button" className="RE-social-btn google" disabled={loading}>
              <GoogleOutlined /> Google
            </button>
            <button type="button" className="RE-social-btn github" disabled={loading}>
              <GithubOutlined /> GitHub
            </button>
          </div>
        </div>
        <p>Already have an account? <Link to="/login">Sign in</Link></p>
      </div>
    </div>
    </div >
  );
};

export default Register;