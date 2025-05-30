const JobFilters = ({ filters, setFilters }) => {
  const jobTypes = ['Internship', 'Full-time', 'Part-time', 'Fellowship', 'Contract'];
  const locations = ['Remote', 'New York', 'San Francisco', 'Chicago', 'Boston'];
  
  return (
    <div className="HO-job-filters">
      <div className="HO-search-bar">
        <input
          type="text"
          placeholder="Search by job title, company, or skills..."
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
        <span className="HO-search-icon">🔍</span>
      </div>

      <div className="HO-filter-options">
        <select
          value={filters.type}
          onChange={(e) => setFilters({...filters, type: e.target.value})}
        >
          <option value="">All Types</option>
          {jobTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          value={filters.location}
          onChange={(e) => setFilters({...filters, location: e.target.value})}
        >
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>

        <select
          value={filters.salaryRange}
          onChange={(e) => setFilters({...filters, salaryRange: e.target.value})}
        >
          <option value="">All Salary Ranges</option>
          <option value="under-3k">Under $3,000/mo</option>
          <option value="3k-5k">$3,000 - $5,000/mo</option>
          <option value="over-5k">Over $5,000/mo</option>
        </select>
      </div>
    </div>
  );
};

export default JobFilters;