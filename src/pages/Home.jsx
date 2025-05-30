import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import JobCard from '../components/JobManagement/JobCard';
import JobFilters from '../components/JobManagement/JobFilters';
import './Home.css';
import { 
  RocketOutlined,
  SearchOutlined,
  LineChartOutlined,
  DashboardOutlined,
  UserOutlined,
  BankOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  RocketFilled,
  CheckCircleOutlined,
  TeamOutlined,
  ReadOutlined,  // For graduation cap
  SolutionOutlined  // For recruiter icon
} from '@ant-design/icons';
import { APP_NAME} from '../config/constants';

const AnimatedSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      type: 'Internship',
      location: 'Remote',
      salary: '$3,000 - $4,000/mo',
      posted: '2 days ago',
      deadline: '2023-06-30',
      skills: ['React', 'JavaScript', 'CSS']
    },
    {
      id: 2,
      title: 'Data Science Fellow',
      company: 'DataInsights',
      type: 'Fellowship',
      location: 'New York, NY',
      salary: '$5,000 - $6,000/mo',
      posted: '1 week ago',
      deadline: '2023-07-15',
      skills: ['Python', 'Machine Learning', 'SQL']
    },
    {
      id: 3,
      title: 'UX Design Assistant',
      company: 'CreativeMinds',
      type: 'Part-time',
      location: 'San Francisco, CA',
      salary: '$25 - $35/hr',
      posted: '3 days ago',
      deadline: '2023-06-25',
      skills: ['Figma', 'UI/UX', 'Prototyping']
    }
  ]);

  const [filters, setFilters] = useState({
    type: '',
    location: '',
    salaryRange: '',
    search: ''
  });

  const filteredJobs = jobs.filter(job => {
    return (
      (filters.type === '' || job.type === filters.type) &&
      (filters.location === '' || job.location.includes(filters.location)) &&
      (filters.salaryRange === '' || 
        (filters.salaryRange === 'under-3k' && job.salary.includes('$3,000')) || 
        (filters.salaryRange === '3k-5k' && job.salary.includes('$5,000')) || 
        (filters.salaryRange === 'over-5k' && !job.salary.includes('$3,000') && !job.salary.includes('$5,000')) 
      ) && 
      (filters.search === '' || 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) || 
        job.company.toLowerCase().includes(filters.search.toLowerCase()) || 
        job.skills.some(skill => skill.toLowerCase().includes(filters.search.toLowerCase())))
    );
  });

  return (
    <div className="HO-home-container">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="HO-hero-section">
          <div className="HO-hero-content">
            <h1><RocketFilled style={{ color: 'white' }} />Connect to Your Future Career</h1>
            <p className="HO-hero-subtitle">
            {APP_NAME} bridges the gap between talented students and top companies.
              Find your dream internship or discover exceptional candidates.
            </p>
            <div className="HO-cta-buttons">
              <Link to="/register?role=student" className="HO-primary-btn"><ReadOutlined />Get Started as Student</Link>
              <Link to="/register?role=recruiter" className="HO-secondary-btn"><SolutionOutlined />I'm a Recruiter</Link>
            </div>
          </div>
          <div className="HO-hero-image">
            <img src="/images/hero-illustration.svg" alt="Career connection illustration" />
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection>
        <section className="HO-features-section">
          <h2 className="HO-section-title">Why Choose {APP_NAME}?</h2>
          <div className="HO-features-grid">
            <div className="HO-feature-card">
              <div className="HO-feature-icon">📊</div>
              <h3><LineChartOutlined />Smart Matching</h3>
              <p>Our algorithm connects you with the most relevant opportunities based on your skills and preferences.</p>
            </div>
            <div className="HO-feature-card">
              <div className="HO-feature-icon">🔍</div>
              <h3><SearchOutlined />Advanced Search</h3>
              <p>Filter jobs by location, salary, company size, and more to find your perfect fit.</p>
            </div>
            <div className="HO-feature-card">
              <div className="HO-feature-icon">📈</div>
              <h3><DashboardOutlined />Career Analytics</h3>
              <p>Track your application progress and get insights to improve your success rate.</p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Demo Section */}
      <AnimatedSection>
        <section className="HO-demo-section">
          <div className="HO-demo-content">
            <h2 className="HO-section-title"><DashboardOutlined />Powerful Dashboard</h2>
            <p>
              Our intuitive dashboard gives you complete control over your job search or recruitment process.
              Manage applications, track status, and get real-time updates.
            </p>
            <Link to="/register" className="HO-primary-btn">Try Demo</Link>
          </div>
          <div className="HO-demo-image">
            <img src="/images/dashboard-preview.png" alt="Dashboard preview" />
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection>
        <section className="HO-testimonials-section">
          <h2 className="HO-section-title">Trusted by Students and Companies</h2>
          <div className="HO-testimonials-grid">
            <div className="HO-testimonial-card">
              <p className="HO-testimonial-text">
                "{APP_NAME} helped me land my dream internship at a Fortune 500 company. The platform made the application process so smooth!"
              </p>
              <div className="HO-testimonial-author">
                <img src="/images/student-avatar.jpg" alt="Student" className="HO-author-avatar" />
                <div>
                  <p className="HO-author-name">Sarah Johnson <ReadOutlined /></p>
                  <p className="HO-author-title">Computer Science Student</p>
                </div>
              </div>
            </div>
            <div className="HO-testimonial-card">
              <p className="HO-testimonial-text">
                "We've found our best interns through {APP_NAME}. The quality of candidates and the recruitment tools save us countless hours."
              </p>
              <div className="HO-testimonial-author">
                <img src="/images/recruiter-avatar.jpg" alt="Recruiter" className="HO-author-avatar" />
                <div>
                  <p className="HO-author-name">Michael Chen <TeamOutlined /></p>
                  <p className="HO-author-title">Talent Acquisition, TechCorp</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Available Jobs Section */}
      <AnimatedSection>
        <section className="HO-available-jobs">
          <div className="HO-section-header">
            <h2>Available Opportunities</h2>
            <p>Find your perfect internship or entry-level position</p>
          </div>

          <JobFilters filters={filters} setFilters={setFilters} />

          <div className="HO-jobs-grid">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  company={job.company}
                  type={job.type}
                  location={job.location}
                  salary={job.salary}
                  posted={job.posted}
                  skills={job.skills}
                />
              ))
            ) : (
              <div className="HO-no-results">
                <p>No jobs match your filters. Try adjusting your search criteria.</p>
                <button
                  className="HO-clear-filters"
                  onClick={() => setFilters({
                    type: '',
                    location: '',
                    salaryRange: '',
                    search: ''
                  })}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

          <div className="HO-view-all-jobs">
            <Link to="/jobs" className="HO-primary-btn">
              View All Opportunities
            </Link>
          </div>
        </section>
      </AnimatedSection>
      
      {/* Call to Action */}
      <AnimatedSection>
        <section className="HO-cta-section">
          <h2><CheckCircleOutlined />Ready to take the next step in your career?</h2>
          <Link to="/register" className="HO-primary-btn large-btn"><RocketOutlined />Join {APP_NAME} Today</Link>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Home;