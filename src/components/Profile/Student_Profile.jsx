import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Student_Profile.css';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  ManOutlined, 
  WomanOutlined, 
  QuestionCircleOutlined, 
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
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  FolderOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';


const Student_Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  // Add gender to the initial state in profileData
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '', // Add gender field
    university: '',
    major: '',
    graduationYear: '',
    gpa: '',
    skills: [],
    newSkill: '',
    bio: '',
    education: [
      {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    experience: [
      {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    projects: [
      {
        name: '',
        description: '',
        technologies: ''
      }
    ],
    links: {
      linkedIn: '',
      github: '',
      portfolio: ''
    }
  });

  const navigate = useNavigate();

  // Load sample data (replace with actual API call)
  useEffect(() => {
    const fetchProfileData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      setProfileData({
        fullName: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        phone: '(555) 123-4567',
        gender: 'Male', // Add sample gender data
        university: 'State University',
        major: 'Computer Science',
        graduationYear: '2024',
        gpa: '3.7',
        skills: ['JavaScript', 'React', 'Python', 'Data Analysis'],
        bio: 'Passionate computer science student with experience in web development and data analysis. Seeking summer internship opportunities.',
        education: [
          {
            institution: 'State University',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            startDate: '2020-09-01',
            endDate: '2024-05-15',
            description: 'Minor in Mathematics. Dean\'s List for 3 semesters.'
          }
        ],
        experience: [
          {
            title: 'Web Development Intern',
            company: 'Tech Solutions Inc.',
            location: 'Remote',
            startDate: '2022-06-01',
            endDate: '2022-08-31',
            description: 'Developed React components for client dashboard. Collaborated with team using Agile methodology.'
          }
        ],
        projects: [
          {
            name: 'Campus Event Planner',
            description: 'Web application for students to browse and register for campus events.',
            technologies: 'React, Node.js, MongoDB'
          }
        ],
        links: {
          linkedIn: 'linkedin.com/in/alexjohnson',
          github: 'github.com/alexjohnson',
          portfolio: 'alexjohnson.dev'
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

  const handleNestedChange = (section, index, field, value) => {
    const updatedSection = [...profileData[section]];
    updatedSection[index][field] = value;
    setProfileData({
      ...profileData,
      [section]: updatedSection
    });
  };

  const handleAddItem = (section) => {
    const newItem = {};
    if (section === 'education') {
      newItem.institution = '';
      newItem.degree = '';
      newItem.fieldOfStudy = '';
      newItem.startDate = '';
      newItem.endDate = '';
      newItem.description = '';
    } else if (section === 'experience') {
      newItem.title = '';
      newItem.company = '';
      newItem.location = '';
      newItem.startDate = '';
      newItem.endDate = '';
      newItem.description = '';
    } else if (section === 'projects') {
      newItem.name = '';
      newItem.description = '';
      newItem.technologies = '';
    }

    setProfileData({
      ...profileData,
      [section]: [...profileData[section], newItem]
    });
  };

  const handleRemoveItem = (section, index) => {
    const updatedSection = [...profileData[section]];
    updatedSection.splice(index, 1);
    setProfileData({
      ...profileData,
      [section]: updatedSection
    });
  };

  const handleSkillAdd = () => {
    if (profileData.newSkill.trim() && !profileData.skills.includes(profileData.newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, profileData.newSkill.trim()],
        newSkill: ''
      });
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleLinkChange = (platform, value) => {
    setProfileData({
      ...profileData,
      links: {
        ...profileData.links,
        [platform]: value
      }
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
        return <QuestionCircleOutlined className="gender-icon other" />;
      case 'prefer not to say':
        return <UserOutlined className="gender-icon neutral" />;
      default:
        return <QuestionCircleOutlined className="gender-icon default" />;
    }
  };

  return (
    <div className="SP-profile-container">
      <div className="SP-profile-header">
        <h1><UserOutlined style={{ color: 'white' }} /> Student Profile</h1>
        {!isEditing ? (
          <button
            className="SP-edit-btn"
            onClick={() => setIsEditing(true)}
          >
            <EditOutlined /> Edit Profile
          </button>
        ) : (
          <div className="SP-SP-profile-actions">
            <button
              className="SP-cancel-btn"
              onClick={handleCancel}
            >
              <DeleteOutlined /> Cancel
            </button>
            <button
              className="SP-save-btn"
              onClick={handleSubmit}
            >
              <CheckCircleOutlined /> Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="SP-profile-content">
        <div className="SP-profile-section personal-info">
          <h2><UserOutlined />  Personal Information</h2>
          <div className="SP-form-grid">
            <div className="SP-form-group">
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

            <div className="SP-form-group">
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

            <div className="SP-form-group">
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

            {/* <div className="SP-form-group">
              <label><ManOutlined /> Gender</label>
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
            </div> */}

            <div className="SP-form-group">
              <label>
                {renderGenderIcon(profileData.gender)}
                <span className="SP-gender-label">Gender</span>
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

            <div className="SP-form-group">
              <label><BookOutlined /> Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows="3"
                />
              ) : (
                <p>{profileData.bio || 'No bio provided'}</p>
              )}
            </div>
          </div>
        </div>

        <div className="SP-profile-section academic-info">
          <h2><BankOutlined /> Academic Information</h2>
          <div className="SP-form-grid">
            <div className="SP-form-group">
              <label><BankOutlined /> University</label>
              {isEditing ? (
                <input
                  type="text"
                  name="university"
                  value={profileData.university}
                  onChange={handleChange}
                  placeholder="Enter your university"
                />
              ) : (
                <p>{profileData.university}</p>
              )}
            </div>

            <div className="SP-form-group">
              <label><ReadOutlined /> Major</label>
              {isEditing ? (
                <input
                  type="text"
                  name="major"
                  value={profileData.major}
                  onChange={handleChange}
                  placeholder="Enter your major"
                />
              ) : (
                <p>{profileData.major}</p>
              )}
            </div>

            <div className="SP-form-group">
              <label><CalendarOutlined /> Graduation Year</label>
              {isEditing ? (
                <input
                  type="text"
                  name="graduationYear"
                  value={profileData.graduationYear}
                  onChange={handleChange}
                  placeholder="Expected graduation year"
                />
              ) : (
                <p>{profileData.graduationYear}</p>
              )}
            </div>

            <div className="SP-form-group">
              <label><SafetyCertificateOutlined /> GPA/Percentage</label>
              {isEditing ? (
                <input
                  type="text"
                  name="gpa"
                  value={profileData.gpa}
                  onChange={handleChange}
                  placeholder="Enter your GPA"
                />
              ) : (
                <p>{profileData.gpa}</p>
              )}
            </div>
          </div>
        </div>

        <div className="SP-profile-section skills">
          <h2><ToolOutlined /> Skills</h2>
          {isEditing ? (
            <div className="SP-skills-edit">
              <div className="SP-skills-input">
                <input
                  type="text"
                  value={profileData.newSkill}
                  onChange={(e) => setProfileData({ ...profileData, newSkill: e.target.value })}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && handleSkillAdd()}
                />
                <button onClick={handleSkillAdd}>Add</button>
              </div>
              <div className="SP-skills-list">
                {profileData.skills.map((skill, index) => (
                  <div key={index} className="SP-skill-tag">
                    {skill}
                    <button onClick={() => handleSkillRemove(skill)}>×</button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="SP-skills-display">
              {profileData.skills.length > 0 ? (
                <div className="SP-skills-list">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="SP-skill-tag">{skill}</span>
                  ))}
                </div>
              ) : (
                <p>No skills added yet</p>
              )}
            </div>
          )}
        </div>

        <div className="SP-profile-section education">
          <div className="SP-section-header">
            <h2><ReadOutlined /> Education</h2>
            {isEditing && (
              <button
                className="SP-add-btn"
                onClick={() => handleAddItem('education')}
              >
                <PlusOutlined />  Add Education
              </button>
            )}
          </div>

          {profileData.education.map((edu, index) => (
            <div key={index} className="SP-education-item">
              {isEditing ? (
                <div className="SP-form-grid">
                  <div className="SP-form-group">
                    <label>Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleNestedChange('education', index, 'institution', e.target.value)}
                      placeholder="University name"
                    />
                  </div>
                  <div className="SP-form-group">
                    <label>Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleNestedChange('education', index, 'degree', e.target.value)}
                      placeholder="Degree earned"
                    />
                  </div>
                  <div className="SP-form-group">
                    <label>Field of Study</label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => handleNestedChange('education', index, 'fieldOfStudy', e.target.value)}
                      placeholder="Major/minor"
                    />
                  </div>
                  <div className="SP-form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => handleNestedChange('education', index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="SP-form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => handleNestedChange('education', index, 'endDate', e.target.value)}
                    />
                  </div>
                  <div className="SP-form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={edu.description}
                      onChange={(e) => handleNestedChange('education', index, 'description', e.target.value)}
                      placeholder="Additional details"
                      rows="3"
                    />
                  </div>
                  <button
                    className="SP-remove-btn"
                    onClick={() => handleRemoveItem('education', index)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <h3>{edu.institution}</h3>
                  <p>{edu.degree} in {edu.fieldOfStudy}</p>
                  <p>{edu.startDate} to {edu.endDate}</p>
                  {edu.description && <p className="SP-description">{edu.description}</p>}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="SP-profile-section experience">
          <div className="SP-section-header">
            <h2><EnvironmentOutlined /> Experience</h2>
            {isEditing && (
              <button
                className="SP-add-btn"
                onClick={() => handleAddItem('experience')}
              >
                <PlusOutlined />  Add Experience
              </button>
            )}
          </div>

          {profileData.experience.map((exp, index) => (
            <div key={index} className="SP-experience-item">
              {isEditing ? (
                <div className="SP-form-grid">
                  <div className="SP-form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={exp.title}
                      onChange={(e) => handleNestedChange('experience', index, 'title', e.target.value)}
                      placeholder="Job title"
                    />
                  </div>
                  <div className="SP-form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleNestedChange('experience', index, 'company', e.target.value)}
                      placeholder="Company name"
                    />
                  </div>
                  <div className="SP-form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleNestedChange('experience', index, 'location', e.target.value)}
                      placeholder="Location"
                    />
                  </div>
                  <div className="SP-form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      value={exp.startDate}
                      onChange={(e) => handleNestedChange('experience', index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="SP-form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      value={exp.endDate}
                      onChange={(e) => handleNestedChange('experience', index, 'endDate', e.target.value)}
                    />
                  </div>
                  <div className="SP-form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleNestedChange('experience', index, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements"
                      rows="3"
                    />
                  </div>
                  <button
                    className="SP-remove-btn"
                    onClick={() => handleRemoveItem('experience', index)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <h3>{exp.title} at {exp.company}</h3>
                  <p>{exp.location} | {exp.startDate} to {exp.endDate}</p>
                  {exp.description && <p className="SP-description">{exp.description}</p>}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="SP-profile-section projects">
          <div className="SP-section-header">
            <h2><FolderOutlined /> Projects</h2>
            {isEditing && (
              <button
                className="SP-add-btn"
                onClick={() => handleAddItem('projects')}
              >
                <PlusOutlined />  Add Project
              </button>
            )}
          </div>

          {profileData.projects.map((project, index) => (
            <div key={index} className="SP-project-item">
              {isEditing ? (
                <div className="SP-form-grid">
                  <div className="SP-form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      value={project.name}
                      onChange={(e) => handleNestedChange('projects', index, 'name', e.target.value)}
                      placeholder="Project name"
                    />
                  </div>
                  <div className="SP-form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleNestedChange('projects', index, 'description', e.target.value)}
                      placeholder="Describe the project"
                      rows="3"
                    />
                  </div>
                  <div className="SP-form-group full-width">
                    <label>Technologies Used</label>
                    <input
                      type="text"
                      value={project.technologies}
                      onChange={(e) => handleNestedChange('projects', index, 'technologies', e.target.value)}
                      placeholder="List technologies used"
                    />
                  </div>
                  <button
                    className="SP-remove-btn"
                    onClick={() => handleRemoveItem('projects', index)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <h3>{project.name}</h3>
                  {project.description && <p className="SP-description">{project.description}</p>}
                  {project.technologies && <p className="SP-technologies"><strong>Technologies:</strong> {project.technologies}</p>}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="SP-profile-section resume-section">
          <div className="SP-section-header">
            <h2><FilePdfOutlined /> Resume</h2>
          </div>

          <div className="SP-resume-content">
            {isEditing ? (
              <div className="SP-form-group">
                <label>Upload Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setProfileData({ ...profileData, resume: e.target.files[0] })}
                />
                {profileData.resume && (
                  <p className="SP-selected-file">Selected: {profileData.resume.name}</p>
                )}
              </div>
            ) : (
              <div className="SP-resume-display">
                {profileData.resume ? (
                  <div className="SP-resume-box">
                    <p><i className="SP-fa fa-file-pdf-o"></i> {profileData.resume.name}</p>
                    <button
                      className="SP-view-btn"
                      onClick={() => window.open(URL.createObjectURL(profileData.resume))}
                    >
                      View Resume
                    </button>
                  </div>
                ) : (
                  <p>No resume uploaded</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="SP-profile-section links">
          <h2><GlobalOutlined /> Links</h2>
          <div className="SP-form-grid">
            <div className="SP-form-group">
              <label><LinkedinOutlined /> LinkedIn</label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.links.linkedIn}
                  onChange={(e) => handleLinkChange('linkedIn', e.target.value)}
                  placeholder="LinkedIn profile URL"
                />
              ) : profileData.links.linkedIn ? (
                <a href={`https://${profileData.links.linkedIn}`} target="_blank" rel="noopener noreferrer">
                  {profileData.links.linkedIn}
                </a>
              ) : (
                <p>Not provided</p>
              )}
            </div>

            <div className="SP-form-group">
              <label><GithubOutlined /> GitHub</label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.links.github}
                  onChange={(e) => handleLinkChange('github', e.target.value)}
                  placeholder="GitHub profile URL"
                />
              ) : profileData.links.github ? (
                <a href={`https://${profileData.links.github}`} target="_blank" rel="noopener noreferrer">
                  {profileData.links.github}
                </a>
              ) : (
                <p>Not provided</p>
              )}
            </div>

            <div className="SP-form-group">
              <label><GlobalOutlined /> Portfolio</label>
              {isEditing ? (
                <input
                  type="url"
                  value={profileData.links.portfolio}
                  onChange={(e) => handleLinkChange('portfolio', e.target.value)}
                  placeholder="Portfolio website URL"
                />
              ) : profileData.links.portfolio ? (
                <a href={`https://${profileData.links.portfolio}`} target="_blank" rel="noopener noreferrer">
                  {profileData.links.portfolio}
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

export default Student_Profile;

