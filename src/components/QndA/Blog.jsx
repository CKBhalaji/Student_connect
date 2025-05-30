import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, Input, Button, Tag, Divider, Tabs, 
  Avatar, Pagination, Spin, Empty, Select 
} from 'antd';
import { 
  SearchOutlined, CalendarOutlined, UserOutlined, 
  TagOutlined, EyeOutlined, ShareAltOutlined, 
  FilterOutlined, SortAscendingOutlined 
} from '@ant-design/icons';
import './Blog.css';
import { APP_NAME } from '../../config/constants';

const { TabPane } = Tabs;
const { Option } = Select;

const Blog = () => {
  // State variables
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  // Fetch blog posts data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockBlogPosts = [
        {
          id: 1,
          title: 'How to Prepare for Technical Interviews',
          excerpt: 'Learn effective strategies to ace your next technical interview with confidence.',
          content: `
            <h2>Preparing for Technical Interviews</h2>
            <p>Technical interviews can be intimidating, but with proper preparation, you can approach them with confidence. Here are some key strategies:</p>
            
            <h3>1. Understand the Fundamentals</h3>
            <p>Make sure you have a solid grasp of computer science fundamentals, including data structures, algorithms, and system design principles. These concepts form the foundation of most technical interviews.</p>
            
            <h3>2. Practice Coding Problems</h3>
            <p>Regularly solve coding problems on platforms like LeetCode, HackerRank, or CodeSignal. Focus on understanding the problem-solving approach rather than memorizing solutions.</p>
            
            <h3>3. Mock Interviews</h3>
            <p>Conduct mock interviews with friends or use platforms that offer practice interviews. This helps you get comfortable with explaining your thought process while coding.</p>
            
            <h3>4. Research the Company</h3>
            <p>Understand the company's products, technologies, and culture. This will help you tailor your responses and ask relevant questions during the interview.</p>
            
            <h3>5. Prepare Your Own Questions</h3>
            <p>Have thoughtful questions ready to ask your interviewers. This demonstrates your interest in the role and helps you evaluate if the company is a good fit for you.</p>
          `,
          author: 'Sarah Johnson',
          authorRole: 'Senior Technical Recruiter',
          date: '2023-05-15',
          category: 'Interview Tips',
          tags: ['Technical Interview', 'Career Advice', 'Coding'],
          image: '/images/technical-interview.jpg',
          views: 1245
        },
        {
          id: 2,
          title: 'Building an Effective Resume for Tech Jobs',
          excerpt: 'Tips and best practices for creating a resume that stands out to tech recruiters.',
          content: `
            <h2>Crafting a Standout Tech Resume</h2>
            <p>Your resume is often the first impression recruiters have of you. Here's how to make it count:</p>
            
            <h3>1. Tailor to the Job Description</h3>
            <p>Customize your resume for each application by highlighting relevant skills and experiences that match the job requirements.</p>
            
            <h3>2. Showcase Technical Skills</h3>
            <p>Include a dedicated skills section that clearly lists your technical competencies, programming languages, frameworks, and tools.</p>
            
            <h3>3. Quantify Achievements</h3>
            <p>Use metrics and numbers to demonstrate the impact of your work. For example, "Improved application performance by 40%" is more compelling than "Improved application performance."</p>
            
            <h3>4. Include Projects</h3>
            <p>Highlight relevant projects, especially if you're early in your career. Include links to GitHub repositories or deployed applications.</p>
            
            <h3>5. Keep it Concise</h3>
            <p>Aim for a one to two-page resume that is easy to scan. Use bullet points and clear headings to organize information.</p>
          `,
          author: 'Michael Chen',
          authorRole: 'HR Director',
          date: '2023-06-02',
          category: 'Resume Building',
          tags: ['Resume', 'Job Application', 'Career Development'],
          image: '/images/resume-building.jpg',
          views: 982
        },
        {
          id: 3,
          title: 'Networking Strategies for Job Seekers',
          excerpt: 'How to build and leverage professional connections to advance your career.',
          content: `
            <h2>Effective Networking for Career Growth</h2>
            <p>Networking is a crucial aspect of career development. Here's how to do it effectively:</p>
            
            <h3>1. Attend Industry Events</h3>
            <p>Participate in conferences, meetups, and workshops related to your field. These events provide opportunities to meet professionals and learn about industry trends.</p>
            
            <h3>2. Utilize LinkedIn</h3>
            <p>Maintain an updated LinkedIn profile and actively engage with content in your field. Connect with professionals and join relevant groups to expand your network.</p>
            
            <h3>3. Informational Interviews</h3>
            <p>Request short meetings with professionals in roles or companies you're interested in. These conversations can provide valuable insights and potentially lead to job opportunities.</p>
            
            <h3>4. Alumni Networks</h3>
            <p>Leverage your school's alumni network. Alumni are often willing to help fellow graduates and can provide introductions or mentorship.</p>
            
            <h3>5. Follow Up</h3>
            <p>After meeting someone, send a personalized follow-up message to maintain the connection. Share relevant articles or information to stay on their radar.</p>
          `,
          author: 'Jessica Williams',
          authorRole: 'Career Coach',
          date: '2023-06-10',
          category: 'Networking',
          tags: ['Networking', 'Professional Development', 'Career Growth'],
          image: '/images/networking.jpg',
          views: 756
        },
        {
          id: 4,
          title: 'Mastering the Art of Remote Work',
          excerpt: 'Tips for staying productive and maintaining work-life balance in a remote environment.',
          content: `
            <h2>Thriving in a Remote Work Environment</h2>
            <p>Remote work offers flexibility but comes with unique challenges. Here's how to master it:</p>
            
            <h3>1. Create a Dedicated Workspace</h3>
            <p>Set up a designated area for work that's separate from your relaxation spaces. This helps create mental boundaries between work and personal life.</p>
            
            <h3>2. Establish a Routine</h3>
            <p>Maintain consistent working hours and incorporate regular breaks. A structured day helps maintain productivity and prevents burnout.</p>
            
            <h3>3. Communicate Effectively</h3>
            <p>Overcommunicate with your team to ensure everyone is aligned. Use video calls for complex discussions and written communication for documentation.</p>
            
            <h3>4. Use Productivity Tools</h3>
            <p>Leverage tools like project management software, time trackers, and communication platforms to stay organized and connected.</p>
            
            <h3>5. Set Boundaries</h3>
            <p>Clearly define when your workday ends and communicate these boundaries to colleagues. This prevents work from encroaching on personal time.</p>
          `,
          author: 'David Rodriguez',
          authorRole: 'Remote Work Consultant',
          date: '2023-06-18',
          category: 'Work Tips',
          tags: ['Remote Work', 'Productivity', 'Work-Life Balance'],
          image: '/images/remote-work.jpg',
          views: 1102
        },
        {
          id: 5,
          title: 'Navigating Career Transitions in Tech',
          excerpt: 'Guidance for professionals looking to pivot their careers within the tech industry.',
          content: `
            <h2>Successfully Changing Career Paths in Tech</h2>
            <p>The tech industry offers numerous paths for career growth and transition. Here's how to navigate a career change:</p>
            
            <h3>1. Identify Transferable Skills</h3>
            <p>Recognize the skills from your current role that can be valuable in your target position. Highlight these in your resume and interviews.</p>
            
            <h3>2. Fill Knowledge Gaps</h3>
            <p>Identify the skills you need to develop for your desired role. Take courses, complete certifications, or work on projects to build these competencies.</p>
            
            <h3>3. Build a Portfolio</h3>
            <p>Create projects that demonstrate your capabilities in your target field. A strong portfolio can compensate for limited professional experience.</p>
            
            <h3>4. Network in Your Target Field</h3>
            <p>Connect with professionals in your desired role to gain insights and potential opportunities. Attend industry events and join relevant communities.</p>
            
            <h3>5. Consider Stepping Stone Roles</h3>
            <p>Look for positions that bridge your current experience and your target role. These intermediate positions can provide valuable experience and make your transition more gradual.</p>
          `,
          author: 'Alex Thompson',
          authorRole: 'Career Transition Specialist',
          date: '2023-06-25',
          category: 'Career Development',
          tags: ['Career Change', 'Professional Growth', 'Skill Development'],
          image: '/images/career-transition.jpg',
          views: 845
        },
        {
          id: 6,
          title: 'The Future of AI in Recruitment',
          excerpt: 'How artificial intelligence is transforming the hiring process and what it means for job seekers.',
          content: `
            <h2>AI's Impact on the Recruitment Landscape</h2>
            <p>Artificial intelligence is revolutionizing how companies hire talent. Here's what you need to know:</p>
            
            <h3>1. Resume Screening Automation</h3>
            <p>AI-powered applicant tracking systems (ATS) scan resumes for relevant keywords and qualifications. Optimize your resume with industry-specific terms to pass these initial screenings.</p>
            
            <h3>2. Video Interview Analysis</h3>
            <p>Some companies use AI to analyze facial expressions, word choice, and speech patterns during video interviews. Practice maintaining consistent eye contact and speaking clearly.</p>
            
            <h3>3. Skills Assessment</h3>
            <p>AI-based platforms can evaluate technical skills through coding challenges and problem-solving exercises. Regular practice on these platforms can help you perform better in automated assessments.</p>
            
            <h3>4. Chatbot Interactions</h3>
            <p>Many companies use chatbots for initial candidate screening. Be prepared to interact with these systems by providing clear, concise responses to questions.</p>
            
            <h3>5. Reducing Bias</h3>
            <p>When properly designed, AI can help reduce unconscious bias in hiring by focusing on skills and qualifications rather than demographic factors. However, be aware that AI systems can also perpetuate existing biases if not carefully developed.</p>
          `,
          author: 'Priya Patel',
          authorRole: 'AI Recruitment Specialist',
          date: '2023-07-05',
          category: 'Industry Trends',
          tags: ['Artificial Intelligence', 'Recruitment', 'Technology Trends'],
          image: '/images/ai-recruitment.jpg',
          views: 1320
        }
      ];
      
      setBlogPosts(mockBlogPosts);
      setFilteredPosts(mockBlogPosts);
      setLoading(false);
    }, 1500);
  }, []);

  // Filter posts based on search text and category
  useEffect(() => {
    const filtered = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchText.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchText.toLowerCase()) ||
                           post.author.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchText, categoryFilter, blogPosts]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Handle category filter change
  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
  };

  // View full blog post
  const viewBlogPost = (post) => {
    setSelectedPost(post);
    setIsPostModalVisible(true);
  };

  // Get unique categories from blog posts
  const getCategories = () => {
    const categories = [...new Set(blogPosts.map(post => post.category))];
    return categories;
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="BL-blog-container">
      {/* Hero Section */}
      <section className="BL-blog-hero">
        <div className="BL-blog-content">
          <h1>{APP_NAME} Blog</h1>
          <p>Insights, tips, and resources for students and recruiters in the tech industry</p>
        </div>
      </section>

      {/* Filter Section */}
      <Card className="BL-filter-card">
        <div className="BL-filter-section">
          <div className="BL-search-input">
            <Input 
              placeholder="Search blog posts..." 
              prefix={<SearchOutlined />} 
              value={searchText}
              onChange={handleSearchChange}
              allowClear
            />
          </div>
          <div className="BL-category-filter">
            <Select
              defaultValue="all"
              style={{ width: 200 }}
              onChange={handleCategoryChange}
              placeholder="Filter by category"
            >
              <Option value="all">All Categories</Option>
              {getCategories().map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      {/* Blog Posts Section */}
      <div className="BL-blog-posts-section">
        {loading ? (
          <div className="BL-loading-container">
            <Spin size="large" />
            <p>Loading blog posts...</p>
          </div>
        ) : currentPosts.length > 0 ? (
          <>
            <div className="BL-blog-posts-grid">
              {currentPosts.map(post => (
                <Card key={post.id} className="BL-blog-post-card" hoverable>
                  <div className="BL-blog-post-image">
                    <img 
                      src={post.image || '/images/default-blog.jpg'} 
                      alt={post.title} 
                    />
                    <Tag color="blue" className="BL-category-tag">{post.category}</Tag>
                  </div>
                  <div className="BL-blog-post-content">
                    <h2 className="BL-blog-post-title">{post.title}</h2>
                    <p className="BL-blog-post-excerpt">{post.excerpt}</p>
                    <div className="BL-blog-post-meta">
                      <div className="BL-blog-post-author">
                        <Avatar icon={<UserOutlined />} /> {post.author}
                      </div>
                      <div className="BL-blog-post-date">
                        <CalendarOutlined /> {post.date}
                      </div>
                    </div>
                    <div className="BL-blog-post-tags">
                      {post.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                    <div className="BL-blog-post-footer">
                      <span className="BL-blog-post-views">
                        <EyeOutlined /> {post.views} views
                      </span>
                      <Button type="primary" onClick={() => viewBlogPost(post)}>
                        Read More
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="BL-pagination-container">
              <Pagination 
                current={currentPage} 
                total={filteredPosts.length}
                pageSize={postsPerPage} 
                onChange={handlePageChange} 
                showSizeChanger={false}
              />
            </div>
          </>
        ) : (
          <Empty 
            description="No blog posts found matching your criteria" 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
          />
        )}
      </div>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div 
          className={`blog-post-modal ${isPostModalVisible ? 'visible' : ''}`}
          onClick={() => setIsPostModalVisible(false)}
        >
          <div className="BL-blog-post-modal-content" onClick={e => e.stopPropagation()}>
            <button className="BL-close-button" onClick={() => setIsPostModalVisible(false)}>&times;</button>
            
            <div className="BL-blog-post-header">
              <h1>{selectedPost.title}</h1>
              <div className="BL-blog-post-meta">
                <div className="BL-blog-post-author">
                  <Avatar icon={<UserOutlined />} /> 
                  <span>{selectedPost.author}</span>
                  <span className="BL-author-role">{selectedPost.authorRole}</span>
                </div>
                <div className="BL-blog-post-date">
                  <CalendarOutlined /> {selectedPost.date}
                </div>
              </div>
              <div className="BL-blog-post-category">
                <Tag color="blue">{selectedPost.category}</Tag>
              </div>
            </div>
            
            <div className="BL-blog-post-image-full">
              <img 
                src={selectedPost.image || '/images/default-blog.jpg'} 
                alt={selectedPost.title} 
              />
            </div>
            
            <div className="BL-blog-post-full-content">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            </div>
            
            <div className="BL-blog-post-tags-full">
              <TagOutlined /> 
              {selectedPost.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            
            <div className="BL-blog-post-actions">
              <Button icon={<ShareAltOutlined />}>Share</Button>
              <div className="BL-blog-post-views-full">
                <EyeOutlined /> {selectedPost.views} views
              </div>
            </div>
            
            <Divider />
            
            <div className="BL-related-posts">
              <h3>Related Posts</h3>
              <div className="BL-related-posts-grid">
                {blogPosts
                  .filter(post => 
                    post.id !== selectedPost.id && 
                    (post.category === selectedPost.category || 
                     post.tags.some(tag => selectedPost.tags.includes(tag)))
                  )
                  .slice(0, 3)
                  .map(post => (
                    <Card 
                      key={post.id} 
                      className="BL-related-post-card" 
                      hoverable
                      onClick={() => {
                        setSelectedPost(post);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <div className="BL-related-post-image">
                        <img src={post.image || '/images/default-blog.jpg'} alt={post.title} />
                      </div>
                      <div className="BL-related-post-content">
                        <h4>{post.title}</h4>
                        <div className="BL-related-post-meta">
                          <CalendarOutlined /> {post.date}
                        </div>
                      </div>
                    </Card>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;