export interface IJobPostingRes {
  id: number;
  title: string;
  profession: string;
  desired_level: string;
  workplace: string;
  employment_type: string;
  quantity: number;
  salary_from: number;
  salary_to: number;
  education_level: string;
  last_date: string;
  description: string;
  skill_experience: string;
  benefits: string;
  country: string;
  city: string;
  district: string;
  work_address: string;
  latitude: string;
  longitude: string;
  contact_name: string;
  phone: string;
  email: string;
  featured: number;
  status: number;
  company: Company;
}

interface Company {
  company_id: number;
  company_name: string;
  logo: string;
}
