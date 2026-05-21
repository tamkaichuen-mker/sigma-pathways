export type SkillNode = { name: string };
export type Career = {
  id: string;
  name: string;
  levels: { Foundation: string[]; Intermediate: string[]; Advanced: string[]; Expert: string[]; Leadership: string[] };
};

export const careers: Career[] = [
  {
    id: "software-developer",
    name: "Software Developer",
    levels: {
      Foundation: ["HTML & CSS", "JavaScript", "Git", "CS Fundamentals", "Command Line"],
      Intermediate: ["React.js", "Node.js", "SQL & NoSQL", "REST APIs", "Testing"],
      Advanced: ["System Design", "Cloud (AWS/Azure)", "Docker & CI/CD", "TypeScript", "Security"],
      Expert: ["Microservices", "ML Integration", "Performance Engineering", "Tech Leadership"],
      Leadership: ["Engineering Management", "Architecture Strategy", "Open Source"],
    },
  },
  {
    id: "data-analyst",
    name: "Data Analyst",
    levels: {
      Foundation: ["Excel", "Basic Statistics", "SQL", "Data Literacy", "PowerPoint"],
      Intermediate: ["Python Pandas/NumPy", "Power BI/Tableau", "Intermediate SQL", "Probability"],
      Advanced: ["Machine Learning", "Big Data", "A/B Testing", "Business Intelligence"],
      Expert: ["Predictive Modelling", "Advanced ML", "Data Strategy", "Executive Storytelling"],
      Leadership: ["Head of Analytics", "Chief Data Officer", "Data Governance"],
    },
  },
  {
    id: "registered-nurse",
    name: "Registered Nurse",
    levels: {
      Foundation: ["Biology & Anatomy", "Medical Terminology", "Basic Patient Care", "Safety Protocols", "First Aid"],
      Intermediate: ["Clinical Nursing", "Pharmacology", "Patient Assessment", "Medical Documentation"],
      Advanced: ["Specialized Care (ICU/ER)", "Evidence-Based Practice", "Ward Leadership"],
      Expert: ["Advanced Practice Nursing", "Clinical Research", "Healthcare Quality"],
      Leadership: ["Director of Nursing", "Clinical Education", "Healthcare Policy"],
    },
  },
  {
    id: "business-analyst",
    name: "Business Analyst",
    levels: {
      Foundation: ["Excel & PowerPoint", "Business Communication", "Process Mapping", "Basic SQL"],
      Intermediate: ["Stakeholder Management", "Requirements Gathering", "Power BI", "Agile"],
      Advanced: ["Enterprise Architecture", "Change Management", "Strategic Analysis"],
      Expert: ["Digital Transformation", "Consulting", "Executive Business Cases"],
      Leadership: ["Chief Strategy Officer", "Business Transformation Lead"],
    },
  },
  {
    id: "ux-ui-designer",
    name: "UX/UI Designer",
    levels: {
      Foundation: ["Design Principles", "Color & Typography", "Figma Basics", "User Research"],
      Intermediate: ["Wireframing", "Prototyping", "Usability Testing", "Information Architecture"],
      Advanced: ["Design Systems", "Motion Design", "Accessibility (WCAG)"],
      Expert: ["Product Strategy", "Design Ops", "Advanced Figma"],
      Leadership: ["Head of Design", "Design Director", "Creative Direction"],
    },
  },
  {
    id: "digital-marketer",
    name: "Digital Marketer",
    levels: {
      Foundation: ["Social Media", "Copywriting", "Google Analytics", "Email Marketing"],
      Intermediate: ["SEO/SEM", "Google & Meta Ads", "CRM Tools", "Content Strategy"],
      Advanced: ["Marketing Automation", "Conversion Optimization", "Brand Strategy"],
      Expert: ["CMO Strategy", "Multi-channel Attribution"],
      Leadership: ["Chief Marketing Officer", "Brand Director"],
    },
  },
  {
    id: "cybersecurity-analyst",
    name: "Cybersecurity Analyst",
    levels: {
      Foundation: ["Networking", "OS Fundamentals", "Linux", "Security Concepts"],
      Intermediate: ["Network Security", "SIEM", "Vulnerability Assessment", "Incident Response"],
      Advanced: ["Penetration Testing", "Threat Intelligence", "Cloud Security"],
      Expert: ["Red Team", "Security Architecture", "Compliance"],
      Leadership: ["CISO", "Security Director"],
    },
  },
  {
    id: "financial-analyst",
    name: "Financial Analyst",
    levels: {
      Foundation: ["Excel", "Accounting", "Financial Statements", "Business Maths"],
      Intermediate: ["Financial Modelling", "Valuation", "Bloomberg"],
      Advanced: ["Investment Analysis", "Risk Management", "M&A"],
      Expert: ["Portfolio Management", "CFA", "Derivatives"],
      Leadership: ["CFO Path", "Investment Director", "Fund Manager"],
    },
  },
  {
    id: "product-manager",
    name: "Product Manager",
    levels: {
      Foundation: ["Product Thinking", "User Research", "Agile", "Wireframing"],
      Intermediate: ["Roadmapping", "Metrics & KPIs", "Stakeholder Comms", "A/B Testing"],
      Advanced: ["Product Strategy", "Go-to-Market", "OKRs"],
      Expert: ["Platform Strategy", "Product-led Growth"],
      Leadership: ["Chief Product Officer", "VP Product", "Founder Path"],
    },
  },
  {
    id: "mechanical-engineer",
    name: "Mechanical Engineer",
    levels: {
      Foundation: ["Engineering Maths", "Physics", "CAD (SolidWorks/AutoCAD)", "Materials Science"],
      Intermediate: ["Manufacturing", "Thermodynamics", "FEA", "Project Management"],
      Advanced: ["Product Development", "Quality Engineering", "Lean Manufacturing"],
      Expert: ["Engineering Leadership", "Patents", "Advanced Simulation"],
      Leadership: ["Chief Engineer", "VP Engineering", "Technical Director"],
    },
  },
];

export const getCareer = (id: string) => careers.find((c) => c.id === id);