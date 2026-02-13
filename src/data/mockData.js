
const DEPARTMENTS = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR', 'Finance'];
const ROLES = ['Junior', 'Mid-Level', 'Senior', 'Lead', 'Manager', 'Director'];
const CITIES = ['San Francisco', 'New York', 'London', 'Berlin', 'Tokyo', 'Remote'];
const SKILLS = ['React', 'JavaScript', 'Node.js', 'Python', 'Go', 'SQL', 'GraphQL', 'AWS'];

const employees = [];

for (let i = 1; i <= 60; i++) {
  const firstName = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda'][Math.floor(Math.random() * 8)];
  const lastName = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'][Math.floor(Math.random() * 8)];

  const numSkills = Math.floor(Math.random() * 3) + 1;
  const personSkills = [];
  for (let j = 0; j < numSkills; j++) {
    const randomSkill = SKILLS[Math.floor(Math.random() * SKILLS.length)];
    if (!personSkills.includes(randomSkill)) {
      personSkills.push(randomSkill);
    }
  }

  // Random Date
  const start = new Date(2020, 0, 1);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  // Random Review Date
  const reviewStart = new Date(2023, 0, 1);
  const reviewDate = new Date(reviewStart.getTime() + Math.random() * (end.getTime() - reviewStart.getTime()));

  employees.push({
    id: i,
    name: firstName + ' ' + lastName,
    email: firstName.toLowerCase() + '.' + lastName.toLowerCase() + i + '@company.com',
    department: DEPARTMENTS[Math.floor(Math.random() * DEPARTMENTS.length)],
    role: ROLES[Math.floor(Math.random() * ROLES.length)] + ' ' + ['Developer', 'Designer', 'Manager', 'Analyst'][Math.floor(Math.random() * 4)],
    salary: Math.floor(Math.random() * (180000 - 60000 + 1)) + 60000,
    joinDate: randomDate.toISOString().split('T')[0],
    isActive: Math.random() > 0.2,
    skills: personSkills,
    address: {
      city: CITIES[Math.floor(Math.random() * CITIES.length)],
      state: 'CA',
      country: 'USA'
    },
    projects: Math.floor(Math.random() * 16),
    lastReview: reviewDate.toISOString().split('T')[0],
    performanceRating: Number((Math.random() * 4 + 1).toFixed(1))
  });
}

export const MOCK_DATA = employees;

export const FIELD_DEFINITIONS = [
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'email', label: 'Email', type: 'text' },
  { key: 'department', label: 'Department', type: 'single-select', options: DEPARTMENTS },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'salary', label: 'Salary', type: 'number' },
  { key: 'joinDate', label: 'Join Date', type: 'date' },
  { key: 'isActive', label: 'Is Active', type: 'boolean' },
  { key: 'skills', label: 'Skills', type: 'multi-select', options: SKILLS },
  { key: 'address.city', label: 'City', type: 'single-select', options: CITIES },
  { key: 'projects', label: 'Projects', type: 'number' },
  { key: 'performanceRating', label: 'Rating', type: 'number' },
];
