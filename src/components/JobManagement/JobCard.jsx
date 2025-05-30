import { Link } from 'react-router-dom';
import { 
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import './JobCard.css';

  // Ad these props to your JobCard component
  

const JobCard = ({ id, title, company, type, location, salary, posted, skills, description }) => {
  return (
    <div className="JC-job-card">
      <div className="JC-job-header">
        <h3>{title}</h3>
        <span className={`JC-job-type ${type.toLowerCase()}`}>
          <SolutionOutlined className="JC-icon" /> {type}
        </span>
      </div>
      
      <div className="JC-job-company">
        <span className="JC-company-name">{company}</span>
        <span className="JC-job-location">
          <EnvironmentOutlined className="JC-icon" /> {location}
        </span>
      </div>

      <div className="JC-job-salary">
        <span>
          <DollarOutlined className="JC-icon" /> {salary}
        </span>
        <span className="JC-posted-date">
          <ClockCircleOutlined className="JC-icon" /> {posted}
        </span>
      </div>

      <div className="JC-job-skills">
        {skills.map((skill, index) => (
          <span key={index} className="JC-skill-tag">{skill}</span>
        ))}
      </div>

      <div className="JC-job-actions">
        <Link to={`/jobs/${id}`} className="JC-view-details">
          View Details
        </Link>
        <Link to={`/apply/${id}`} className="JC-apply-btn">
          Quick Apply
        </Link>
      </div>
    </div>
  );
};

export default JobCard;