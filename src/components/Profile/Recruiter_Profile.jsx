import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Recruiter_Profile.css';
import {
  UserOutlined,
  TeamOutlined,
  MailOutlined,
  PhoneOutlined,
  ManOutlined, 
  WomanOutlined, 
  QuestionCircleOutlined, 
  QuestionOutlined, 
  BankOutlined,
  ReadOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  ToolOutlined,
  BookOutlined,
  LinkedinOutlined,
  GithubOutlined,
  GlobalOutlined,
  FilePdfOutlined,
  PlusOutlined,
  SolutionOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  FolderOutlined,
  SafetyCertificateOutlined,
  TwitterOutlined
} from '@ant-design/icons';

const Recruiter_Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    company: '',
    position: '',
    bio: '',
    hiringFor: [],
    newHiringFor: '',
    companyDetails: {
      name: '',
      industry: '',
      size: '',
      website: '',
      description: ''
    },
    socialLinks: {
      linkedIn: '',
      twitter: ''
    }
  });

  const navigate = useNavigate();

  // Load sample data (replace with actual API call)
  useEffect(() => {
    const fetchProfileData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setProfileData({
        fullName: 'Sarah Williams',
        email: 'sarah.williams@techcorp.com',
        phone: '(555) 987-6543',
        gender: 'Female',
        company: 'TechCorp Inc.',
        position: 'Senior Talent Acquisition Specialist',
        bio: 'Experienced recruiter specializing in tech roles with 8+ years of experience connecting top talent with innovative companies.',
        hiringFor: ['Software Engineers', 'Data Scientists', 'UX Designers', 'Product Managers'],
        companyDetails: {
          name: 'TechCorp Inc.',
          industry: 'Information Technology',
          size: '1001-5000 employees',
          website: 'techcorp.com',
          description: 'Leading technology company specializing in enterprise software solutions and AI applications.'
        },
        socialLinks: {
          linkedIn: 'linkedin.com/in/sarahwilliams',
          twitter: 'twitter.com/sarah_recruiter'
        }
      });
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleCompanyChange = (field, value) => {
    setProfileData({
      ...profileData,
      companyDetails: {
        ...profileData.companyDetails,
        [field]: value
      }
    });
  };

  const handleSocialLinkChange = (platform, value) => {
    setProfileData({
      ...profileData,
      socialLinks: {
        ...profileData.socialLinks,
        [platform]: value
      }
    });
  };

  const handleHiringForAdd = () => {
    if (profileData.newHiringFor.trim() && !profileData.hiringFor.includes(profileData.newHiringFor.trim())) {
      setProfileData({
        ...profileData,
        hiringFor: [...profileData.hiringFor, profileData.newHiringFor.trim()],
        newHiringFor: ''
      });
    }
  };

  const handleHiringForRemove = (roleToRemove) => {
    setProfileData({
      ...profileData,
      hiringFor: profileData.hiringFor.filter(role => role !== roleToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsEditing(false);

    try {
      // Simulate API call to save data
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Profile saved:', profileData);
      // In a real app, you would show a success message here
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // In a real app, you might want to reload the original data here
  };

  const renderGenderIcon = (gender) => {
    switch(gender?.toLowerCase()) {
      case 'male':
        return <ManOutlined className="gender-icon male" />;
      case 'female':
        return <WomanOutlined className="gender-icon female" />;
      case 'other':
        return <QuestionOutlined className="gender-icon other" />;
      case 'prefer not to say':
        return <UserOutlined className="gender-icon neutral" />;
      default:
        return <QuestionOutlined className="gender-icon default" />;
    }
  };

  return (
    <div className="RP-recruiter-profile-container">
      <div className="RP-profile-header">
        <h1><TeamOutlined/> Recruiter Profile</h1>
        {!isEditing ? (
          <button
            className="RP-edit-btn"
            onClick={() => setIsEditing(true)}
          >
            <EditOutlined /> Edit Profile
          </button>
        ) : (
          <div className="RP-profile-actions">
            <button
              className="RP-cancel-btn"
              onClick={handleCancel}
            >
              <DeleteOutlined /> Cancel
            </button>
            <button
              className="RP-save-btn"
              onClick={handleSubmit}
            >
              <CheckCircleOutlined /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="RP-profile-content">
        <div className="RP-profile-section personal-info">
          <h2><UserOutlined /> Personal Information</h2>
          <div className="RP-form-grid">
            <div className="RP-form-group">
              <label><UserOutlined /> Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              ) : (
                <p>{profileData.fullName}</p>
              )}
            </div>

            <div className="RP-form-group">
              <label><MailOutlined /> Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              ) : (
                <p>{profileData.email}</p>
              )}
            </div>

            <div className="RP-form-group">
              <label><PhoneOutlined /> Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              ) : (
                <p>{profileData.phone}</p>
              )}
            </div>

            <div className="RP-form-group">
              <label>
                {renderGenderIcon(profileData.gender)}
                <span className="RP-gender-label">Gender</span>
              </label>
              {isEditing ? (
                <select
                  name="gender"
                  value={profileData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              ) : (
                <p>{profileData.gender}</p>
              )}
            </div>

            <div className="RP-form-group">
              <label><SolutionOutlined/> Position</label>
              {isEditing ? (
                <input
                  type="text"
                  name="position"
                  value={profileData.position}
                  onChange={handleChange}
                  placeholder="Your job title"
                />
              ) : (
                <p>{profileData.position}</p>
              )}
            </div>

            <div className="RP-form-group full-width">
              <label><BookOutlined /> Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about your recruiting experience..."
                  rows="3"
                />
              ) : (
                <p>{profileData.bio || 'No bio provided'}</p>
              )}
            </div>
          </div>
        </div>

        <div className="RP-profile-section company-info">
          <h2><BankOutlined /> Company Information</h2>
          <div className="RP-form-grid">
            <div className="RP-form-group">
              <label><BankOutlined /> Company Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.companyDetails.name}
                  onChange={(e) => handleCompanyChange('name', e.target.value)}
                  placeholder="Company name"
                />
              ) : (
                <p>{profileData.companyDetails.name}</p>
              )}
            </div>

            <div className="RP-form-group">
              <label><ReadOutlined /> Industry</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.companyDetails.industry}
                  onChange={(e) => handleCompanyChange('industry', e.target.value)}
                  placeholder="Industry"
                />
              ) : (
                <p>{profileData.companyDetails.industry}</p>
              )}
            </div>

            <div className="RP-form-group">
              <label><TeamOutlined/> Company Size</label>
              {isEditing ? (
                <select
                  value={profileData.companyDetails.size}
                  onChange={(e) => handleCompanyChange('size', e.target.value)}
                >
                  <option value="">Select size</option>
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="51-200 employees">51-200 employees</option>
                  <option value="201-500 employees">201-500 employees</option>
                  <option value="501-1000 employees">501-1000 employees</option>
                  <option value="1001-5000 employees">1001-5000 employees</option>
                  <option value="5000+ employees">5000+ employees</option>
                </select>
              ) : (
                <p>{profileData.companyDetails.size}</p>
              )}
            </div>

            <div className="RP-form-group">
              <label><GlobalOutlined/> Website</label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.companyDetails.website}
                  onChange={(e) => handleCompanyChange('website', e.target.value)}
                  placeholder="Company website"
                />
              ) : (
                <p>
                  {profileData.companyDetails.website ? (
                    <a
                      href={`https://${profileData.companyDetails.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profileData.companyDetails.website}
                    </a>
                  ) : 'Not provided'}
                </p>
              )}
            </div>

            <div className="RP-form-group full-width">
              <label><BookOutlined/> Company Description</label>
              {isEditing ? (
                <textarea
                  value={profileData.companyDetails.description}
                  onChange={(e) => handleCompanyChange('description', e.target.value)}
                  placeholder="Brief description of your company"
                  rows="3"
                />
              ) : (
                <p>{profileData.companyDetails.description || 'No description provided'}</p>
              )}
            </div>
          </div>
        </div>

        <div className="RP-profile-section hiring-for">
          <h2><QuestionCircleOutlined/> Roles You're Hiring For</h2>
          {isEditing ? (
            <div className="RP-hiring-for-edit">
              <div className="RP-hiring-for-input">
                <input
                  type="text"
                  value={profileData.newHiringFor}
                  onChange={(e) => setProfileData({ ...profileData, newHiringFor: e.target.value })}
                  placeholder="Add a role you're hiring for"
                  onKeyPress={(e) => e.key === 'Enter' && handleHiringForAdd()}
                />
                <button onClick={handleHiringForAdd}>Add</button>
              </div>
              <div className="RP-hiring-for-list">
                {profileData.hiringFor.map((role, index) => (
                  <div key={index} className="RP-role-tag">
                    {role}
                    <button onClick={() => handleHiringForRemove(role)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="RP-hiring-for-display">
              {profileData.hiringFor.length > 0 ? (
                <div className="RP-hiring-for-list">
                  {profileData.hiringFor.map((role, index) => (
                    <span key={index} className="RP-role-tag">{role}</span>
                  ))}
                </div>
              ) : (
                <p>No roles specified</p>
              )}
            </div>
          )}
        </div>

        <div className="RP-profile-section social-links">
          <h2><GlobalOutlined/> Social Links</h2>
          <div className="RP-form-grid">
            <div className="RP-form-group">
              <label><LinkedinOutlined/> LinkedIn</label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.socialLinks.linkedIn}
                  onChange={(e) => handleSocialLinkChange('linkedIn', e.target.value)}
                  placeholder="LinkedIn profile URL"
                />
              ) : profileData.socialLinks.linkedIn ? (
                <a
                  href={`https://${profileData.socialLinks.linkedIn}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileData.socialLinks.linkedIn}
                </a>
              ) : (
                <p>Not provided</p>
              )}
            </div>

            <div className="RP-form-group">
              <label><TwitterOutlined/> Twitter</label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.socialLinks.twitter}
                  onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                  placeholder="Twitter profile URL"
                />
              ) : profileData.socialLinks.twitter ? (
                <a
                  href={`https://${profileData.socialLinks.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileData.socialLinks.twitter}
                </a>
              ) : (
                <p>Not provided</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruiter_Profile;