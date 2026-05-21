export type Job = {
  id: string;
  title: string;
  company: string;
  verified: boolean;
  location: string;
  workMode: "On-site" | "Remote" | "Hybrid";
  jobType: "Full Time" | "Part Time" | "Contract" | "Internship" | "Freelance";
  salary: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  posted: string;
  skills: string[];
  industry: string;
  experience: "Entry" | "Mid" | "Senior" | "Lead";
  description?: string;
};

export const jobs: Job[] = [
  { id: "1", title: "Senior Software Engineer", company: "TechCorp Malaysia", verified: true, location: "Kuala Lumpur, Malaysia", workMode: "Hybrid", jobType: "Full Time", salary: "RM7,000 - RM12,000", salaryMin: 7000, salaryMax: 12000, currency: "MYR", posted: "2 days ago", skills: ["React", "Node.js", "AWS", "TypeScript"], industry: "Technology", experience: "Senior" },
  { id: "2", title: "Data Scientist", company: "Petronas Digital", verified: true, location: "Kuala Lumpur, Malaysia", workMode: "On-site", jobType: "Full Time", salary: "RM8,000 - RM14,000", salaryMin: 8000, salaryMax: 14000, currency: "MYR", posted: "1 day ago", skills: ["Python", "Machine Learning", "SQL", "TensorFlow"], industry: "Energy", experience: "Senior" },
  { id: "3", title: "UX Designer", company: "Canva", verified: true, location: "Sydney, Australia", workMode: "Remote", jobType: "Full Time", salary: "AUD90,000 - AUD120,000", salaryMin: 90000, salaryMax: 120000, currency: "AUD", posted: "3 days ago", skills: ["Figma", "User Research", "Prototyping", "Design Systems"], industry: "Design", experience: "Mid" },
  { id: "4", title: "Digital Marketing Manager", company: "Shopee", verified: true, location: "Singapore", workMode: "Hybrid", jobType: "Full Time", salary: "SGD5,000 - SGD9,000", salaryMin: 5000, salaryMax: 9000, currency: "SGD", posted: "5 days ago", skills: ["SEO", "Analytics", "Google Ads", "Content"], industry: "E-commerce", experience: "Mid" },
  { id: "5", title: "Registered Nurse", company: "Sunway Medical", verified: true, location: "Subang, Malaysia", workMode: "On-site", jobType: "Full Time", salary: "RM3,500 - RM5,500", salaryMin: 3500, salaryMax: 5500, currency: "MYR", posted: "1 week ago", skills: ["Patient Care", "Clinical Skills", "First Aid"], industry: "Healthcare", experience: "Entry" },
  { id: "6", title: "Business Analyst", company: "Maybank", verified: true, location: "Kuala Lumpur, Malaysia", workMode: "Hybrid", jobType: "Full Time", salary: "RM6,000 - RM10,000", salaryMin: 6000, salaryMax: 10000, currency: "MYR", posted: "4 days ago", skills: ["Power BI", "SQL", "Agile", "Stakeholders"], industry: "Banking", experience: "Mid" },
  { id: "7", title: "Frontend Developer", company: "Stripe", verified: true, location: "Remote Worldwide", workMode: "Remote", jobType: "Full Time", salary: "USD80,000 - USD120,000", salaryMin: 80000, salaryMax: 120000, currency: "USD", posted: "2 days ago", skills: ["React", "TypeScript", "Tailwind", "Next.js"], industry: "Fintech", experience: "Mid" },
  { id: "8", title: "Product Manager", company: "Grab", verified: true, location: "Singapore", workMode: "Hybrid", jobType: "Full Time", salary: "SGD8,000 - SGD14,000", salaryMin: 8000, salaryMax: 14000, currency: "SGD", posted: "3 days ago", skills: ["Agile", "Roadmapping", "Analytics", "User Research"], industry: "Tech", experience: "Senior" },
  { id: "9", title: "Content Writer", company: "Freelance", verified: false, location: "Remote", workMode: "Remote", jobType: "Part Time", salary: "RM1,500 - RM3,000", salaryMin: 1500, salaryMax: 3000, currency: "MYR", posted: "1 day ago", skills: ["Copywriting", "SEO", "Editing"], industry: "Media", experience: "Entry" },
  { id: "10", title: "Cybersecurity Analyst", company: "Telekom Malaysia", verified: true, location: "Kuala Lumpur, Malaysia", workMode: "On-site", jobType: "Full Time", salary: "RM5,500 - RM9,000", salaryMin: 5500, salaryMax: 9000, currency: "MYR", posted: "6 days ago", skills: ["SIEM", "Networking", "Incident Response"], industry: "Telecom", experience: "Mid" },
  { id: "11", title: "Graphic Designer", company: "Agency KL", verified: false, location: "Kuala Lumpur, Malaysia", workMode: "Hybrid", jobType: "Part Time", salary: "RM2,500 - RM4,500", salaryMin: 2500, salaryMax: 4500, currency: "MYR", posted: "1 week ago", skills: ["Figma", "Illustrator", "Branding"], industry: "Design", experience: "Entry" },
  { id: "12", title: "Financial Analyst", company: "KPMG", verified: true, location: "Kuala Lumpur, Malaysia", workMode: "On-site", jobType: "Contract", salary: "RM5,000 - RM8,500", salaryMin: 5000, salaryMax: 8500, currency: "MYR", posted: "4 days ago", skills: ["Excel", "Financial Modelling", "Valuation"], industry: "Consulting", experience: "Mid" },
];

export const getJob = (id: string) => jobs.find((j) => j.id === id);