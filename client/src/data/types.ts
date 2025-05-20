// Route data types
export interface Route {
  id: string;
  location: string;
  state: string;
  zip: string;
  type: string;
  length: number;
  payRate: string;
}

// Solicitation data types
export interface Solicitation {
  id: string;
  title: string;
  status: 'open' | 'closing' | 'review';
  description: string;
  postedDate: string;
  closingDate: string;
  experience: number;
  duration: number;
  budget: string;
}

// Executive data types
export interface Executive {
  id: number;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
}

// Bid form data
export interface BidFormData {
  name: string;
  email: string;
  phone: string;
  amount: number;
  experience: number;
  message?: string;
}

// Apply form data
export interface ApplyFormData {
  name: string;
  email: string;
  phone: string;
  experience: number;
  license: string;
  vehicle: string;
  resume?: File;
  terms: boolean;
}
