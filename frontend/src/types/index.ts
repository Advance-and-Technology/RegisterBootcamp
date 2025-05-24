export interface ApplicantForm {
  name: string;
  identification: string;
  birth_date: string;
  address: string;
  email: string;
  phone_number: string;
  motivation: string;
  age?: number;
  
  // Guardian fields (only required if applicant is under 18)
  name_guardian?: string;
  identification_guardian?: string;
  address_guardian?: string;
  email_guardian?: string;
  phone_number_guardian?: string;
}

export interface FormErrors {
  [key: string]: string;
}