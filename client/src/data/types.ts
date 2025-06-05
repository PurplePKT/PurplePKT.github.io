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
  location: string;
  miles: number;   // or string, depending on your needs
  hours: number;   // or string
  bid_due: string;
  duration: number;
  pay_rate: string;
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
