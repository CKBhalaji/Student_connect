import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Button, Card, Progress, Tabs, Form, Input, Select, Divider, message, Spin, Tag } from 'antd';
import { 
  UploadOutlined,
  DownloadOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  UserOutlined,
  CrownOutlined,
  ContactsOutlined,
  SolutionOutlined,
  ReadOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  FileTextOutlined,
  CommentOutlined,
  ToolOutlined,
  LinkOutlined,
  CalendarOutlined,
  DollarOutlined,
  LoadingOutlined,
  BankOutlined,
  PlusOutlined,
  HourglassOutlined
} from '@ant-design/icons';
import './StudentResources.css';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

const StudentResources = () => {
  const [atsScore, setAtsScore] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [activeTab, setActiveTab] = useState('resume-builder');
  const [form] = Form.useForm();
  const [isCalculatingAts, setIsCalculatingAts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Sample data
  const resumeTemplates = [
    { id: 1, name: 'Professional', image: '/images/professional-template1.jpg', description: 'Clean and formal design' },
    { id: 2, name: 'Creative', image: '/images/professional-template2.jpg', description: 'Modern design' },
    { id: 3, name: 'Academic', image: '/images/professional-template3.jpg', description: 'Structured format' }
  ];

  const sampleJobDescriptions = [
    { id: 1, title: 'Software Engineer', description: 'Looking for skilled engineers...' },
    { id: 2, title: 'Marketing Specialist', description: 'Seeking marketing professionals...' }
  ];

  const handleFileUpload = (info) => {
    if (info.file.status === 'uploading') {
      setIsUploading(true);
    }
    if (info.file.status === 'done') {
      setIsUploading(false);
      message.success(`${info.file.name} file uploaded successfully`);
      setResumeText("Sample extracted text...");
    } else if (info.file.status === 'error') {
      setIsUploading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const calculateAtsScore = () => {
    setIsCalculatingAts(true);
    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60;
      setAtsScore(score);
      setIsCalculatingAts(false);
      message.success(`ATS Score calculated: ${score}/100`);
    }, 1500);
  };

  const downloadResume = (format) => {
    message.info(`Downloading resume in ${format} format...`);
  };

  const onFinish = (values) => {
    console.log('Received values:', values);
    message.success('Resume information saved!');
  };

  return (
    <div className="SR-student-resources-container">
      <section className="SR-student-hero">
        <div className="SR-student-content">
          <h1><SolutionOutlined /> Student Resources</h1>
          <p>Access tools and resources to enhance your job search</p>
        </div>
      </section>

      <Tabs activeKey={activeTab} onChange={setActiveTab} className="SR-resources-tabs">
        {/* Resume Builder Tab */}
        <TabPane
          tab={<span><FileTextOutlined /> Resume Builder</span>}
          key="resume-builder"
        >
          <div className="SR-resume-builder-section">
            <div className="SR-builder-left">
              <Card title={<><FileTextOutlined /> Resume Information</>} className="SR-form-card">
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
                    <Input prefix={<UserOutlined />} placeholder="John Doe" />
                  </Form.Item>

                  <Form.Item label="Professional Title" name="title" rules={[{ required: true }]}>
                    <Input prefix={<CrownOutlined />} placeholder="Software Engineer" />
                  </Form.Item>

                  <Form.Item label="Contact Information" name="contact" rules={[{ required: true }]}>
                    <TextArea
                      rows={3}
                      placeholder="Email: john@example.com\nPhone: (123) 456-7890"
                      prefix={<ContactsOutlined />}
                    />
                  </Form.Item>

                  <Divider orientation="left"><SolutionOutlined /> Experience</Divider>

                  <Form.List name="experience">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div key={key} className="SR-form-list-item">
                            <Form.Item {...restField} name={[name, 'company']} label="Company">
                              <Input prefix={<BankOutlined />} placeholder="Company Name" />
                            </Form.Item>
                            <Form.Item {...restField} name={[name, 'position']} label="Position">
                              <Input placeholder="Job Title" />
                            </Form.Item>
                            <Button danger onClick={() => remove(name)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button onClick={() => add()} block><PlusOutlined /> Add Experience</Button>
                      </>
                    )}
                  </Form.List>

                  <Divider orientation="left"><ReadOutlined /> Education</Divider>

                  <Form.List name="education">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div key={key} className="SR-form-list-item">
                            <Form.Item {...restField} name={[name, 'institution']} label="Institution">
                              <Input prefix={<BankOutlined />} placeholder="University Name" />
                            </Form.Item>
                            <Button danger onClick={() => remove(name)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button onClick={() => add()} block><PlusOutlined /> Add Education</Button>
                      </>
                    )}
                  </Form.List>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" icon={<CheckCircleOutlined />}>
                      Save Resume
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>

            <div className="SR-builder-right">
              <Card title={<><FilePdfOutlined /> Resume Preview</>} className="SR-preview-card">
                <Spin tip="Generating preview..." indicator={<LoadingOutlined spin />}>
                  <div className="SR-resume-preview">
                    <p>Preview will appear here</p>
                  </div>
                </Spin>

                <div className="SR-template-selection">
                  <h3><FileTextOutlined /> Templates</h3>
                  <div className="SR-template-grid">
                    {resumeTemplates.map(template => (
                      <div key={template.id} className="SR-template-card">
                        <img src={template.image} alt={template.name} />
                        <h4><FileTextOutlined /> {template.name}</h4>
                        <p>{template.description}</p>
                        <Button type="primary" icon={<CheckCircleOutlined />}>
                          Use Template
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="SR-download-options">
                  <h3><DownloadOutlined /> Download</h3>
                  <div className="SR-download-buttons">
                    <Button icon={<FilePdfOutlined />} onClick={() => downloadResume('PDF')}>
                      PDF
                    </Button>
                    <Button icon={<FileWordOutlined />} onClick={() => downloadResume('Word')}>
                      Word
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabPane>

        {/* ATS Checker Tab */}
        <TabPane
          tab={<span><BarChartOutlined /> ATS Checker</span>}
          key="ats-checker"
        >
          <div className="SR-ats-checker-section">
            <div className="SR-ats-left">
              <Card title={<><UploadOutlined /> Upload Resume</>} className="SR-upload-card">
                <Spin spinning={isUploading} tip="Uploading...">
                  <Upload
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />}>Upload Resume</Button>
                  </Upload>
                </Spin>
                {resumeText && (
                  <div className="SR-resume-text-preview">
                    <h4><FileTextOutlined /> Extracted Text</h4>
                    <p>{resumeText}</p>
                  </div>
                )}
              </Card>

              <Card title={<><FileTextOutlined /> Job Description</>} className="SR-job-description-card">
                <Select placeholder="Select job description" className="SR-job-select">
                  {sampleJobDescriptions.map(job => (
                    <Option key={job.id} value={job.id}>{job.title}</Option>
                  ))}
                </Select>
                <TextArea rows={6} placeholder="Paste job description..." />
              </Card>
            </div>

            <div className="SR-ats-right">
              <Card title={<><CheckCircleOutlined /> ATS Score</>} className="SR-score-card">
                {atsScore ? (
                  <>
                    <div className="SR-score-display">
                      <Progress
                        type="circle"
                        percent={atsScore}
                        strokeColor={atsScore > 75 ? '#52c41a' : '#faad14'}
                        width={150}
                      />
                      <div className="SR-score-message">
                        <h3>Score: {atsScore}/100</h3>
                        <p>{atsScore > 75 ? 'Great job!' : 'Needs improvement'}</p>
                      </div>
                    </div>
                    <Divider />
                    <div className="SR-improvement-tips">
                      <h4><ToolOutlined /> Tips</h4>
                      <ul>
                        <li>Add more keywords</li>
                        <li>Use simple formatting</li>
                        <li>Include measurable achievements</li>
                      </ul>
                    </div>
                  </>
                ) : (
                  <div className="SR-no-score">
                    <Spin spinning={isCalculatingAts} indicator={<LoadingOutlined spin />}>
                      <Button
                        type="primary"
                        onClick={calculateAtsScore}
                        disabled={!resumeText}
                        icon={isCalculatingAts ? <LoadingOutlined /> : <BarChartOutlined />}
                      >
                        {isCalculatingAts ? 'Analyzing...' : 'Check Score'}
                      </Button>
                    </Spin>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </TabPane>

        {/* Career Resources Tab */}
        <TabPane
          tab={<span><SolutionOutlined /> Career Resources</span>}
          key="career-resources"
        >
          <div className="SR-career-resources-section">
            <Card title={<><CommentOutlined /> Interview Prep</>} className="SR-resource-card">
              <div className="SR-resource-list">
                <div className="SR-resource-item">
                  <h4><ToolOutlined /> Common Questions</h4>
                  <Button type="link">View</Button>
                </div>
                <div className="SR-resource-item">
                  <h4><UserOutlined /> Behavioral Guide</h4>
                  <Button type="link">View</Button>
                </div>
              </div>
            </Card>

            <Card title={<><LinkOutlined /> Networking</>} className="SR-resource-card">
              <div className="SR-resource-list">
                <div className="SR-resource-item">
                  <h4><LinkOutlined /> LinkedIn Tips</h4>
                  <Button type="link">View</Button>
                </div>
                <div className="SR-resource-item">
                  <h4><CalendarOutlined /> Events</h4>
                  <Button type="link">View</Button>
                </div>
              </div>
            </Card>

            <Card title={<><DollarOutlined /> Salary</>} className="SR-resource-card">
              <div className="SR-resource-list">
                <div className="SR-resource-item">
                  <h4><BarChartOutlined /> Research Tools</h4>
                  <Button type="link">View</Button>
                </div>
                <div className="SR-resource-item">
                  <h4><DollarOutlined /> Negotiation Guide</h4>
                  <Button type="link">View</Button>
                </div>
              </div>
            </Card>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default StudentResources;