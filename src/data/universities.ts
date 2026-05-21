export type University = {
  id: string;
  name: string;
  country: string;
  city: string;
  qsRank: number;
  qsLabel: string;
  specializations: string[];
  tuitionMin: number;
  tuitionMax: number;
  currency: string;
  tuition: string;
  scholarship: boolean;
  employability: number;
  studentFacultyRatio: string;
  intlStudents: string;
  satisfaction: number;
  knownFor: string[];
  entryRequirements: string;
  studyLevels: string[];
  topEmployers: string[];
};

export const universities: University[] = [
  { id: "um", name: "University of Malaya", country: "Malaysia", city: "Kuala Lumpur", qsRank: 65, qsLabel: "QS #65", specializations: ["Engineering", "Law", "Medicine"], tuitionMin: 12000, tuitionMax: 25000, currency: "MYR", tuition: "RM12,000 - RM25,000", scholarship: true, employability: 92, studentFacultyRatio: "12:1", intlStudents: "18%", satisfaction: 4.4, knownFor: ["Research", "Medicine", "Heritage"], entryRequirements: "STPM 3.5 / IB 32+", studyLevels: ["Foundation", "Degree", "Master's", "PhD"], topEmployers: ["Petronas", "Maybank", "Shell"] },
  { id: "utm", name: "Universiti Teknologi Malaysia", country: "Malaysia", city: "Johor Bahru", qsRank: 187, qsLabel: "QS #187", specializations: ["Engineering", "Tech", "Architecture"], tuitionMin: 10000, tuitionMax: 20000, currency: "MYR", tuition: "RM10,000 - RM20,000", scholarship: true, employability: 88, studentFacultyRatio: "14:1", intlStudents: "12%", satisfaction: 4.2, knownFor: ["Engineering", "Technology"], entryRequirements: "STPM 3.0 / Matriculation", studyLevels: ["Diploma", "Degree", "Master's", "PhD"], topEmployers: ["Intel", "TM", "Boeing"] },
  { id: "swinburne-sarawak", name: "Swinburne University Sarawak", country: "Malaysia", city: "Kuching", qsRank: 350, qsLabel: "QS #350", specializations: ["Tech", "Business", "Engineering"], tuitionMin: 18000, tuitionMax: 30000, currency: "MYR", tuition: "RM18,000 - RM30,000", scholarship: true, employability: 85, studentFacultyRatio: "15:1", intlStudents: "20%", satisfaction: 4.3, knownFor: ["Twinning Programs", "Tech"], entryRequirements: "SPM 5C + Foundation", studyLevels: ["Foundation", "Degree", "Master's"], topEmployers: ["Sarawak Energy", "Shell"] },
  { id: "nus", name: "National University of Singapore", country: "Singapore", city: "Singapore", qsRank: 8, qsLabel: "QS #8", specializations: ["Tech", "Business", "Medicine"], tuitionMin: 17000, tuitionMax: 30000, currency: "SGD", tuition: "SGD17,000 - SGD30,000", scholarship: true, employability: 96, studentFacultyRatio: "10:1", intlStudents: "30%", satisfaction: 4.7, knownFor: ["Research", "Innovation"], entryRequirements: "A-Levels AAA / IB 38+", studyLevels: ["Degree", "Master's", "PhD"], topEmployers: ["Google", "Grab", "DBS"] },
  { id: "unimelb", name: "University of Melbourne", country: "Australia", city: "Melbourne", qsRank: 33, qsLabel: "QS #33", specializations: ["Law", "Medicine", "Arts"], tuitionMin: 35000, tuitionMax: 50000, currency: "AUD", tuition: "AUD35,000 - AUD50,000", scholarship: true, employability: 93, studentFacultyRatio: "13:1", intlStudents: "45%", satisfaction: 4.5, knownFor: ["Law", "Liberal Arts"], entryRequirements: "ATAR 90+ / IB 36+", studyLevels: ["Degree", "Master's", "PhD"], topEmployers: ["BHP", "ANZ", "Deloitte"] },
  { id: "imperial", name: "Imperial College London", country: "United Kingdom", city: "London", qsRank: 6, qsLabel: "QS #6", specializations: ["Engineering", "Medicine", "Science"], tuitionMin: 30000, tuitionMax: 45000, currency: "GBP", tuition: "GBP30,000 - GBP45,000", scholarship: true, employability: 97, studentFacultyRatio: "11:1", intlStudents: "60%", satisfaction: 4.6, knownFor: ["STEM", "Research"], entryRequirements: "A*A*A / IB 40+", studyLevels: ["Degree", "Master's", "PhD"], topEmployers: ["BP", "Rolls-Royce", "McKinsey"] },
  { id: "mit", name: "Massachusetts Institute of Technology", country: "United States", city: "Cambridge", qsRank: 1, qsLabel: "QS #1", specializations: ["Tech", "Engineering", "Science"], tuitionMin: 57000, tuitionMax: 57000, currency: "USD", tuition: "USD57,000", scholarship: true, employability: 99, studentFacultyRatio: "8:1", intlStudents: "33%", satisfaction: 4.8, knownFor: ["Innovation", "AI", "Robotics"], entryRequirements: "SAT 1500+, exceptional record", studyLevels: ["Degree", "Master's", "PhD"], topEmployers: ["Google", "Apple", "Tesla"] },
  { id: "upm", name: "Universiti Putra Malaysia", country: "Malaysia", city: "Selangor", qsRank: 149, qsLabel: "QS #149", specializations: ["Agriculture", "Engineering", "Sciences"], tuitionMin: 8000, tuitionMax: 18000, currency: "MYR", tuition: "RM8,000 - RM18,000", scholarship: true, employability: 87, studentFacultyRatio: "13:1", intlStudents: "15%", satisfaction: 4.3, knownFor: ["Agriculture", "Research"], entryRequirements: "STPM 3.0", studyLevels: ["Foundation", "Degree", "Master's", "PhD"], topEmployers: ["FELDA", "Sime Darby"] },
  { id: "taylors", name: "Taylor's University", country: "Malaysia", city: "Subang", qsRank: 351, qsLabel: "QS #351", specializations: ["Hospitality", "Business", "Architecture"], tuitionMin: 20000, tuitionMax: 35000, currency: "MYR", tuition: "RM20,000 - RM35,000", scholarship: true, employability: 90, studentFacultyRatio: "15:1", intlStudents: "25%", satisfaction: 4.4, knownFor: ["Hospitality", "Industry Links"], entryRequirements: "SPM 5C / A-Levels", studyLevels: ["Foundation", "Diploma", "Degree", "Master's"], topEmployers: ["Marriott", "Hilton", "EY"] },
  { id: "monash-malaysia", name: "Monash University Malaysia", country: "Malaysia", city: "Selangor", qsRank: 42, qsLabel: "QS #42 (Global)", specializations: ["Business", "Engineering", "Medicine"], tuitionMin: 22000, tuitionMax: 40000, currency: "MYR", tuition: "RM22,000 - RM40,000", scholarship: true, employability: 94, studentFacultyRatio: "12:1", intlStudents: "35%", satisfaction: 4.5, knownFor: ["Global Brand", "Pharmacy"], entryRequirements: "A-Levels BBB / STPM 3.0", studyLevels: ["Foundation", "Degree", "Master's", "PhD"], topEmployers: ["Roche", "Pfizer", "AXA"] },
];

export const getUniversity = (id: string) => universities.find((u) => u.id === id);