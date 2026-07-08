export interface Job {
  id: number;
  title: string;
  category: 'Software Eng' | 'AI Eng' | 'Frontend' | 'Backend' | 'Data & ML' | 'UX Research' | 'Product Mgt' | 'Product Design' | 'QA Eng' | 'Cybersecurity' | string;
  location: string;
  budget: string;
  type: 'Task' | 'Freelance' | 'Full-Time' | string;
  phone?: string;
  linkedin?: string;
  externalUrl?: string;
  employerName: string;
  expiryDate: string;
}

export type JobInput = Omit<Job, 'id'>;

export interface UserProfile {
  name: string;
  email: string;
  role: 'talent' | 'employer' | null;
  trackPreference?: string;
}
